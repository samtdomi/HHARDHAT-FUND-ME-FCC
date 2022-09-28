const networkConfig = {
    // chain id of the blockchain, rinkeby chainId is 4
    4: {
        name: "rinkeby",
        // eth/usd price feed contract address on rinkeby network
        ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e" , 
    },
    // chain id of polygon network is 137
    137: {
        name: "polygon",
        // contract address for eth/usd price feed specifically on the polygon network 
        ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    },
    // 31337
}

const developmentChains = ["hardhat", "localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 200000000000
 
// exports the networkConfig from this file so that our scripts can work with it 
module.exports = {
    networkConfig, 
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
}