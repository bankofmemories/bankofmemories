import { INITIALIZE_TOKEN_INFO, UPDATE_TOKEN_INFO } from '../constants/ActionsTypes';

const initialState = {
  // ICO
  totalTokensICO: 0,
  soldTokensICO: 0,
  leftTokensICO: 0,
  totalETHICO: 0,
  investorsCountICO: 0,
  dateStartICO: 0,
  dateFinishICO: 0,

  // Pre-ICO
  totalTokensPreICO: 0,
  soldTokensPreICO: 0,
  leftTokensPreICO: 0,
  totalETHPreICO: 0,
  investorsCountPreICO: 0,
  dateStartPreICO: 0,
  dateFinishPreICO: 0,

  // Main
  totalTokens: 0,
  soldTokens: 0,
  leftTokens: 0,
  totalETH: 0,
  alreadyBurn: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_TOKEN_INFO:
      return state;
    case UPDATE_TOKEN_INFO:
      return {
        // ICO
        totalTokensICO: action.payload.totalTokensICO,
        soldTokensICO: action.payload.soldTokensICO,
        leftTokensICO: action.payload.leftTokensICO,
        totalETHICO: action.payload.totalETHICO,
        investorsCountICO: action.payload.investorsCountICO,
        dateStartICO: action.payload.dateStartICO,
        dateFinishICO: action.payload.dateFinishICO,

        // Pre-ICO
        totalTokensPreICO: action.payload.totalTokensPreICO,
        soldTokensPreICO: action.payload.soldTokensPreICO,
        leftTokensPreICO: action.payload.leftTokensPreICO,
        totalETHPreICO: action.payload.totalETHPreICO,
        investorsCountPreICO: action.payload.investorsCountPreICO,
        dateStartPreICO: action.payload.dateStartPreICO,
        dateFinishPreICO: action.payload.dateFinishPreICO,

        // Main
        totalTokens: action.payload.totalTokens,
        soldTokens: action.payload.soldTokens,
        leftTokens: action.payload.leftTokens,
        totalETH: action.payload.totalETH,
        alreadyBurn: action.payload.alreadyBurn,
      };
    default:
      return state;
  }
};
