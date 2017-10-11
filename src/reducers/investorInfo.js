import { INITIALIZE_INVESTOR_INFO, UPDATE_INVESTOR_INFO } from '../constants/ActionsTypes';

const initialState = {
  investorsTokensICO: 'investorsTokensICO',
  investorsTokensPreICO: 'investorsTokensPreICO',
  symbol: 'symbol'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_INVESTOR_INFO:
      return state;
    case UPDATE_INVESTOR_INFO:
      return {
        investorsTokensICO: action.payload.investorsTokensICO,
        investorsTokensPreICO: action.payload.investorsTokensPreICO,
        symbol: action.payload.symbol
      };
    default:
      return state;
  }
};
