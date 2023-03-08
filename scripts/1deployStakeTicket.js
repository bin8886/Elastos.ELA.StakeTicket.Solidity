
const { ethers, getChainId} = require('hardhat')
const { utils} = require('ethers')
const { writeConfig,deployStakeTicket,readConfig, attachNFTContract} = require('./utils/helper')

const main = async () => {


    let chainID = await getChainId();
    //let chainID = 0;
    let accounts = await ethers.getSigners()
    let deployer = accounts[0];
    console.log("chainID is :" + chainID + " address :" + deployer.address);

    let erc721Address = await readConfig("0","ERC721_ADDRESS");

    let stakeTicketContract = await deployStakeTicket(erc721Address,"v0.0.1",deployer);
    await writeConfig("0","1","STAKE_TICKET_ADDRESS",stakeTicketContract.address);
    console.log("stake ticket address : ",stakeTicketContract.address);

    let nftContract = await attachNFTContract(deployer, erc721Address)

    let tx = await nftContract.setMinterRole(stakeTicketContract.address);
    console.log("setMinerRole tx.hash", tx.hash)
   
}



main();
