# Auction DApp
This is a decentralized auction platform built using `Next.js` for the frontend, `wagmi` for interacting with Ethereum smart contracts, and `Truffle` for deploying and testing the Solidity contracts.

### Features
- Users can place bids on an auction until the timer expires.
- The highest bid wins, and the winner can claim the item once the auction is complete.
- Bids are placed using Ethereum and the highest bid must always exceed the current highest bid.
- Contracts ensure only real addresses (non-contracts) can participate in the bidding process.

### Technologies Used
- **Next.js**: Frontend framework for server-side rendering and client-side interaction.
- **wagmi**: React hooks library for interacting with Ethereum smart contracts.
- **Truffle**: Suite for smart contract development, deployment, and testing on Ethereum.
- **Solidity**: Ethereum's smart contract programming language.

### Smart Contract Overview
The smart contract is defined in Solidity and allows for an auction system where participants can place bids. The contract handles:

1. Accepting bids (if higher than the current highest bid).
2. Returning funds to the previous highest bidder if outbid.
3. Checking for the auction winner after the bidding period.
4. Owner-controlled winner fund transfer after auction completion.