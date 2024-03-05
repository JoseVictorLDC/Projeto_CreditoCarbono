import { useLocation, useParams } from 'react-router-dom';
import MarketplaceCreditoCarbonoJSON from "../../MarketplacesDescricao/MarketplaceCreditoCarbono.json";
import axios from "axios";
import { useState } from "react";
import { ethers } from "ethers";
import React from 'react';
import NFTcards from '../NFT/NFTcards';
import "./Perfil.css"
import AuthProvider from '../AuthProvider/AuthProvider';

function Perfil() {
    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [address, updateAddress] = useState("0x");
    const [totalPrice, updateTotalPrice] = useState("0");

    async function getNFTData(tokenId) {
        let sumPrice = 0;
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceCreditoCarbonoJSON.address, MarketplaceCreditoCarbonoJSON.abi, signer)

        //create an NFT Token
        let transaction = await contract.getMyNFTs()

        /*
        * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
        * and creates an object of information that is to be displayed
        */

        const items = await Promise.all(transaction.map(async i => {
            const tokenURI = await contract.tokenURI(i.tokenId);
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
                Listed: i.currentlyListed,
            }
            sumPrice += Number(price);
            return item;
        }))
        updateData(items);
        updateFetched(true);
        updateAddress(addr);
        updateTotalPrice(sumPrice.toPrecision(3));
    }

    const params = useParams();
    const tokenId = params.tokenId;

    if (!dataFetched)
        getNFTData(tokenId);

    return (
        <AuthProvider>
            <div className="centerPerfil">
                <div className="dados">
                    <div className="centerGeral">
                        <div className="centerGeral">
                            <div className="centerGeral">
                                <h2 className="centerGeral">Endereço da carteira</h2>
                                {address}
                            </div>
                        </div>
                        <div className="centerGeral">
                            <div className="centerGeral">
                                <h2 className="centerGeral">Número de NFTs</h2>
                                {data.length}
                            </div>
                            <div className="centerGeral">
                                <h2 className="centerGeral">Valor total</h2>
                                {totalPrice} ETH
                            </div>
                        </div>
                        <div className="vendedorButton">
                            <a href="./Vendedor" className="button">Credie seu carbono</a>
                        </div>
                    </div>

                    <div className="centerSuasNFTs">
                        <h2 className="centerGeral">Suas NFTs</h2>
                        <div className='centerGeralColuna'>
                            {data.map((value, index) => {
                                return <NFTcards data={value} key={index}></NFTcards>;
                            })}
                        </div>
                        <div className="centerGeral">
                            {data.length == 0 ? "Sem nenhuma NFT ainda..." : ""}
                        </div>
                    </div>
                </div>
            </div>
        </AuthProvider>
    )
};

export default Perfil;