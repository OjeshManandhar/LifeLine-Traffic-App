// packages
import Axios from 'axios';

// env
import { API_URL, TOKEN_CHECK } from '@env';

export default async function (token) {
  const url = API_URL + TOKEN_CHECK;

  return Axios.get(url, {
    headers: {
      'x-access-token': token
    }
  });
}
