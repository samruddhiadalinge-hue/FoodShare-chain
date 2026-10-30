// Public deployed address from previous project. Contract existence/bytecode MUST be checked at runtime.
export const CONTRACT_ADDRESS='0xb541B9bF3D1BE06f8f1140a6103826cCaf6E6dc7';
export const CHAIN_ID=11155111n;
// Human-readable ABI reconstructed from previously documented signatures. Verify against original Solidity before production.
export const ABI=[
 'function createDonation(string foodName,uint256 quantity,string location,uint256 deadline)',
 'function claimDonation(uint256 id)',
 'function markCollected(uint256 id)',
 'function donationCount() view returns (uint256)',
 'function getDonation(uint256 id) view returns (tuple(uint256 id,address donor,string foodName,uint256 quantity,string location,uint256 deadline,address claimer,uint8 status,uint256 createdAt))',
 'event DonationCreated(uint256 indexed id,address indexed donor,string foodName,uint256 quantity)',
 'event DonationClaimed(uint256 indexed id,address indexed claimer)',
 'event DonationCollected(uint256 indexed id)'
];
export const EXPLORER='https://sepolia.etherscan.io/tx/';
