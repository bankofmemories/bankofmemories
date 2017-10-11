pragma solidity ^0.4.15;

import "./ERC20.sol";
import "./BasicToken.sol";

contract StandardToken is ERC20, BasicToken {
 
  mapping (address => mapping (address => uint256)) allowed;

  // 03.01.2018 23:59 UTC (1515023940)
  uint256 ico_finish = 1515023940;

  modifier isFreeze() {
    if(now < ico_finish) {
      revert();
    }
    _;
  }
 
  function transferFrom(address _from, address _to, uint256 _value) isFreeze returns (bool) {
    var _allowance = allowed[_from][msg.sender];
 
    balances[_to] = balances[_to].add(_value);
    balances[_from] = balances[_from].sub(_value);
    allowed[_from][msg.sender] = _allowance.sub(_value);
    Transfer(_from, _to, _value);
    return true;
  }

  function approve(address _spender, uint256 _value) returns (bool) {
 
    require((_value == 0) || (allowed[msg.sender][_spender] == 0));
 
    allowed[msg.sender][_spender] = _value;
    Approval(msg.sender, _spender, _value);
    return true;
  }
 
  function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
    return allowed[_owner][_spender];
  }
 
}