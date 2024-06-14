import { encryptTransform } from 'redux-persist-transform-encrypt';

const encryptor = encryptTransform({
  secretKey: 'my-super-secret-app-key'
});

export default encryptor;