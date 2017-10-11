pragma solidity ^0.4.15;

import "./MintableToken.sol";

contract SingleTokenCoin is MintableToken {
    
    string public constant name = "Bank of Memory";
    
    string public constant symbol = "BMC";
    
    uint32 public constant decimals = 2;
    
}