import { ethers } from 'ethers';
import abi from './np-abi.json';

const defaultAccount = "0x46A46dc5Fd270dD9ADfc45ee202e41accff7e5f3";
const transactionHash = "0x73d46ea9b76478980bd5a9a8da8d8311a3cd9daa9491484e42c5048bebc3ae4a";
const contractHash = "0x5bEccE9b020D1c0eb954975613de53fd9C47572B";

type NetPesoData = {
  issuer: string;
  decimals: number;
  name: string;
  symbol: string;
  totalSupply: string;
}

const blockExplorer = async () => {
  // ethereum mainnet
  const provider = new ethers.providers.InfuraProvider("ropsten");

  const block = await provider.getBlockNumber();
  console.log("Last block: ", block);

  const balance = await provider.getBalance(defaultAccount);
  console.log("Account balance: ", ethers.utils.formatEther(balance));

  const tx = await provider.getTransaction(transactionHash);
  console.log(`From: ${tx.from}, to: ${tx.to}, chainId: ${tx.chainId}, value: ${ethers.utils.formatEther(tx.value)}`);

  const netPesoContract = new ethers.Contract(contractHash, abi, provider);
  const netPeso: NetPesoData = {
    issuer: await netPesoContract.issuer(),
    decimals: await netPesoContract.decimals(),
    name: await netPesoContract.name(),
    symbol: await netPesoContract.symbol(),
    totalSupply: ethers.utils.formatEther(await netPesoContract.totalSupply()),
  }
  console.log("My NetPeso: ", netPeso);

};

blockExplorer();