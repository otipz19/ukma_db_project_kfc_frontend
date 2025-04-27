import {ClientRegistration} from "../../../../api/model/clientRegistration";

export type RegisterClientDto = ClientRegistration & {
  phoneNumber?: string,
  email?: string
};
