// ICO
import { getTotalTokenICO } from '../utils/contract/ico/getTotalTokenICO';
import { getSoldTokenICO } from '../utils/contract/ico/getSoldTokenICO';
import { getLeftTokenICO } from '../utils/contract/ico/getLeftTokenICO';
import { getTotalETHICO } from '../utils/contract/ico/getTotalETHICO';
import { getInvestorsCountICO } from '../utils/contract/ico/getInvestorsCountICO';

// Pre-ICO
import { getTotalTokenPreICO } from '../utils/contract/preIco/getTotalTokenPreICO';
import { getSoldTokenPreICO } from '../utils/contract/preIco/getSoldTokenPreICO';
import { getLeftTokenPreICO } from '../utils/contract/preIco/getLeftTokenPreICO';
import { getTotalETHPreICO } from '../utils/contract/preIco/getTotalETHPreICO';
import { getInvestorsCountPreICO } from '../utils/contract/preIco/getInvestorsCountPreICO';

// Main
import { getTotalToken } from '../utils/token/getTotalToken';
import { getSoldToken } from '../utils/token/getSoldToken';
import { getLeftToken } from '../utils/token/getLeftToken';
import { getTotalETH } from '../utils/contract/getTotalETH';
import { getAlreadyBurn } from '../utils/contract/getAlreadyBurn';

import { getICODate } from '../utils/contract/getICODate';
import { getPreICODate } from '../utils/contract/getPreICODate';

import { getFinishICODate } from '../utils/contract/getFinishICODate';
import { getFinishPreICODate } from '../utils/contract/getFinishPreICODate';

export async function getTokenInfo() {
  // ICO
  const totalTokensICO = await getTotalTokenICO();
  const soldTokensICO = await getSoldTokenICO();
  const leftTokensICO = await getLeftTokenICO();
  const totalETHICO = await getTotalETHICO();
  const investorsCountICO = await getInvestorsCountICO();

  // Pre-ICO
  const totalTokensPreICO = await getTotalTokenPreICO();
  const soldTokensPreICO = await getSoldTokenPreICO();
  const leftTokensPreICO = await getLeftTokenPreICO();
  const totalETHPreICO = await getTotalETHPreICO();
  const investorsCountPreICO = await getInvestorsCountPreICO();

  // Main
  const totalTokens = await getTotalToken();
  const soldTokens = await getSoldToken();
  const leftTokens = await getLeftToken();
  const totalETH = await getTotalETH();
  const alreadyBurn = await getAlreadyBurn();

  const dateStartICO = await getICODate();
  const dateStartPreICO = await getPreICODate();

  const dateFinishICO = await getFinishICODate();
  const dateFinishPreICO = await getFinishPreICODate();

  const info = {
    // ICO
    totalTokensICO,
    soldTokensICO,
    leftTokensICO,
    totalETHICO,
    investorsCountICO,
    dateStartICO: new Date(dateStartICO * 1000).toUTCString(),
    dateFinishICO: new Date(dateFinishICO * 1000).toUTCString(),

    // Pre-ICO
    totalTokensPreICO,
    soldTokensPreICO,
    leftTokensPreICO,
    totalETHPreICO,
    investorsCountPreICO,
    dateStartPreICO: new Date(dateStartPreICO * 1000).toUTCString(),
    dateFinishPreICO: new Date(dateFinishPreICO * 1000).toUTCString(),

    // Main
    totalTokens,
    soldTokens,
    leftTokens,
    totalETH,
    alreadyBurn
  };
  return info;
}
