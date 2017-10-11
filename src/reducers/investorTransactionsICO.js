import { INITIALIZE_INVESTOR_TRANSACTIONS, UPDATE_INVESTOR_TRANSACTIONS_ICO } from '../constants/ActionsTypes';

const initialState = [
  {
    address: 'address',
    count: 0
  }
];

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_INVESTOR_TRANSACTIONS:
      return state;
    case UPDATE_INVESTOR_TRANSACTIONS_ICO:
      return action.payload;
    default:
      return state;
  }
};
