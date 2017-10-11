import getWeb3 from '../provider/web3';

import CrowdsaleContract from '../../contracts/Crowdsale.json';

const contract = require('truffle-contract');

export async function getInvestorsTransactions(isICO) {
  const web3Provider = await getWeb3.then(results => results.web3);
  const account = web3Provider.eth.accounts[0];

  const crowdsaleContract = contract(CrowdsaleContract);
  crowdsaleContract.setProvider(web3Provider.currentProvider);

  const instance = await crowdsaleContract.deployed();
  const inv = await instance.getInvestorsCount(isICO, { gas: 2000000, from: account }).then(async (dataCount) => {
    const countInv = dataCount.toString();
    const investors = [];

    // eslint-disable-next-line
    for (let i = 0; i < countInv; i++) {
      // eslint-disable-next-line
      await instance.getInvestorByIndex(i, isICO, { gas: 4712200, from: account }).then(async (dataAddress) => {
        console.log('INVESTORS_ADDRESS', dataAddress.toString());
        const address = dataAddress.toString();

        await instance.getInvestorsTokens(address, isICO, { gas: 4712200, from: account }).then(async (dataETH) => {
          console.log('INVESTORS_VALUE', dataETH.toString());
          investors.push({
            address,
            count: dataETH / 100 // 2 decimals
          });
        });
      });
    }
    return investors;
  });
  return inv;
}
