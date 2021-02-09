// Packages
import AsyncStorage from '@react-native-community/async-storage';

// env
import { USER_INFO_KEY } from '@env';

class UserToken {
  #token = null;
  #info = {
    name: null,
    contact: null,
    role: 'traffic'
  };

  async init() {
    console.log('UserInfo init()');

    const data = await JSON.parse(await AsyncStorage.getItem(USER_INFO_KEY));

    if (data) {
      this.#token = data.token;
      this.#info = {
        name: data.name,
        role: data.role,
        contact: data.contact
      };
    }
  }

  async set(info) {
    await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(info));
    this.#info = {
      name: info.name,
      contact: info.contact,
      role: info.role
    };
    this.#token = info.token;
  }

  getToken() {
    return this.#token;
  }

  getContact() {
    return this.#info.contact;
  }

  getInfo() {
    return this.#info;
  }
  async delete() {
    await AsyncStorage.removeItem(USER_INFO_KEY);
    this.#info = {
      name: null,
      contact: null,
      role: 'traffic'
    };
    this.#token = null;
  }
}

export default new UserToken();
