import { GetIpfsUrlFromPinata } from "../../utils/utils";
import React from 'react';
import "./NFTcards.css"
import MarketplaceCreditoCarbono from '../../databases/MarketplaceCreditoCarbono.json';
import { ethers } from "ethers";

function NFTcards(data) {
    const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);

    async function resellNFT() {
        const tokenId = data.data.tokenId;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceCreditoCarbono.address, MarketplaceCreditoCarbono.abi, signer);
        let listingPrice = await contract.getListPrice();
        listingPrice = listingPrice.toString();

        //actually create the NFT
        let resell = await contract.resell(tokenId, {value: listingPrice});
        await resell.wait();

        alert("NFT listada na loja com sucesso!");
        window.location.replace("/Estado");
    }

    const listed = data.data.Listed
    var texto = "buttonNFTnone";
    if (!listed) {
        texto = "buttonNFT";
    }

    return (
        <div className="NFTboxCards">
            <img src={IPFSUrl} alt="" className="imagem" />
            <div className="colunaTextoNFT">
                <strong className="TituloNFT">{data.data.name}</strong>
                <p className="DescricaoNFT">
                    {data.data.description}
                </p>
                <div>
                    <button className={texto} onClick={() => resellNFT()}>Vender</button>
                </div>
            </div>
        </div>
    )
}

export default NFTcards;