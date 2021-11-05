import {IdentityKey, IdentityStore} from './';
import {BasicProfile} from '@ceramicstudio/idx-constants';

class LocalStorageIdentityStore implements IdentityStore {
  constructor(private readonly prefix: string) {}

  async setAddress(value: string): Promise<void> {
    localStorage.setItem(this.getKey(IdentityKey.ADDRESS), value);
  }

  async getAddress(): Promise<string | null> {
    return localStorage.getItem(this.getKey(IdentityKey.ADDRESS));
  }

  async setDID(value: string): Promise<void> {
    localStorage.setItem(this.getKey(IdentityKey.DID), value);
  }

  async getDID(): Promise<string | null> {
    return localStorage.getItem(this.getKey(IdentityKey.DID));
  }

  async setBasicProfile(value: BasicProfile): Promise<void> {
    localStorage.setItem(
      this.getKey(IdentityKey.BASIC_PROFILE),
      JSON.stringify(value),
    );
  }

  async getBasicProfile(): Promise<BasicProfile | null> {
    const value = localStorage.getItem(this.getKey(IdentityKey.BASIC_PROFILE));

    if (value) {
      return JSON.parse(value);
    }

    return null;
  }

  async clearAll(): Promise<void> {
    this.clear(IdentityKey.ADDRESS);
    this.clear(IdentityKey.DID);
    this.clear(IdentityKey.BASIC_PROFILE);
  }

  async clear(key: IdentityKey): Promise<void> {
    localStorage.removeItem(this.getKey(key));
  }

  getKey(key: IdentityKey): string {
    return `${this.prefix}:${key}`;
  }
}

export default LocalStorageIdentityStore;
