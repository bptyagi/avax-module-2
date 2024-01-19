// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract CoffeeDispenser {
    
    address payable public owner;
    uint256 public totalCoffee;

    constructor(uint256 initBal) payable {
        owner = payable(msg.sender);
        totalCoffee = initBal;
    }

    function getBalance() public view returns (uint256) {
        return totalCoffee;
    }

    function FillDispenser(uint256 cups, address addr) public payable {
        require(addr == owner, "only owner can fill the coffee dispenser");
        uint256 prevBal = totalCoffee;

        totalCoffee += cups;

        assert(totalCoffee == prevBal + cups);

    }

    function DispenseCoffee(uint256 amt) public {
        uint256 prevBal = totalCoffee;
        if (totalCoffee < amt) 
            revert("not enough coffee in the dispenser");
        

        totalCoffee -= amt;
        assert(totalCoffee == (prevBal - amt));
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }

    function getContractBalance() public view returns (uint256) {
        return totalCoffee;
    }

}
