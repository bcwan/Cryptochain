class Block {
  constructor(data, hash, lastHash) {
    this.data = data;
    this.hash = hash;
    this.lastHash = lastHash;
  }
}

const fooBlock = new Block('foo-data', 'foo-hash', 'foo-lastHash');
console.log(fooBlock);