// npm crypto library
const crypto = require('crypto');
const hexToBinary = require('hex-to-binary');

const cryptoHash = (...inputs) => {
  // inport SHA-256 algorithm
  const hash = crypto.createHash('sha256');

  // creates a hash for us with inputs
  // sort to make input values ordered to generate uniform hash
  hash.update(inputs.sort().join(' '));

  // return digest or result of array in hex form, then hextToBinary will convert the hex to binary
  return hexToBinary(hash.digest('hex'));
};

module.exports = cryptoHash;