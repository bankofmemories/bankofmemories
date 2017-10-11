import { INITIALIZE_ICO_INFO, UPDATE_ICO_INFO } from '../constants/ActionsTypes';

const initialState = {
  addressICO: 'addressICO',
  addressToken: 'addressToken',
  addressOwner: 'addressOwner'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_ICO_INFO:
      return state;
    case UPDATE_ICO_INFO:
      return {
        addressICO: action.payload.addressICO,
        addressToken: action.payload.addressToken,
        addressOwner: action.payload.addressOwner
      };
    default:
      return state;
  }
};
