class Block {
  // wrapping parameters into objects allows us to put input arguments in any order upon creation
  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }
}

const block1 = new Block({
  timestamp: '01/01/01', 
  lastHash: 'foo-lastHash', 
  hash: 'foo-hash', 
  data: 'foo-data' 
});

console.log('block1', block1)