let { networkConfig} = require('../helper-hardhat-config')

module.exports = async ({
  getNamedAccounts,
  deployments
}) => {
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()
  let linkTokenAddress
  let oracle
  let additionalMessage = ""
  let btcUsdPriceFeedAddress
    if (chainId == 31337) {
        const BTCUsdAggregator = await deployments.get('BtcUsdAggregator')
        btcUsdPriceFeedAddress = EthUsdAggregator.address
    } else {
        btcUsdPriceFeedAddress = networkConfig[chainId]['btcUsdPriceFeed']
    }
  //set log level to ignore non errors
  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR)

  if (chainId == 31337) {
    linkToken = await get('LinkToken')
    MockOracle = await get('MockOracle')
    linkTokenAddress = linkToken.address
    oracle = MockOracle.address
    additionalMessage = " --linkaddress " + linkTokenAddress
  } else {
    linkTokenAddress = networkConfig[chainId]['linkToken']
    oracle = networkConfig[chainId]['oracle']
  }
  const jobId = networkConfig[chainId]['jobId']
  const fee = networkConfig[chainId]['fee']
  const networkName = networkConfig[chainId]['name']

  const apiConsumer = await deploy('PriceExercise', {
    from: deployer,
    args: [oracle, jobId, fee, linkTokenAddress, btcUsdPriceFeedAddress],
    log: true
  })
}
module.exports.tags = ['all', 'price', 'main']
