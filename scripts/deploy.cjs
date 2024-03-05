const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const MarketplaceCreditoCarbono = await hre.ethers.getContractFactory("MarketplaceCreditoCarbono");
  const marketplaceCreditoCarbono = await MarketplaceCreditoCarbono.deploy();

  await marketplaceCreditoCarbono.deployed();

  const data = {
    address: marketplaceCreditoCarbono.address,
    abi: JSON.parse(marketplaceCreditoCarbono.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace2.json
  fs.writeFileSync('./src/MarketplacesDescricao/MarketplaceCreditoCarbono.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
