# Presidential Election Solidity Smart Contracts

This repository contains the Solidity smart contracts for the Presidential Election Learning DApp. The smart contracts are built with Solidity and tested with Hardhat and Chai.

## Contracts

### Vote.sol

This contract manages the voting process for the presidential election. It handles candidate registration, voter registration, and vote casting.

### Dependencies

- **Solidity**: Solidity is a smart contract programming language used for writing Ethereum smart contracts.
- **Hardhat**: Hardhat is a development environment and task runner for Ethereum that makes smart contract development easier.
- **Hardhat Network**: Hardhat Network is a local Ethereum network that is automatically created and managed by Hardhat.
- **Chai**: Chai is a BDD / TDD assertion library for Node.js and the browser.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/taufanfadhilah/solidity-presidential-election.git
   ```

2. **Install dependencies**:

   ```bash
   cd solidity-presidential-election
   npm install
   ```

3. **Compile contracts**:

   ```bash
   npx hardhat compile --force
   ```

4. **Run tests**:

   ```bash
   npx hardhat test
   ```

5. **Deploy contracts (optional)**:

   Deploy the contracts to a local or test Ethereum network.

   ```bash
   npx hardhat node
   npx hardhat ignition deploy ./ignition/modules/Vote.ts --network localhost
   ```

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).