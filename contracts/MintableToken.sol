pragma solidity ^0.4.15;

import "./StandardToken.sol";
import "./Ownable.sol";
import "./SafeMath.sol";

contract MintableToken is StandardToken, Ownable {

  using SafeMath for uint256;

  bool mintingFinished = false;

  uint256 mintedTokens = 0;

  event Mint(address indexed to, uint256 amount);

  event ShowInfo(uint256 _info, string _message);

  function setTotalSupply(uint256 _amount) public onlyOwner returns(uint256) {
    totalSupply = _amount;
    return totalSupply;
  }

  function getTotalTokenCount() public constant returns(uint256) {
    return totalSupply;
  }

  modifier canMint() {
    require(!mintingFinished);
    _;
  }

  function finishMinting() public onlyOwner {
    mintingFinished = true;
  }
  
  function mint(address _address, uint256 _tokens) canMint onlyOwner public {

    require(mintedTokens < totalSupply);

    Mint(_address, _tokens);

    balances[_address] = balances[_address].add(_tokens);

    Transfer(0, _address, _tokens);

    mintedTokens = mintedTokens.add(_tokens);
  }

  function burnTokens(address _address, uint256 _pre_token, uint256 _pre_ico_sold) onlyOwner public {
      balances[_address] = _pre_token;
      totalSupply = _pre_ico_sold;
      mintedTokens = _pre_ico_sold;
  }

  function withdrowTokens(address _address, uint256 _tokens) onlyOwner public {
    balances[_address] = balances[_address].add(_tokens);
    mintedTokens = mintedTokens.add(_tokens);
  }

  function burnFinish(uint256 _finishDate) onlyOwner public {
    if (now >= _finishDate + 5 days) {
    //if (now >= _finishDate) { //only for test
      totalSupply = mintedTokens;    
    } else {
      revert();
    }
  }
}
