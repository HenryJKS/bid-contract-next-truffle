// SPDX-License-Identifier: MIT
pragma solidity > 0.8.20;

abstract contract BidRules {
    function bid() external payable virtual {}

    function checkWinner() external view virtual returns (address) {}

    function transferWinner() external virtual {}
}

error BidTimeError();

contract Bid is BidRules {
    address public owner;
    uint256 public maxTime;

    struct BestBid {
        address bidAddr;
        uint256 value;
    }

    BestBid public bb;

    constructor() {
        owner = msg.sender;
        maxTime = block.timestamp + 1 minutes;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner permissions!");

        _;
    }

    modifier bidFinish() {
        require(block.timestamp > maxTime, BidTimeError());
        
        _;
    }

    function bid() public payable override {
        require(msg.value > 0, "more than 0");
        require(block.timestamp <= maxTime, "the bid is finish");
        require(!isContract(msg.sender), "only address account");
        require(bb.bidAddr != msg.sender, "You are already the highest bidder");

        if (msg.value > bb.value) {
            payable(bb.bidAddr).transfer(bb.value);
        } else {
            revert("Bid amount must be higher than current highest bid");
        }

        bb.value = msg.value;
        bb.bidAddr = msg.sender;
    }

    function isContract(address account) public view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    function checkWinner() public view override bidFinish returns(address) {
        return bb.bidAddr;
    }

    function transferWinner() external override onlyOwner bidFinish{
        bb.bidAddr = address(0);
        bb.value = 0;
        maxTime = block.timestamp + 50 seconds;
        payable(bb.bidAddr).transfer(address(this).balance);
    }

}
