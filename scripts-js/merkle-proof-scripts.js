const data = require("./accounts.json");
const merkleroot = require("./root.json");
const { ethers } = require("ethers");

root = merkleroot.Merkle_root;

const leaves = [];

//hashing each address with the amount they'll recieve
for (var i = 0; i < data.amount.length; i++) {
  leaves.push(ethers.utils.solidityKeccak256(["address", "uint256"], [data.address[i], data.amount[i]]));
}

//function to generate the merkle proof of a given address
const getproof = (index, input, proof) => {
  if (input.length === 1)
    return proof;

  if (index % 2) {
    proof.push(input[index - 1]);
  } else {
    proof.push(input[index + 1]);
  }

  const output = [];

  for (var i = 0; i < input.length; i = i + 2) {
    output.push(ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [input[i], input[i + 1]]));
  }

  return getproof(Math.floor(index / 2), output, proof);

}

const wrap_get = (_index) => {
  _index = _index - 1;
  var proof = getproof(_index, leaves, []);
  return proof;
}

//function to verify  the merkle proof
var node;
const verify = (root, proof, index) => {
  index = index - 1;
  node = leaves[index];
  for (var i = 0; i < proof.length; i++) {

    if (index % 2) {
      node = ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [proof[i], node]);
    } else {
      node = ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [node, proof[i]]);
    }
    index = Math.floor(index / 2);

  }

  if (root == node) console.log("You are valid to recieve some tokens");
}

//verify(root,wrap_get(1),1);
module.exports = {
  wrap_get,
  verify
};
