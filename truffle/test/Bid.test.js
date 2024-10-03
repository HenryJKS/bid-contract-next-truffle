const Bid = artifacts.require("Bid");

const { time } = require("@openzeppelin/test-helpers");

contract("Bid", accounts => {
    let instance;
    [owner, bidder1, bidder2] = accounts;

    beforeEach(async () => {
        instance = await Bid.new();
    })

    it("verify the owner", async () => {
        const ownerAddr = await instance.owner();

        assert.equal(ownerAddr, owner, "Should be equal");
    });

    it("send funds", async () => {
        await instance.bid({from: bidder1, value: web3.utils.toWei("1", "ether")});
        
        const bestBid = await instance.bb();

        assert.equal(bestBid[1], web3.utils.toWei("1", "ether"));
    });

    it("should properly handle bids and reflect the highest bid", async () => {
        await instance.bid({ from: bidder1, value: web3.utils.toWei("1", "ether") });

        await instance.bid({ from: bidder2, value: web3.utils.toWei("2", "ether") });

        const bestBid = await instance.bb();

        const bestBidAddr = bestBid[0]; // address of highest bidder
        const bestBidValue = bestBid[1]; // value of the highest bid

        const bestBidValueInEther = web3.utils.fromWei(bestBidValue.toString(), "ether");

        assert.equal(bestBidAddr, bidder2, "O endereço da melhor oferta deve ser bidder2");
        assert.equal(bestBidValueInEther, "2", "O valor da melhor oferta deve ser 2 ether");
    });

    it("should check the winner after bidding period", async () => {
        // make a bid
        await instance.bid({ from: bidder1, value: web3.utils.toWei("1", "ether") });
        await instance.bid({ from: bidder2, value: web3.utils.toWei("2", "ether") });
        
        // waiting 6 minutes
        await time.increase(time.duration.minutes(6));

        // check the winner
        const winner = await instance.checkWinner();
        
        assert.equal(winner, bidder2, "O vencedor deve ser bidder2");
    });


})