import getWeb3 from '../provider/web3';

export async function getTransactionsByAccount() {
  const array = [];

  const web3Provider = await getWeb3.then(results => results.web3);
  const account = web3Provider.eth.accounts[0];

  await web3Provider.eth.getBlock('latest', async (error, result) => {
    if (!error) {
      const endBlockNumber = result.number;
      const startBlockNumber = endBlockNumber - 100;
      // eslint-disable-next-line
      for (let i = startBlockNumber; i <= endBlockNumber; i++) {
        // eslint-disable-next-line
        await web3Provider.eth.getBlock(i, true, (error, blockResult) => {
          if (!error) {
            if (blockResult != null && blockResult.transactions != null) {
              blockResult.transactions.forEach(async (e) => {
                // eslint-disable-next-line
                if (account == e.from || account == e.to) {
                  array.push(e);
                }
              });
            }
          } else {
            console.error(error);
          }
        });
      }
    } else {
      console.error(error);
    }
  });
  return array;
}
