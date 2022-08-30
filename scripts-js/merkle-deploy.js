const hre = require("hardhat");
const ethers = hre.ethers;
const data = require('./root.json');
const root = data.Merkle_root[0];

async function main() {
    const amount = ethers.utils.parseUnits("100000" , "ether")

    const MerkToken = await ethers.getContractFactory("MerkleCoin");
    const merk = await MerkToken.deploy();
    await merk.deployed();

    const Distributor = await ethers.getContractFactory("MerkleDistributor");
    const dist = await Distributor.deploy(merk.address, root);
    await dist.deployed();

    console.log("Merkle Coin deployed to:", merk.address);
    console.log("Merkle Distributor deployed to:", dist.address);

    await merk.transfer(dist.address, amount);
    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
