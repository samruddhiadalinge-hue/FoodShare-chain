import {ethers} from 'https://cdn.jsdelivr.net/npm/ethers@6.13.4/+esm';
import {ABI,CONTRACT_ADDRESS,CHAIN_ID} from './contract.js';
let provider,signer,contract,address='';
export const walletAddress=()=>address;
export async function connect(){
 if(!window.ethereum)throw Error('MetaMask is not installed. Install it from metamask.io.');
 await window.ethereum.request({method:'eth_requestAccounts'});
 provider=new ethers.BrowserProvider(window.ethereum);let network=await provider.getNetwork();
 if(network.chainId!==CHAIN_ID){try{await window.ethereum.request({method:'wallet_switchEthereumChain',params:[{chainId:'0xaa36a7'}]});}catch(e){if(e.code===4902)await window.ethereum.request({method:'wallet_addEthereumChain',params:[{chainId:'0xaa36a7',chainName:'Sepolia',nativeCurrency:{name:'Sepolia ETH',symbol:'ETH',decimals:18},rpcUrls:['https://ethereum-sepolia-rpc.publicnode.com'],blockExplorerUrls:['https://sepolia.etherscan.io']}]});else throw Error('Switch MetaMask to Sepolia.');}provider=new ethers.BrowserProvider(window.ethereum);network=await provider.getNetwork();if(network.chainId!==CHAIN_ID)throw Error('Please switch to Sepolia.');}
 const code=await provider.getCode(CONTRACT_ADDRESS);if(code==='0x')throw Error('No contract bytecode found at the configured Sepolia address. See README for redeployment instructions.');
 signer=await provider.getSigner();address=(await signer.getAddress()).toLowerCase();contract=new ethers.Contract(CONTRACT_ADDRESS,ABI,signer);return address;
}
export async function getContract(){if(!contract)await connect();return contract;}
export async function getDonations(){const c=await getContract(),count=Number(await c.donationCount()),out=[];if(count>500)throw Error('Donation list exceeds demo limit (500).');
 // Existing source is missing: support 1-based IDs first, then 0-based if necessary.
 for(let i=0;i<=count;i++){try{const d=await c.getDonation(i);if(Number(d.id)!==i)continue;if(!d.donor||d.donor===ethers.ZeroAddress)continue;if(out.some(x=>x.id===i))continue;out.push({id:i,donor:d.donor.toLowerCase(),foodName:d.foodName,quantity:Number(d.quantity),location:d.location,deadline:Number(d.deadline),claimer:d.claimer.toLowerCase(),status:Number(d.status),createdAt:Number(d.createdAt)});}catch(e){/* Missing IDs can revert */}}
 return out.sort((a,b)=>b.id-a.id);
}
export async function transact(method,...args){const c=await getContract();const tx=await c[method](...args);const receipt=await tx.wait();if(receipt.status!==1)throw Error('Transaction reverted.');return tx.hash;}
if(window.ethereum){window.ethereum.on('accountsChanged',()=>location.reload());window.ethereum.on('chainChanged',()=>location.reload());}
