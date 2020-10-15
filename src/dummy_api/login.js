export default async function (phoneNumber, password, valid = null) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (valid != null) {
        if (valid) {
          resolve({ userToken: 'userToken' });
        } else {
          reject({ errorCode: 'phonePassError' });
        }
      } else {
        if (Math.random() < 0.5) {
          if (phoneNumber === '9863198269') {
            if (password === 'deadskull') {
              resolve({ userToken: 'userToken' });
            } else {
              reject({ errorCode: 'phonePassError' });
            }
          } else {
            reject({ errorCode: 'noAccount' });
          }
        } else {
          reject({ errorCode: 'noNetwork' });
        }
      }
    }, 0.05 * 1000);
  });
}
