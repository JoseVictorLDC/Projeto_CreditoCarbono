import NFTtitulo from "../NFT/NFTtitulo";
import MarketplaceJSON from "../../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import React from 'react';
import { GetIpfsUrlFromPinata } from "../../utils/utils";
import { ethers } from "ethers";
import "./Comprador.css"
import AuthProvider from "../AuthProvider/AuthProvider";
import { useAddress } from '@thirdweb-dev/react';

export default function Comprador() {

    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);

    async function getAllNFTs() {
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
        //create an NFT Token
        let transaction = await contract.getAllNFTs()

        //Fetch all the details of every NFT from the contract and display
        const items = await Promise.all(transaction.map(async i => {
            var tokenURI = await contract.tokenURI(i.tokenId);
            console.log("getting this tokenUri", tokenURI);
            tokenURI = GetIpfsUrlFromPinata(tokenURI);
            let meta = await axios.get(tokenURI);
            meta = meta.data;
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.image,
                name: meta.name,
                description: meta.description,
            }
            return item;
        }))

        updateFetched(true);
        updateData(items);
    }

    if (!dataFetched)
        getAllNFTs();

    return (
        <>
            <AuthProvider>
                <div>
                    <div className="TudoLoja">
                        <div className="centerNFT">
                            <h1>NFT marketplace</h1>
                        </div>
                        <div className="Loja">
                            {data.map((value, index) => {
                                return <NFTtitulo data={value} key={index}></NFTtitulo>;
                            })}
                        </div>
                    </div>
                </div>
            </AuthProvider>
        </>
    );

}