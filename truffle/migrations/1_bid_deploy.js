const Bid = artifacts.require("Bid");

module.exports = async function(deployer, network, accounts) {
    console.log("Deploying contract...");
    await deployer.deploy(Bid);
    const BidAddress = await Bid.deployed();

    console.log(`Bid address deployed at ${BidAddress.address}`);
}