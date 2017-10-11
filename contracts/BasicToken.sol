pragma solidity ^0.4.15;

import "./ERC20Basic.sol";
import "./SafeMath.sol";

contract BasicToken is ERC20Basic {
    
  using SafeMath for uint256;
 
  mapping(address => uint256) balances;

  // 03.01.2018 23:59 UTC (1515023940)
  uint256 ico_finish = 1515023940;

  modifier isFreeze() {
    if(now < ico_finish) {
      revert();
    }
    _;
  }

  function transfer(address _to, uint256 _value) isFreeze returns (bool) {
    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    Transfer(msg.sender, _to, _value);
    return true;
  }
 
  function balanceOf(address _owner) constant returns (uint256 balance) {
    return balances[_owner];
  }
 
}