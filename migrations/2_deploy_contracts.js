// eslint-disable-next-line
let Crowdsale = artifacts.require('./Crowdsale.sol');

module.exports = (deployer) => {
  // eslint-disable-next-line
  deployer.deploy(Crowdsale, { from: web3.eth.accounts[0], gas: 4712380, gasLimit: 200000000 });
};
