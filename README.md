# Coffee Dispenser Smart Contract

## Overview

The Coffee Dispenser Smart Contract is a simple Ethereum smart contract written in Solidity. It allows users to manage a virtual coffee dispenser, filling it with coffee and dispensing coffee based on the available balance.

## Features

- **Fill Dispenser:** Only the contract owner can fill the dispenser with a specified number of cups.
- **Dispense Coffee:** Users can dispense a specified amount of coffee, provided there is enough balance in the dispenser.
- **Balance Inquiry:** Users can check the current balance of coffee in the dispenser.

## Contract Details

- **Owner:** The contract owner, who has the authority to fill the dispenser.
- **Total Coffee:** The current balance of coffee in the dispenser.

## Usage

1. Deploy the contract, specifying the initial coffee balance.
2. Use the contract owner's address to fill the dispenser with a certain number of cups.
3. Users can dispense coffee by calling `DispenseCoffee` function, ensuring they do not request more coffee than available.
4. Check the current coffee balance using `getBalance` or `getContractBalance`.

## Functions

- `constructor(uint256 initBal) payable`: Initializes the contract with the specified initial coffee balance.
- `getBalance() public view returns (uint256)`: Returns the current balance of coffee in the dispenser.
- `FillDispenser(uint256 cups, address addr) public payable`: Allows the owner to fill the dispenser with a specified number of cups.
- `DispenseCoffee(uint256 amt) public`: Allows users to dispense a specified amount of coffee.
- `getContractAddress() public view returns (address)`: Returns the address of the contract.
- `getContractBalance() public view returns (uint256)`: Returns the current balance of coffee in the dispenser.

## Deployment

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CoffeeDispenser {
    // ... (contract code)
}


## Project Setup Instructions

To run this project on your computer after cloning the GitHub repository, follow the steps below:

1. **Install Dependencies:**
   - Navigate to the project directory in the terminal.
   - Run the following command to install project dependencies:
     ```bash
     npm install
     ```

2. **Start Ethereum Node:**
   - Open two additional terminals in your Visual Studio Code or preferred code editor.

   - In the second terminal, start the local Ethereum node using Hardhat:
     ```bash
     npx hardhat node
     ```

3. **Deploy Smart Contract:**
   - In the third terminal, deploy the smart contract to the local Ethereum network:
     ```bash
     npx hardhat run --network localhost scripts/deploy.js
     ```

4. **Launch Front-end:**
   - Go back to the first terminal and start the front-end application:
     ```bash
     npm run dev
     ```

5. **Access the Project:**
   - The project will be accessible on your local machine, typically at [http://localhost:3000/](http://localhost:3000/).

Now, the project is successfully running on your localhost. Ensure to follow these steps in sequence for a smooth setup process.


