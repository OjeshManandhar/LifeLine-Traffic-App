export default async function (userToken, valid = null) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (valid != null) {
        if (valid) {
          resolve({ valid: true });
        } else {
          resolve({ valid: false });
        }
      } else {
        if (Math.random() < 0.5 && userToken === 'userToken') {
          resolve({ valid: true });
        } else {
          resolve({ valid: false });
        }
      }
    }, 0.05 * 1000)
  );
}
