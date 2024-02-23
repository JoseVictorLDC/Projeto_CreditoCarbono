const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const SaoPaulo1 = await hre.ethers.getContractFactory("SaoPaulo1");
  const SaoPaulo100 = await hre.ethers.getContractFactory("SaoPaulo100");
  const saoPaulo1 = await SaoPaulo1.deploy();
  const saoPaulo100 = await SaoPaulo100.deploy();

  await saoPaulo1.deployed();

  const data = {
    address: saoPaulo1.address,
    abi: JSON.parse(saoPaulo1.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/MarketplacesDescricao100/SaoPaulo1.json', JSON.stringify(data))

  await saoPaulo100.deployed();

  const data2 = {
    address: saoPaulo100.address,
    abi: JSON.parse(saoPaulo100.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace2.json
  fs.writeFileSync('./src/MarketplacesDescricao/SaoPaulo100.json', JSON.stringify(data2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
