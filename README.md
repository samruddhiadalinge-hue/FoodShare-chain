# 🌱 FoodShare Chain

A polished third-year Computer Engineering academic project: separate HTML/CSS/JavaScript pages, Node.js/Express, MongoDB user accounts and real MetaMask transactions on Ethereum Sepolia.

## Important blockchain verification notice

The previous contract address was supplied from an earlier project: `0xb541B9bF3D1BE06f8f1140a6103826cCaf6E6dc7`. Its verified source/ABI could **not be independently retrieved during package creation**. The `frontend/js/contract.js` ABI was reconstructed from previously documented function signatures, and the application checks for deployed bytecode at wallet connection. Bytecode existence alone **does not verify ABI compatibility or permissions**. Test `donationCount`, `getDonation`, `createDonation`, `claimDonation` and `markCollected` against the actual deployed source before the faculty demo. Events are included as illustrative signatures and not relied upon by the UI. The `blockchain/FoodShare.sol` file is a NEW, compatible alternative source, NOT a claim that it is the original deployed source. If the old address fails, deploy the provided contract to Sepolia in Remix using MetaMask and update `CONTRACT_ADDRESS` in `frontend/js/contract.js`. Never send anyone your wallet recovery phrase or private key.

## Setup on Windows 11

1. Install Node.js 20+ and MongoDB Community Server (or use your own MongoDB Atlas connection string). Start MongoDB.
2. Open the project in VS Code, open a terminal, and run:

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

3. Edit `backend/.env`: replace `SESSION_SECRET` with a unique random secret of at least 32 characters, and set `MONGO_URI` (local default already provided). Do not commit `.env`.
4. Run:

```powershell
npm start
```

5. Open **http://localhost:8080**. Do NOT open HTML via `file://` or run a separate Live Server: the Express server serves both the frontend and `/api` endpoints.
6. Install MetaMask, switch to Ethereum Sepolia, and get test ETH from a legitimate Sepolia faucet. No real funds are required. The browser needs internet access to import Ethers.js from jsDelivr and reach Sepolia.

## Demo workflow

- Register as Donor, log in, connect donor MetaMask on Sepolia, visit Donate Food, create donation, approve transaction, wait for confirmation.
- Logout and register another email as NGO. Switch MetaMask to a **different** wallet, connect, explore food and claim the available donation. The contract enforces actual permissions; the website role is an application-level UI restriction, not on-chain role enforcement.
- Open Tracking, enter donation ID, and mark collected with an authorized donor or claimer wallet. Inspect the transaction hash on Sepolia Etherscan.
- `My Donations` and `My Claims` filter by **currently connected wallet**, not merely by logged-in email. Wallet association is session-only and is not claimed as cryptographically bound to the MongoDB user.

## Architecture and notes

- Frontend: 11 distinct HTML entry pages with one shared stylesheet and shared JavaScript rendering logic; no React/Angular.
- Backend: Express session authentication stored in MongoDB, bcrypt password hashing, input validation, login rate limit, user profiles.
- Blockchain: Ethers.js v6.13.4; MetaMask signs all state-changing transactions. The chain, not MongoDB, is authoritative for donation state.
- Donation IDs are probed for both 0- and 1-based indexing due to missing original source. The supplied alternative contract is 1-based. `getDonations` limits the academic demo to 500 records for responsiveness; use event indexing/pagination for a production system.
- `markCollected` button is shown for claimed records, but the contract itself determines which wallet may execute it. A donor/NGO role selected at registration is not enforced on chain.
- Do not treat this as a production-audited contract or security-hardened deployment. Run end-to-end testing with two test wallets before presenting.

## Project pages

Home, Register, Login, Dashboard, Donate Food, Explore Food, My Donations, My Claims, Tracking, Profile, About.

## Troubleshooting

- MongoDB connection refused: start local MongoDB service or correct `MONGO_URI`.
- Missing `.env`: create it from `.env.example`, add a long `SESSION_SECRET`.
- No contract bytecode: verify Sepolia address, or deploy `blockchain/FoodShare.sol` and update `contract.js`.
- Contract call decode/revert: the original deployed contract's ABI or access rules may differ; use verified source or deploy the supplied alternative.
- Wrong wallet/network: switch MetaMask to Sepolia and use the appropriate donor/NGO wallet.
- Ethers.js import fails: check internet connectivity and jsDelivr access.
