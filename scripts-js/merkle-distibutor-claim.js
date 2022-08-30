const hre = require("hardhat");
const data = require("./accounts.json");
const merkleroot = require("./root.json");
const ethers = hre.ethers;
const { wrap_get, verify } = require('./merkle-proof-scripts.js');

async function main() {
    [a1, a2, a3, a4] = await ethers.getSigners();
    const MerkToken = await ethers.getContractFactory("MerkleCoin");
    const merkAddress = "0x2d334Fc26Aa1846BebCeEC439002d445497b1054";
    const merk = new ethers.Contract(merkAddress, MerkToken.interface, a1);

    const Distributor = await ethers.getContractFactory("MerkleDistributor");
    const distAddress = "0xF84855e06a48692103CeDCe3ef9757fd4561e8aa";
    const dist = new ethers.Contract(distAddress, Distributor.interface, a1);

    const proof = wrap_get(3);
    console.log(proof);

    const balance = await merk.balanceOf(data.address[2]);
    console.log("Initial Balance: ", balance.toString());

    const tx = await dist.claim(3, data.address[2], data.amount[2], proof, {
        gasPrice: ethers.utils.parseUnits("10", "gwei"),
        gasLimit: 1000000
    });

    console.log(tx.transactionHash);

    const balance1 = await merk.balanceOf(data.address[2]);
    console.log("Final Balance: ", balance1.toString());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });