pragma solidity ^0.4.15;

// ---------ALERT---------
// Before deploy to Main Net uncomment all *ADDRESSES FOR PRODUCTION* comment 
// Before deploy to Main Net change rinkeby.etherscan.io to etherscan.io 
// Before deploy to Main Net check all ICO dates in all .sol files
// Before deploy to Main Net check all Comment in .sol and .js files
// Before deploy to Main Net check all code area with '* 100' & '/ 100' for .js files

// ---------CHECK---------
// check get data from oraclize before deploy to main net. 
// check data fro Pre-ICO & ICO before deploy to main net. 

import "./Ownable.sol";
import "./SafeMath.sol";
import "./SingleTokenCoin.sol";

contract WrapperOraclize {
  function update(string datasource, string arg) payable;
  function getWrapperBalance() constant returns(uint256);
  function getWrapperData() constant returns(bytes32);
  function() external payable;
}

contract Crowdsale is Ownable {

  string public ETHUSD;

  event ShowPrice(string price);
  
  event ShowTestU(uint _text);
  
  event ShowTestB(bool _bool);

  using SafeMath for uint256;

  SingleTokenCoin public token = new SingleTokenCoin();

  //Address from testnet
  WrapperOraclize private wrapper = WrapperOraclize(0x8d7b0956c7bdc36c2c5033766bdb40575732bf0c);

  uint256 private pre_ico_start;
  uint256 private pre_ico_finish;

  uint256 private ico_start;
  uint256 private ico_finish;

  uint256 private ico_rate;

  uint256 private decimals;

  uint256 private totalETH;

  uint256 private ico_tokens;
  uint256 private pre_ico_tokens;

  uint256 private pre_ico_discount;

  uint256 private totalAmount;
  uint256 private projectAmount;
  uint256 private bountyAmount;
  uint256 private saleAmount;

  uint256 private firsPhaseAmount = 12500000000; // with 2 decimals
  uint256 private secondPhaseAmount = 25000000000; // with 2 decimals
  uint256 private thirdPhaseAmount = 37500000000; // with 2 decimals
  uint256 private fourPhaseAmount = 49000000000; // with 2 decimals

  uint256 private firsPhaseDiscount = 75;
  uint256 private secondPhaseDiscount = 100;
  uint256 private thirdPhaseDiscount = 125;
  uint256 private fourPhaseDiscount = 150;

  //2%
  address public pre_ico_bountyAddress1;
  
  //5%
  address public pre_ico_bountyAddress2;

  //93%
  address public bountyAddress;

  //93%
  address public projectTeamAddress;

  //3%
  address public addr1;

  //25%
  address public addr2;

  //25%
  address public addr3;

  //25%
  address public addr4;

  //22%
  address public addr5;

  bool private initialize = false;
  
  bool public mintingFinished = false;

  uint256 private currentPhase;

  //Storage for ICO Buyers ETH
  mapping(address => uint256) private ico_buyers_eth;

  //Storage for ICO Buyers Token
  mapping(address => uint256) private ico_buyers_token;

  //Storage for Pre-ICO Buyers ETH
  mapping(address => uint256) private pre_ico_buyers_eth;

  //Storage for Pre-ICO Buyers Token
  mapping(address => uint256) private pre_ico_buyers_token;

  address[] private ico_investors;
  address[] private pre_ico_investors;

  mapping(address => uint) private privilegedWallets;

  address[] private privilegedWalletsCount;

  uint256 private soldTokens;
  
  uint256 private mincup;
  uint256 private maxcup;

  uint256 private minPrice;

  uint256 private pre_ico_sold;
  uint256 private ico_sold;

  uint256 private pre_ico_totalETH;
  uint256 private ico_totalETH;

  uint256 private minimumInvestmentICO;
  uint256 private minimumInvestmentPreICO;

  bool private isICO;
  bool private isPreICO;

  bool private isICOFail;

  uint256 private alreadyBurn;

  bool withdrowTokensComplete = false;  

  function Crowdsale() {

    //set calculate rate from USD
    ico_rate = 3546099290780141; // ~ 1 USD

    decimals = 35460992907801; // 0.0000003 ETH // 2 decimals

    //14.10.2017 10:00 UTC (1507975200)
    pre_ico_start = 1507975200;

    //10.11.2017 23:59 UTC (1510358340)
    pre_ico_finish = 1510358340;

    //20.11.2017 10:00 UTC (1511172000)
    ico_start = 1511172000;

    //03.01.2018 23:59 UTC (1515023940)
    ico_finish = 1515023940;

    isPreICO = true;
    isICO = false;

    currentPhase = 1;

    isICOFail = false;

    pre_ico_sold = 0;
    ico_sold = 0;

    pre_ico_totalETH = 0;
    ico_totalETH = 0;

    pre_ico_discount = 5;

    totalAmount = 100000000000;  // 1 000 000 000 00;  // with 2 decimals
    projectAmount = 48000000000; //   480 000 000 00;  // with 2 decimals
    bountyAmount = 2000000000;   //    20 000 000 00;  // with 2 decimals
    saleAmount = 50000000000;    //   500 000 000 00;  // with 2 decimals

    ico_tokens = 49000000000;    //   490 000 000 00;  // with 2 decimals
    pre_ico_tokens = 1000000000; //    10 000 000 00;  // with 2 decimals

    // 2 000 000 USD (with 2 decimals) //FOR ICO
    mincup = 202020202;

    // 10 000 000 USD (with 2 decimals) //FOR Pre-ICO
    maxcup = 1000000000;

    // 50 USD (with 2 decimals)
    minimumInvestmentICO = 5000; // ~50 tokens

    // 2000 USD (with 2 decimals)
    minimumInvestmentPreICO = 200000; // 2000 tokens

    mintingFinished = false;

    setTotalSupply();

    alreadyBurn = 0;

    privilegedWalletsCount.push(msg.sender);
    privilegedWallets[msg.sender] = 1;


        /////--PRODUCTION-ADDRESSES--//////
/*
    // 3% ETH
    pre_ico_bountyAddress1 = 0xdA39e0Ce2adf93129D04F53176c7Bfaaae8B051a;

    // 97% ETH
    pre_ico_bountyAddress2 = 0x06CeA8A430896B93C7b58230339d01445ee12DFf;

    // 2% Tokens (20 000 000) && // 2% unsold tokens
    bountyAddress = 0x0064952457905eBFB9c0292200A74B1d7414F081;

    // 48% unsold tokens;
    projectTeamAddress = 0x06CeA8A430896B93C7b58230339d01445ee12DFf;

    // 3%
    addr1 = 0xdA39e0Ce2adf93129D04F53176c7Bfaaae8B051a;
    // 25%
    addr2 = 0xdAB8a65e0EDc10C5708E3d44C98140F3A5B35B24;
    // 25%
    addr3 = 0xB4a4352F371f0E56301E31E0e2b8Dc381f09619c;
    // 25%
    addr4 = 0xb0Db9cbB1023FD81621Cce8CA0fda3aA7C2E0b5D;
    // 22%
    addr5 = 0x65a05b4535BbFF25d9b2644f7b440853D1D33aFE;

*/

    /////--TEST-ADDRESSES--//////

    // 3% ETH
    pre_ico_bountyAddress1 = 0x8fe1a2a0e81c3945f7009127956a336208f328f4;

    // 97% ETH
    pre_ico_bountyAddress2 = 0x27e1d0c72e63bd5e317a18fc4375ec0bdaa4ffc4;

    // 2% Tokens (20 000 000) && // 2% unsold tokens
    bountyAddress = 0xa4852ef2cfb0d5caae3afac5935bfd578f5a3a90;

    // 48% Tokens (480 000 000) && // 48% unsold tokens;
    projectTeamAddress = 0xef7c4859c2e1b431b76776ec4d6b26588024999c;

    // 3% ETH
    addr1 = 0xd05cfd880de7cb58f3c99aa33215279637f0c495;
    // 25% ETH
    addr2 = 0x79f6e0b24f63d2dee9306291143ac64a811e126c;
    // 25% ETH
    addr3 = 0xbf6fcf72e47bb58769745d416745e347e0246614;
    // 25% ETH
    addr4 = 0x059797cba5484dae400e26f18c205235f9ccd206;
    // 22% ETH
    addr5 = 0xad3ce2c47fd614f1a991f61e3c9419806f112c03;

  }

  modifier canMint() {
    require(!mintingFinished);
    _;
  }

  function() external payable {
    mint();    
  }

  function bytesToUInt(bytes32 v) private constant returns (uint ret) {
    if (v == 0x0) {
        revert();
    }

    uint digit;

    for (uint i = 0; i < 32; i++) {
      digit = uint((uint(v) / (2 ** (8 * (31 - i)))) & 0xff);
      if (digit == 0 || digit == 46) {
          break;
      }
      else if (digit < 48 || digit > 57) {
          revert();
      }
      ret *= 10;
      ret += (digit - 48);
    }
    return ret;
  }

  function calculateRate() public payable returns(uint256) {
    bytes32 result = getWrapperData();
    uint256 usd = bytesToUInt(result);

    uint256 price = 1 ether / usd; //price for 1 BMC //4545454545454546;

    return price;
  }

  function calculatePrice(uint256 _usd, uint256 _ico_sold) private returns(uint256) {
    
    if (currentPhase == 1 && ico_sold + _ico_sold < firsPhaseAmount) {
      return _usd.mul(firsPhaseDiscount).div(1000);
    }

    if (currentPhase == 2 && ico_sold + _ico_sold >= firsPhaseAmount && ico_sold + _ico_sold < secondPhaseAmount) {
      return _usd.mul(secondPhaseDiscount).div(1000);
    }

    if (currentPhase == 3 && ico_sold + _ico_sold >= secondPhaseAmount && ico_sold + _ico_sold < thirdPhaseAmount) {
      return _usd.mul(thirdPhaseDiscount).div(1000);
    }

    if (currentPhase == 4 && ico_sold + _ico_sold >= thirdPhaseAmount && ico_sold + _ico_sold < fourPhaseAmount) {
      return _usd.mul(fourPhaseDiscount).div(1000);
    }

    return _usd;
  }

  modifier isInitialize() {
    require(!initialize);
    _;
  }

  function setTotalSupply() private isInitialize onlyOwner returns(uint256) {
    initialize = true;
    return token.setTotalSupply(totalAmount);
  }

  function checkCondition() private {
    if (now < pre_ico_start) {
      revert();
    }

    if (pre_ico_sold >= maxcup || ico_sold >= ico_tokens) {
      refund(msg.value);
      revert();
    }

    if (now >= pre_ico_finish) {
      isPreICO = false;
      isICO = true;
    }

    if (now > pre_ico_finish && now < ico_start) {
      revert();
    }

    if (now >= ico_finish) {
      isICO = false;
    }

    if (!isICO && !isPreICO) {
      refund(msg.value);
      revert();
    }
  }

  function sendToAddress(address _address, uint256 _tokens) canMint public {

    checkCondition();

    if (privilegedWallets[msg.sender] == 0) {
      revert();
    }

    if (isICO && _tokens < minimumInvestmentICO) {
      revert();
    }

    if (isPreICO && _tokens < minimumInvestmentPreICO) {
      revert();
    }

    saveInfoAboutInvestors(_address, 0, _tokens, true);         

    token.mint(_address, _tokens);

    soldTokens = soldTokens + _tokens;
  }

  modifier isICOFinished() {
    if (now > ico_finish) {
      finishMinting();
      refund(msg.value);
      revert();
    }
    _;
  }

  function getTokens() public constant returns(uint256) {
    token.getTotalTokenCount();
  }

  function setPrivelegedWallet(address _address) public onlyOwner {
    if (privilegedWalletsCount.length == 2) {
      revert();
    }

    if (privilegedWallets[_address] == 0) {
      privilegedWalletsCount.push(_address);
    }

    privilegedWallets[_address] = 1;

  }

  function setTransferOwnership(address _address) public onlyOwner {

    removePrivelegedWallet(msg.sender);
    setPrivelegedWallet(_address);

    transferOwnership(_address);
  }

  function removePrivelegedWallet(address _address) public onlyOwner {
    if (privilegedWallets[_address] == 1) {
      privilegedWallets[_address] = 0;
      delete privilegedWalletsCount[0];
    } else {
      revert();
    }
  }

  //only for demonstrate Test Version
  function setICODate(uint256 _time) public onlyOwner {
    ico_start = _time;
  }

  function getICODate() public constant returns(uint256) {
    return ico_start;
  }

  //only for demonstrate Test Version
  function setPreICODate(uint256 _time) public onlyOwner {
    pre_ico_start = _time;
  }

  function getPreICODate() public constant returns(uint256) {
    return pre_ico_start;
  }

  //only for demonstrate Test Version
  function setICOFinishDate(uint256 _time) public onlyOwner {
    ico_finish = _time;
  }

  function getICOFinishDate() public constant returns(uint256) {
    return ico_finish;
  }

  //only for demonstrate Test Version
  function setPreICOFinishDate(uint256 _time) public onlyOwner {
    pre_ico_finish = _time;
  }

  function getPreICOFinishDate() public constant returns(uint256) {
    return pre_ico_finish;
  }

  function mint() public canMint isICOFinished payable {

    checkCondition();

    ico_rate = calculateRate();

    decimals = ico_rate / 100; 

    uint256 remainder = msg.value.mod(decimals);

    uint256 eth = msg.value.sub(remainder);

    if (remainder != 0) {
      refund(remainder);
    }

    uint256 discountPrice = 0;

    if (isICO) {
      discountPrice = calculatePrice(ico_rate, 0);
      ico_totalETH = ico_totalETH + eth;
    }

    if (isPreICO) {
      discountPrice = ico_rate.mul(pre_ico_discount).div(100);
      pre_ico_totalETH = pre_ico_totalETH + eth;
    }

    uint currentRate = discountPrice / 100; 

    uint256 tokens = eth.div(currentRate);

    uint256 availableTokensPhase = 0;
    uint256 ethToRefundPhase = 0;

    uint256 nextTokens = 0;
    uint256 remETH = 0;

    uint256 totalTokensPhase = 0;

    if (isICO) {
      if (currentPhase == 1 && ico_sold + tokens > firsPhaseAmount) {
        (availableTokensPhase, ethToRefundPhase) = calculateMinorRefund(firsPhaseAmount, ico_sold, currentRate, tokens);
        totalTokensPhase = availableTokensPhase;

        remETH = ethToRefundPhase;

        currentPhase = 2;

        currentRate =  calculatePrice(ico_rate, totalTokensPhase) / 100;
        tokens = remETH.div(currentRate);
      }

      if (currentPhase == 2 && ico_sold + tokens + totalTokensPhase > secondPhaseAmount) {
        (availableTokensPhase, ethToRefundPhase) = calculateMinorRefund(secondPhaseAmount, ico_sold, currentRate, tokens);
        totalTokensPhase = totalTokensPhase + availableTokensPhase;
        
        remETH = ethToRefundPhase;

        currentPhase = 3;

        currentRate =  calculatePrice(ico_rate, totalTokensPhase) / 100;
        tokens = remETH.div(currentRate);
      }

      if (currentPhase == 3 && ico_sold + tokens + totalTokensPhase > thirdPhaseAmount) {
        (availableTokensPhase, ethToRefundPhase) = calculateMinorRefund(thirdPhaseAmount, ico_sold, currentRate, tokens);
        totalTokensPhase = totalTokensPhase + availableTokensPhase;
        
        remETH = ethToRefundPhase;

        currentPhase = 4;

        currentRate =  calculatePrice(ico_rate, totalTokensPhase) / 100;
        tokens = remETH.div(currentRate);
      }

      if (currentPhase == 4 && ico_sold + tokens + totalTokensPhase > fourPhaseAmount) {
        (availableTokensPhase, ethToRefundPhase) = calculateMinorRefund(fourPhaseAmount, ico_sold, currentRate, tokens);
        totalTokensPhase = totalTokensPhase + availableTokensPhase;
        
        remETH = ethToRefundPhase;

        currentPhase = 0;

        currentRate =  calculatePrice(ico_rate, totalTokensPhase) / 100;
        tokens = remETH.div(currentRate);
      }

      tokens = tokens + totalTokensPhase;

      if (tokens < minimumInvestmentICO) {
        refund(eth);
        revert();
      } else {
        if (ico_sold + tokens > ico_tokens) {
          var (availableTokensICO, ethToRefundICO) = calculateMinorRefund(ico_tokens, ico_sold, currentRate, tokens);
          tokens = availableTokensICO;
          eth = eth - ethToRefundICO;
        }
      }
    }

    if (isPreICO) {
      if (tokens < minimumInvestmentPreICO) {
        refund(eth);
        revert();
      } else {
        if (pre_ico_sold + tokens > maxcup) {
          var (availableTokensPreICO, ethToRefundPreICO) = calculateMinorRefund(maxcup, pre_ico_sold, currentRate, tokens);
          tokens = availableTokensPreICO;
          eth = eth - ethToRefundPreICO;
        }
      }
      
      withdrowETH(eth);      
    }

    saveInfoAboutInvestors(msg.sender, eth, tokens, false);

    token.mint(msg.sender, tokens);

    soldTokens = soldTokens + tokens;
    
    totalETH = totalETH + eth;

    if (ico_sold >= ico_tokens) {
      finishMinting();
    }
  }

  function calculateMinorRefund(uint256 _maxcup, uint256 _sold, uint256 _rate, uint256 _tokens) private returns(uint256 _availableTokens, uint256 _ethToRefund) {
    uint256 availableTokens = _maxcup - _sold;
    uint256 tokensForRefund = _tokens - availableTokens;
    uint256 refundETH = tokensForRefund * _rate;

    return (availableTokens, refundETH);
  }

  function withdrowETH(uint256 _eth) private {
    if (!isICO) {

      uint256 eth1 = _eth.mul(3).div(100);
      uint256 eth2 = _eth.mul(97).div(100);

      pre_ico_bountyAddress1.transfer(eth1);
      pre_ico_bountyAddress2.transfer(eth2);
    }

    if (isICO) {

      uint256 three = _eth.mul(3).div(100);
      uint256 twentyFive = _eth.mul(25).div(100);
      uint256 twentyTwo = _eth.mul(22).div(100);

      addr1.transfer(three);
      addr2.transfer(twentyFive);
      addr3.transfer(twentyFive);
      addr4.transfer(twentyFive);
      addr5.transfer(twentyTwo);
    }
  }

  function withdrowTokens(uint256 tokens1, uint256 tokens2) private {    
    if (!withdrowTokensComplete && isICO) {
      token.withdrowTokens(bountyAddress, tokens1);
      token.withdrowTokens(projectTeamAddress, tokens2);

      ico_buyers_token[bountyAddress] = ico_buyers_token[bountyAddress].add(tokens1);

      ico_buyers_token[projectTeamAddress] = ico_buyers_token[projectTeamAddress].add(tokens2);

      withdrowTokensComplete = true;
    }
  }

  function saveInfoAboutInvestors(address _address, uint256 _amount, uint256 _tokens, bool _isManual) private {
    if (!_isManual) {
      if (isICO) {
        if (ico_buyers_token[_address] == 0) {
          ico_investors.push(_address);
        }

        // Store ETH of Investor
        ico_buyers_eth[_address] = ico_buyers_eth[_address].add(_amount);

        // Store Token of Investor
        ico_buyers_token[_address] = ico_buyers_token[_address].add(_tokens);

        ico_sold = ico_sold + _tokens;
      }

      if (isPreICO) {
        if (pre_ico_buyers_token[_address] == 0) {
          pre_ico_investors.push(_address);
        }

        // Store ETH of Investor
        pre_ico_buyers_eth[_address] = pre_ico_buyers_eth[_address].add(_amount);

        // Store Token of Investor
        pre_ico_buyers_token[_address] = pre_ico_buyers_token[_address].add(_tokens);
      
        pre_ico_sold = pre_ico_sold + _tokens;
      }
      
    } else {
      if (isICO) {
        if(ico_buyers_token[_address] == 0) {
          ico_investors.push(_address);
        }

        ico_sold = ico_sold + _tokens;

        ico_buyers_token[_address] = ico_buyers_token[_address].add(_tokens);
      }

      if (isPreICO) {
        if(pre_ico_buyers_token[_address] == 0) {
          pre_ico_investors.push(_address);
        }

        pre_ico_sold = pre_ico_sold + _tokens;

        pre_ico_buyers_token[_address] = pre_ico_buyers_token[_address].add(_tokens);
      }
    }
  }

  // Change for private when deploy to main net
  function finishMinting() public onlyOwner {

    if(mintingFinished && alreadyBurn == ico_investors.length) {
      revert();
    }

    token.finishMinting();

    mintingFinished = true;

    if (ico_sold < mincup) {

      isICOFail = true;

      if(ico_investors.length != 0) {
        if (alreadyBurn < ico_investors.length) {
          uint256 futureCount = 100;
          uint256 futureBurn = alreadyBurn + futureCount;
          if (futureBurn <= ico_investors.length) {
            /* Burn logic */
            alreadyBurn = failBurn(alreadyBurn, futureBurn);
            ShowTestU(alreadyBurn);
          } else {
            if (futureBurn > ico_investors.length && alreadyBurn < ico_investors.length) {
              uint256 remainder = ico_investors.length - alreadyBurn;
              /* Burn logic */
              alreadyBurn = failBurn(alreadyBurn, remainder);
              ShowTestU(alreadyBurn);
            }
          }
        }
      }
    } else {

      withdrowETH(ico_totalETH);

      var ( , _all, ) = getLeftToken();

      uint256 leftForBounty = _all.mul(2).div(100);

      uint256 leftForProject = _all.mul(48).div(100);

      uint256 totalBountyAmount = bountyAmount + leftForBounty;

      uint256 totalProjectAmount = projectAmount + leftForProject;

      withdrowTokens(totalBountyAmount, totalProjectAmount);
    }
  }

  function failBurn(uint256 _countAlready, uint256 _countBurn) private onlyOwner returns(uint256) {
    for (uint256 i=_countAlready; i < _countBurn; i++) {
      address addr = ico_investors[i];
      uint256 pre_tokens = pre_ico_buyers_token[addr];
      ico_buyers_token[addr] = 0;
      token.burnTokens(addr, pre_tokens, pre_ico_sold);
    }
    return _countBurn;
  }

  function getAlreadyBurn() public constant returns(uint256) {
    return alreadyBurn;
  }

  function burnLeftTokens() public onlyOwner {
    token.burnFinish(ico_finish);
  }

  function getFinishStatus() public constant returns(bool) {
    return mintingFinished;
  }

  function manualRefund() public {
    if (mintingFinished && isICOFail) {
      if(ico_buyers_eth[msg.sender] != 0) {
        uint256 amount = ico_buyers_eth[msg.sender];
        msg.sender.transfer(amount);
        ico_buyers_eth[msg.sender] = 0;
      } else {
        revert();
      }
    } else {
      revert();
    }
    
  }

  function refund(uint256 _amount) private {
    msg.sender.transfer(_amount);
  }

  function refund(address _address, uint256 _amount) private {
    _address.transfer(_amount);
  }

  function getBalanceContract() public constant returns(uint256) {
    return this.balance;
  }

  function getSoldToken() public constant returns(uint256 _soldTokens, uint256 _ico_sold, uint256 _pre_ico_sold) {
    return (soldTokens, ico_sold, pre_ico_sold);
  }

  function getInvestorsTokens(address _address, bool _isICO) public constant returns(uint256) {
    if (_isICO) {
      return ico_buyers_token[_address];
    } else {
      return pre_ico_buyers_token[_address];
    }
  }

  function getInvestorsCount(bool _isICO) public constant returns(uint256) {
    if (_isICO) {
      return ico_investors.length;
    } else {
      return pre_ico_investors.length;
    }
  }

////-----TEST-&-DEBUG-SECTION-----////

  //only for test version
    // 03.01.2018 23:59 UTC (1515023940)
  uint256 ico_finish1 = 1506445200;

  modifier isFreeze() {
    if(now < ico_finish1) {
      revert();
    }
    _;
  }

  //only for test version
  function transfer(address _to, uint256 _amount) isFreeze public {
    if (isICO) {
      ico_buyers_token[_to] = ico_buyers_token[_to] + _amount;
      ico_buyers_token[msg.sender] = ico_buyers_token[msg.sender] - _amount;
    } else {
      pre_ico_buyers_token[_to] = pre_ico_buyers_token[_to] + _amount;
      pre_ico_buyers_token[msg.sender] = pre_ico_buyers_token[msg.sender] - _amount;
    }
  }

///////////////////////////////////

  function getInvestorByIndex(uint256 _index, bool _isICO) public constant returns(address) {
    if (_isICO) {
      return ico_investors[_index];
    } else {
      return pre_ico_investors[_index];
    }
  }

  function getLeftToken() public constant returns(uint256 _all, uint256 _ico, uint256 _pre_ico) {
    uint256 all_left = token.totalSupply() != 0 ? token.totalSupply() - soldTokens : token.totalSupply();
    uint256 ico_left = ico_tokens != 0 ? ico_tokens - ico_sold : ico_tokens;
    uint256 pre_ico_left = pre_ico_tokens != 0 ? pre_ico_tokens - pre_ico_sold : pre_ico_tokens;

    return (all_left, ico_left, pre_ico_left);
  }

  function getTotalToken() public constant returns(uint256 _totalToken, uint256 _ico_totalToken, uint256 _pre_ico_totalToken) {
    return (token.totalSupply(), ico_tokens, pre_ico_tokens);
  }

  function getTotalETH() public constant returns(uint256 _totalETH, uint256 _ico_totalETH, uint256 _pre_ico_totalETH) {
    return (totalETH, ico_totalETH, pre_ico_totalETH);
  }

  function getContractAddress() public constant returns(address) {
    return this;
  }

  function getOwner() public constant returns(address) {
    return owner;
  }

  function sendOracleData() public payable {
    if (msg.value != 0) {
        wrapper.transfer(msg.value);
    }
    
    wrapper.update("URL", "json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0");
  }

  function checkWrapperBalance() public constant returns(uint256) {
    return wrapper.getWrapperBalance();
  }

  function getWrapperData() public constant returns(bytes32) {
    return wrapper.getWrapperData();
  }
}

//0xdc43e7a589a7949b41cb16347e51553eb4d2a96a