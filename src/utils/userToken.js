// Packages
import AsyncStorage from '@react-native-community/async-storage';

// env
import { USER_TOKEN_KEY } from '@env';

class UserToken {
  #userToken = null;

  async init() {
    this.#userToken = await AsyncStorage.getItem(USER_TOKEN_KEY);
  }

  async set(token) {
    if (typeof token === 'string') {
      await AsyncStorage.setItem(USER_TOKEN_KEY, token);
      this.#userToken = token;
    } else {
      console.error('token must be string');
    }
  }

  get() {
    return this.#userToken;
  }

  async delete() {
    await AsyncStorage.removeItem(USER_TOKEN_KEY);
    this.#userToken = null;
  }
}

export default new UserToken();
