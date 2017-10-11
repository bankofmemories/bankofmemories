import * as types from '../constants/ActionsTypes';

export const initializeTransactions = () => ({ type: types.INITIALIZE_TRANSACTIONS });
export const addTransaction = array => ({ type: types.ADD_TRANSACTION, payload: array });
export const updateTransactions = array => ({ type: types.UPDATE_TRANSACTIONS, payload: array });

export const initializeManualTransactions = () => ({ type: types.INITIALIZE_MANUAL_TRANSACTIONS });
export const addManualTransaction = array => ({ type: types.ADD_MANUAL_TRANSACTION, payload: array });
export const updateManualTransactions = array => ({ type: types.UPDATE_MANUAL_TRANSACTIONS, payload: array });

export const initializeTokenInfo = () => ({ type: types.INITIALIZE_TOKEN_INFO });
export const updateTokenInfo = object => ({ type: types.UPDATE_TOKEN_INFO, payload: object });

export const initializeICOInfo = () => ({ type: types.INITIALIZE_ICO_INFO });
export const updateICOInfo = object => ({ type: types.UPDATE_ICO_INFO, payload: object });

export const initializeInvestorInfo = () => ({ type: types.INITIALIZE_INVESTOR_INFO });
export const updateInvestorInfo = object => ({ type: types.UPDATE_INVESTOR_INFO, payload: object });

export const initializeInvestorTransactions = () => ({ type: types.INITIALIZE_INVESTOR_TRANSACTIONS });
export const updateInvestorTransactionsICO = array => ({ type: types.UPDATE_INVESTOR_TRANSACTIONS_ICO, payload: array });
export const updateInvestorTransactionsPreICO = array => ({ type: types.UPDATE_INVESTOR_TRANSACTIONS_PRE_ICO, payload: array });
