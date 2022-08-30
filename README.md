# @uniswap/merkle-distributor

[![Tests](https://github.com/Uniswap/merkle-distributor/workflows/Tests/badge.svg)](https://github.com/Uniswap/merkle-distributor/actions?query=workflow%3ATests)
[![Lint](https://github.com/Uniswap/merkle-distributor/workflows/Lint/badge.svg)](https://github.com/Uniswap/merkle-distributor/actions?query=workflow%3ALint)

# Local Development

The following assumes the use of `node@>=10`.

## Install Dependencies

```
npm i or yarn
```

## Compile Contracts

`yarn compile`

## Run Tests

`yarn test`

# To create Markle tree in json file

Added some code to save the generated json file in scripts/merkleroot.json
In addresses.json enter the address that you wish to whitelist . 

then run

```ts-node scripts/generate-merkle-root.ts --input scripts/addresses.json```

After successful Execution the formatted output as mentioned in the (/src/parse-balance-map.ts) will be saved in scripts/merkleroot.json

# To Run TypeScript file (If Not installed)

Run

1. 
```
npm install -g typescript
```
2. 
```
npm install -g ts-node
```
Findings:
Merkle tree also known as hash tree is a data structure used for data verification and synchronization. 
It is a tree data structure where each non-leaf node is a hash of it’s child nodes. All the leaf nodes are at the same depth and are as far left as possible. 
It maintains data integrity and uses hash functions for this purpose. 

The understadnings for the following scripts could be done as follows.


=> The Merkle root is the source of every distribution happens through that smart contract and the merkle root and it's proof is responsible for the validation of the entity for claiming the rewards. this logical part is responsible for constructing a tree like data structure and for the claim part.

<img width="1440" alt="Screenshot 2022-06-03 at 4 53 51 PM" src="https://user-images.githubusercontent.com/86094155/171844730-7f82a6e9-e3a2-4b2f-944e-9a9318391674.png">

=> This code is responsible for generating the hashing which is used for the verification purposes of the merkle proof in order to distribute the rewards. 

<img width="1440" alt="Screenshot 2022-06-03 at 5 00 39 PM" src="https://user-images.githubusercontent.com/86094155/171845616-be79d56b-cf5c-459d-aa9d-a54c1f4928ae.png">


=> This is responsible for the verification of the merkle proof which is generated as a hash and without this verfication of the entity the contract couldn't identify and will not release funds. 

<img width="1440" alt="Screenshot 2022-06-03 at 5 00 51 PM" src="https://user-images.githubusercontent.com/86094155/171845671-ec5eb711-8368-45da-a7b7-f51bb2e34a10.png">



=> This is the scripts which generates the merkle root for the accounts inputed in addresses.json for whitelisting.

<img width="1440" alt="Screenshot 2022-06-03 at 5 08 07 PM" src="https://user-images.githubusercontent.com/86094155/171846583-5dc40748-23fc-471c-88f7-a1d4f49330eb.png">


=> This is a sample of how the outputs of the merkle root and the proof and the amount and the index assigned for a particular account.

<img width="1440" alt="Screenshot 2022-06-03 at 5 08 18 PM" src="https://user-images.githubusercontent.com/86094155/171846654-0beaafd7-bca1-49e7-8888-24dd710ba7e6.png">




## The link of the video for detailed demonstration
https://drive.google.com/file/d/1JfsksOh653zNDmnUtAxFieZmNKvszZgM/view?usp=sharing
