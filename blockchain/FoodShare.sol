// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
/** ALTERNATIVE REDEPLOYMENT CONTRACT. NOT the verified source of the previously deployed address.
 * If you deploy this version, replace CONTRACT_ADDRESS in frontend/js/contract.js with the NEW Sepolia address.
 * Its functions match the frontend's documented interface; permissions must be understood before demo.
 */
contract FoodShare {
 enum Status {Available,Claimed,Collected}
 struct Donation {uint256 id;address donor;string foodName;uint256 quantity;string location;uint256 deadline;address claimer;Status status;uint256 createdAt;}
 uint256 public donationCount;
 mapping(uint256=>Donation) private donations;
 event DonationCreated(uint256 indexed id,address indexed donor,string foodName,uint256 quantity);
 event DonationClaimed(uint256 indexed id,address indexed claimer);
 event DonationCollected(uint256 indexed id);
 function createDonation(string calldata foodName,uint256 quantity,string calldata location,uint256 deadline) external {
  require(bytes(foodName).length>0&&bytes(location).length>0&&quantity>0&&deadline>block.timestamp,'Invalid donation');
  uint256 id=++donationCount;donations[id]=Donation(id,msg.sender,foodName,quantity,location,deadline,address(0),Status.Available,block.timestamp);
  emit DonationCreated(id,msg.sender,foodName,quantity);
 }
 function claimDonation(uint256 id) external {
  Donation storage d=donations[id];require(d.donor!=address(0),'Unknown donation');require(d.status==Status.Available,'Unavailable');require(d.deadline>block.timestamp,'Expired');require(d.donor!=msg.sender,'Cannot claim own donation');d.claimer=msg.sender;d.status=Status.Claimed;emit DonationClaimed(id,msg.sender);
 }
 function markCollected(uint256 id) external {
  Donation storage d=donations[id];require(d.status==Status.Claimed,'Not claimed');require(msg.sender==d.donor||msg.sender==d.claimer,'Not authorized');d.status=Status.Collected;emit DonationCollected(id);
 }
 function getDonation(uint256 id) external view returns(Donation memory){require(id>0&&id<=donationCount,'Unknown donation');return donations[id];}
}
