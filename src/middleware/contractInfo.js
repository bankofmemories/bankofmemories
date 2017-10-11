import { getAddressICO } from '../utils/contract/getAddressICO';
import { getOwnerContract } from '../utils/contract/getOwnerContract';
import { getAddressToken } from '../utils/token/getAddressToken';

export async function getICOInfo() {
  const addressICO = await getAddressICO();
  const addressToken = await getAddressToken();
  const addressOwner = await getOwnerContract();

  const info = {
    addressICO,
    addressToken,
    addressOwner
  };
  return info;
}
