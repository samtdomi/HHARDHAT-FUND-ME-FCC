
/* 
    the bottom line of code does the same thing as:
    const helperConfig = require("../helper-hardhat-config")
    const networkConfig = helperConfig.networkConfig
*/
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")


module.exports = async ({ getNamedAccounts, deployments }) => {
    // ^^^^ const { getNamedAccounts, deployments } = hre  ^^^ the paramater of the function is equal to this line
    const { deploy, log } = deployments 
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    
    // if chainId is X use address Y , etc.
    // if chainid is Z use address A , etc.
    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress 
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // if the contract doesnt exist, we deploy a minimal version 
    // of it for our local testing 

    
    // what happens if you want to change chains?
    // when going for localhost or hardhat network we want to use a mock 
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1, 
    })

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API) {
        await verify(fundMe.address, args)
    } 
    log("-----------------------------------------")
    
}  

module.exports.tags = ["all", "fundme"]

