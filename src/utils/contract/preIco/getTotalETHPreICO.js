import getWeb3 from '../../provider/web3';

import CrowdsaleContract from '../../../contracts/Crowdsale.json';

const contract = require('truffle-contract');

export async function getTotalETHPreICO() {
  const web3Provider = await getWeb3.then(results => results.web3);
  const account = web3Provider.eth.accounts[0];

  const crowdsaleContract = contract(CrowdsaleContract);
  crowdsaleContract.setProvider(web3Provider.currentProvider);

  const instance = await crowdsaleContract.deployed();
  const eth = await instance.getTotalETH({ gas: 4412200, from: account })
    .then(result => result[2].toString());

  return eth;
}
