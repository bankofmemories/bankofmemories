import getWeb3 from '../provider/web3';

import CrowdsaleContract from '../../contracts/Crowdsale.json';

const contract = require('truffle-contract');

export async function showPriceToken() {
  const web3Provider = await getWeb3.then(results => results.web3);
  const account = web3Provider.eth.accounts[0];

  const crowdsaleContract = contract(CrowdsaleContract);
  crowdsaleContract.setProvider(web3Provider.currentProvider);

  const ether = 1000000000000000000;

  const instance = await crowdsaleContract.deployed();
  const response = await instance.getWrapperData({ gas: 4412200, from: account })
    .then((result) => {
      console.log('showPrice', web3Provider.toUtf8(result));
      const price = ether / web3Provider.toUtf8(result);
      return price / ether;
    });
  return response;
}
