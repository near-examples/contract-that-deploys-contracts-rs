# contract-that-deploys-contracts Smart Contract

This is a simple example that demonstrates how you can write a smart contract that deploys other contracts!

It works by creating a new account, which will be a subaccount to the one this contract is deployed on, then transferring some funds to pay for storage to that newly created sub account.

Then you can test out your newly deployed contract by making calls to it with the examples provided in the application!

The contract that is being deployed is from out [guest book example](https://github.com/near-examples/guest-book)

# Quick Start

After cloning the repo enter the file using

```bash
cd contract-that-deploys-contracts
```

Install the dependencies and build the contract

```=bash
yarn && build
```

Then run `yarn dev` to create a development account, deploy the compiled rust contract and start the application

```=bash
yarn dev
```

afterwards enter your desired sub account name which will be made as a sub account to the dev account and displayed on screen.

Hit this deploy contract button and test it out by making contract calls to your newly deployed contract account!
