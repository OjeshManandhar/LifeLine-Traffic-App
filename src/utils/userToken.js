// Expo
import * as SecureStore from 'expo-secure-store';

// env
import { USER_TOKEN_KEY } from '@env';

class UserToken {
  #userToken = null;

  async init() {
    this.#userToken = await SecureStore.getItemAsync(USER_TOKEN_KEY);
  }

  async set(token) {
    if (typeof token === 'string') {
      await SecureStore.setItemAsync(USER_TOKEN_KEY, token);
      this.#userToken = token;
    } else {
      console.error('token must be string');
    }
  }

  get() {
    return this.#userToken;
  }

  async delete() {
    await SecureStore.deleteItemAsync(USER_TOKEN_KEY);
    this.#userToken = null;
  }
}

export default new UserToken();
