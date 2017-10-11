import getWeb3 from '../provider/web3';

import CrowdsaleContract from '../../contracts/Crowdsale.json';

const contract = require('truffle-contract');

export async function getPriceToken() {
  const web3Provider = await getWeb3.then(results => results.web3);
  const account = web3Provider.eth.accounts[0];

  const crowdsaleContract = contract(CrowdsaleContract);
  crowdsaleContract.setProvider(web3Provider.currentProvider);

  const oraclizeTax = 1000000000000000000;

  const instance = await crowdsaleContract.deployed();
  const request = await instance.sendOracleData({ gas: 4412200, from: account, value: oraclizeTax })
    .then(result => result);
  return request;
}
