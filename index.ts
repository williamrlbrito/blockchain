import { Blockchain } from "./Blockchain";

const blockchain = new Blockchain();

for (let i = 0; i < 10; i++) {
  const previousBlock = blockchain.getLastBlock();
  const previousProof = previousBlock.proof;
  const proof = blockchain.proofOfWork(previousProof);
  const previousHash = blockchain.hashBlock(previousBlock);
  blockchain.createBlock({ proof, previousHash });
}

const valid = blockchain.isChainValid(blockchain.chain);
console.log(blockchain.chain);
console.log(valid);
