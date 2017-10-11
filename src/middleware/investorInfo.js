import { getTokensByInvestor } from '../utils/token/getTokensByInvestor';

export async function getInvestorsInfo() {
  const isICO = true;

  const investorsTokensICO = await getTokensByInvestor(isICO);
  const investorsTokensPreICO = await getTokensByInvestor(!isICO);
  const symbol = 'BMC';

  const info = {
    investorsTokensICO,
    investorsTokensPreICO,
    symbol
  };
  return info;
}
