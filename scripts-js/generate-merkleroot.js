const data = require('./accounts.json');
const { ethers } = require("ethers");
const fs = require("fs");

const leaves = [];

//hashing each address with the amount they are bound to recieve
for (var i = 0; i < data.amount.length; i++) {
    leaves.push(ethers.utils.solidityKeccak256([ "address", "uint256" ],[data.address[i],data.amount[i]]));
}

//function to generate merkle root
const generate_root = (input) => {
    var output = [];
    var n = input.length;
    if (n == 1) {
        return input[0];
    }
    if (Math.log2(n) % 1 != 0) {
        throw new Error('inputArray should be of length power 2.');
    }

    for (var i = 0; i < n; i = i + 2) {
        output.push(ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [input[i], input[i+1]]));
    }

    return generate_root(output);
}

const root = generate_root(leaves);

var root_object = {
    Merkle_root: []
};
root_object.Merkle_root.push(root);

//storing merkle root in json file
fs.writeFile("./root.json", JSON.stringify(root_object), (err) => {
    if(err) { console.error(err); return; };
});



// //
// console.log(JSON.stringify(parseBalanceMap(json)))
// const myJson = JSON.stringify(parseBalanceMap(json));

// fs.writeFile('scripts/myaddress.json', myJson, 'utf8', function(err) {
//   if (err) throw err;
//   console.log('complete');
//   }); 