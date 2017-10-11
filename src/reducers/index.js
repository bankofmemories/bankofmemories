import { combineReducers } from 'redux'

import transactions from './transactions';
import contractInfo from './contractInfo';
import investorInfo from './investorInfo';
import investorTransactionsICO from './investorTransactionsICO';
import investorTransactionsPreICO from './investorTransactionsPreICO';
import tokenInfo from './tokenInfo';

const rootReducer = combineReducers({
  transactions,
  contractInfo,
  investorInfo,
  investorTransactionsICO,
  investorTransactionsPreICO,
  tokenInfo
});

export default rootReducer;
