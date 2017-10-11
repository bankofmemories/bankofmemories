import { INITIALIZE_TRANSACTIONS, ADD_TRANSACTION, UPDATE_TRANSACTIONS } from '../constants/ActionsTypes';

const initialState = [
  {
    hash: 'hash',
    from: 'from address',
    to: 'to address',
    value: 0
  }
];

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_TRANSACTIONS:
      return state;
    case ADD_TRANSACTION:
      return [
        ...state,
        action.payload
      ];
    case UPDATE_TRANSACTIONS:
      return action.payload;
    default:
      return state;
  }
};
