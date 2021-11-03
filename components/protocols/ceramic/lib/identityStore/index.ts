import {BasicProfile} from '@ceramicstudio/idx-constants';

export enum IdentityKey {
  ADDRESS = 'Address',
  DID = 'DID',
  BASIC_PROFILE = 'BasicProfile',
}

export interface IdentityStore {
  setAddress: (value: string) => Promise<void>;
  getAddress: () => Promise<string | null>;
  setDID: (value: string) => Promise<void>;
  getDID: () => Promise<string | null>;
  setBasicProfile: (value: BasicProfile) => Promise<void>;
  getBasicProfile: () => Promise<BasicProfile | null>;
  clear: (key: IdentityKey) => void;
  clearAll: () => void;
}
