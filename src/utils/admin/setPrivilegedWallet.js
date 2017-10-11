import getWeb3 from '../provider/web3';

import CrowdsaleContract from '../../contracts/Crowdsale.json';

const contract = require('truffle-contract');

export async function setPrivilegedWallet(addressPrivilegedWallet) {
  const web3Provider = await getWeb3.then(results => results.web3);
  const account = web3Provider.eth.accounts[0];

  const crowdsaleContract = contract(CrowdsaleContract);
  crowdsaleContract.setProvider(web3Provider.currentProvider);

  const instance = await crowdsaleContract.deployed();
  const tokens = await instance.setPrivelegedWallet(addressPrivilegedWallet, { gas: 4412200, from: account })
    .then(result => result);

  return tokens;
}
