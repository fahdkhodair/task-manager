import cryptoJS from "crypto-js";

export const generateEncryption = (text) => {
  return cryptoJS.AES.encrypt(text, process.env.SECRET_KEY).toString();
};
export const decryptEncryption = (ciphertext) => {
  const bytes = cryptoJS.AES.decrypt(ciphertext, process.env.SECRET_KEY);
  return bytes.toString(cryptoJS.enc.Utf8);
}