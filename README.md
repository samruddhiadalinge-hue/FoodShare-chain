# 🌱 FoodShare Chain

### Blockchain-Powered Food Donation and Tracking System

FoodShare Chain is a full-stack academic project developed to connect food donors with NGOs and reduce food waste through transparent donation tracking.

The application combines a Node.js and MongoDB backend with Ethereum blockchain integration. Users can register, donate surplus food, claim available donations, and track their status through MetaMask transactions on the Ethereum Sepolia test network.

## ✨ Key Features

- Separate, responsive interfaces for different application functions.
- Donor and NGO account registration and login.
- Secure password hashing and session-based authentication.
- MetaMask wallet integration.
- Blockchain-based food donation registration.
- Explore available food donations.
- Claim donations using a separate NGO wallet.
- Track donations through three stages: Available, Claimed and Collected.
- View personal donations and claims.
- Dashboard with live blockchain statistics.
- User profile management.
- Transaction verification through Sepolia Etherscan.

## 🛠️ Technologies Used

| Component | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Blockchain | Ethereum Sepolia |
| Smart Contract | Solidity |
| Blockchain Library | Ethers.js v6.13.4 |
| Wallet | MetaMask |
| Development Tools | VS Code, Git, GitHub |

## 📁 Project Structure

```text
FoodShare-Chain/
│
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── blockchain/
│   └── FoodShare.sol
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── api.js
│   │   ├── app.js
│   │   ├── contract.js
│   │   └── wallet.js
│   ├── index.html
│   ├── register.html
│   ├── login.html
│   ├── dashboard.html
│   ├── donate.html
│   ├── available-food.html
│   ├── my-donations.html
│   ├── my-claims.html
│   ├── tracking.html
│   ├── profile.html
│   └── about.html
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Install the following:

- Node.js 20 or later
- MongoDB Community Server
- Visual Studio Code
- MetaMask browser extension
- Git

An internet connection is required for Sepolia blockchain access and the Ethers.js CDN.

### Step 1: Clone the repository

```bash
git clone https://github.com/samruddhiadalinge-hue/FoodShare-chain.git
```

Navigate to the project:

```bash
cd FoodShare-chain
```

### Step 2: Install backend dependencies

```bash
cd backend
npm install
```

### Step 3: Configure environment variables

Create a `.env` file inside the `backend` folder by copying `.env.example`.

For Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Configure the environment variables:

```env
PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/food