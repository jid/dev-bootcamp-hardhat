task("give-right-to-vote", "Gives right to vote to given address")
    .addParam("contract", "The address of the Ballot contract")
    .addParam("address", "The address of the voter")
    .setAction(async taskArgs => {

        const contractAddr = taskArgs.contract;
        const networkId = network.name;
        const voter = taskArgs.address;

        const BallotContract = await ethers.getContractFactory("Ballot");

        //Get signer information
        const accounts = await ethers.getSigners();
        const signer = accounts[0];
        const ballotConsumer = await new ethers.Contract(contractAddr, BallotContract.interface, signer);

        console.log("Getting right to vote for ", voter, " on network ", networkId);

        await ballotConsumer.giveRightToVote(voter);

        console.log(`Voting rights given to: ${voter}`);

    });

module.exports = {};
