// packages
import Axios from 'axios';

// env
import { API_URL, TOKEN_CHECK } from '@env';

export default async function (token) {
  const url = API_URL + TOKEN_CHECK;

  return Axios.post(url, { token });
}
