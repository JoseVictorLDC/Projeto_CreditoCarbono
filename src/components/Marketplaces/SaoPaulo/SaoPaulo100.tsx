import NFTtitulo from "../../NFT/NFTtitulo.jsx";
import Marketplace2 from '../../../MarketplacesDescricao/MarketplaceCreditoCarbono.json';
import axios from "axios";
import { useState } from "react";
import React from 'react';
import { uploadJSONToIPFS } from "../../../pinatas/SaoPaulo100.js";
import { GetIpfsUrlFromPinata } from "../../../utils/utils.js";
import { ethers } from "ethers";
import "../Marketplaces.css"
import AuthProvider from "../../AuthProvider/AuthProvider.js";

type Props = { estado: string, creditos: string }
function SaoPaulo100(props: Props) {

    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [message, updateMessage] = useState('');
    const [formParams, updateFormParams] = useState({ price: '0.05' });

    const [cidade1, setCidade1] = useState("");
    const [cidade2, setCidade2] = useState("");
    const [cidade3, setCidade3] = useState("");
    const Estado = props.estado
    const Creditos = props.creditos

    const Name = Estado + ", Brasil";
    const Description = Creditos + " creditos de carbono, " + cidade1 + ", " + cidade2 + ", " + cidade3

    const FileURL = "https://gateway.pinata.cloud/ipfs/QmXwf55FgzFPHZuahmTbhjgx2NSnJwr3DH8avFSPwNpZJX"

    async function uploadDadosNFT1() {
        const { price } = formParams;
        const nftJSON =
        {
            name: Name,
            description: Description,
            price,
            image: FileURL,
            currentlyListed: true,
        }

        try {
            //upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(nftJSON);
            console.log(response)
            if (response.success === true) {
                console.log("Uploaded JSON to Pinata: ", response)
                return response.pinataURL;
            }
        }
        catch (e) {
            console.log("error uploading JSON metadata:", e)
        }
    }

    async function listNFT(e) {
        e.preventDefault();

        //Upload data to IPFS
        try {
            const metadataURL = await uploadDadosNFT1();
            if (metadataURL === -1)
                return;
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            updateMessage("Carregando NFT(em média 5 minutos).. por favor não clique em nada!")

            //Pull the deployed contract instance
            let contract = new ethers.Contract(Marketplace2.address, Marketplace2.abi, signer)

            //massage the params to be sent to the create NFT request
            const price = ethers.utils.parseUnits(formParams.price, 'ether')
            let listingPrice = await contract.getListPrice()
            listingPrice = listingPrice.toString()

            //actually create the NFT
            let transaction = await contract.createToken(metadataURL, price, true, 1, { value: listingPrice })
            await transaction.wait()

            alert("NFT listada na loja com sucesso!");
            updateMessage("");

            window.location.replace("/Estado")
        }
        catch (e) {
            alert("Upload error" + e)
        }
    }

    async function getAllNFTs() {
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(Marketplace2.address, Marketplace2.abi, signer)
        //create an NFT Token
        let transaction = await contract.getAllNFTs(1)

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
                            <h5>{Estado} - {Creditos} créditos</h5>
                        </div>
                        <div className="Loja">
                            {data.map((value, index) => {
                                return <NFTtitulo data={value} key={index}></NFTtitulo>;
                            })}
                        </div>
                        <div className="centerGeral">
                            {data.length == 0 ?
                                <div className="centerNFTColuna">
                                    <h5>Sem nenhuma NFT ainda...</h5>
                                    <button className="button" onClick={listNFT} id="list-button">Pedir NFT</button>
                                    <div>{message}</div>
                                    <br></br>
                                </div>
                                : ""}
                        </div>
                    </div>
                </div>
            </AuthProvider>
        </>
    );

}

export default SaoPaulo100;