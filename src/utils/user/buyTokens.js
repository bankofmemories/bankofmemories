import getWeb3 from '../provider/web3';

import CrowdsaleContract from '../../contracts/Crowdsale.json';

const contract = require('truffle-contract');

export async function buyTokens(eth) {
  const web3Provider = await getWeb3.then(results => results.web3);
  const account = web3Provider.eth.accounts[0];

  const crowdsaleContract = contract(CrowdsaleContract);
  crowdsaleContract.setProvider(web3Provider.currentProvider);

  const instance = await crowdsaleContract.deployed();
  const tokens = await instance.mint({ gas: 4412200, from: account, value: eth })
    .then(result => result);
  return tokens;
}
