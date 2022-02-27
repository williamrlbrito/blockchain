import sha256 from "sha256";

interface IBlock {
  index: number;
  proof: number;
  timestamp: number;
  previousHash: string;
  hash: string;
}

interface ICreateBlock {
  proof: number;
  previousHash: string;
}

class Blockchain {
  public chain: IBlock[];

  constructor() {
    this.chain = [];
    this.createBlock({ proof: 1, previousHash: "0" });
  }

  createBlock({ proof, previousHash }: ICreateBlock): IBlock {
    const block: IBlock = {
      index: this.chain.length + 1,
      proof,
      timestamp: Date.now(),
      previousHash,
      hash: "",
    };
    block.hash = this.hashBlock({ ...block });
    this.chain.push(block);
    return block;
  }

  getLastBlock(): IBlock {
    return this.chain[this.chain.length - 1];
  }

  proofOfWork(previousProof: number): number {
    let proof = 1;
    let checkProof = false;

    while (!checkProof) {
      const hashOperation = sha256(
        (proof ** 2 - previousProof ** 2).toString()
      );

      if (hashOperation.substring(0, 4) === "0000") {
        checkProof = true;
      } else {
        proof++;
      }
    }

    return proof;
  }

  hashBlock(block: IBlock): string {
    const { index, proof, timestamp, previousHash } = block;
    const blockString = JSON.stringify({
      index,
      proof,
      timestamp,
      previousHash,
    });
    return sha256(blockString);
  }

  isChainValid(chain: IBlock[]): boolean {
    let previousBlock = chain[0];
    let currentIndex = 1;

    while (currentIndex < chain.length) {
      const block = chain[currentIndex];
      const { proof, previousHash } = block;

      const hashOperation = sha256(
        (proof ** 2 - previousBlock.proof ** 2).toString()
      );

      if (hashOperation.substring(0, 4) !== "0000") {
        return false;
      }

      if (previousHash !== previousBlock.hash) {
        return false;
      }

      previousBlock = block;
      currentIndex++;
    }

    return true;
  }
}

export { Blockchain };
