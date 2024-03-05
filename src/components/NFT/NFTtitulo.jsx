import { GetIpfsUrlFromPinata } from "../../utils/utils";
import React from 'react';
import MarketplaceCreditoCarbonoJSON from "../../MarketplacesDescricao/MarketplaceCreditoCarbono.json";
import { ethers } from 'ethers';
import "./NFTtitulo.css"

function NFTtitulo(data) {
    async function buyNFT() {
        try {
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
    
            //Pull the deployed contract instance
            let contract = new ethers.Contract(MarketplaceCreditoCarbonoJSON.address, MarketplaceCreditoCarbonoJSON.abi, signer);
            const salePrice = ethers.utils.parseUnits(data.data.price, 'ether')
            //run the executeSale function
            let transaction = await contract.executeSale(data.data.tokenId, {value:salePrice});
            await transaction.wait();
            alert('NFT comprada com sucesso!');
        }
        catch(e) {
            alert("Upload Error"+e)
        }
    }


    const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);

    return (
            <div className="NFTbox">
                <img src={IPFSUrl} alt="" className="imagem" />
                <div className="colunaTextoNFT">
                    <h2 className="TituloNFT">{data.data.name}</h2>
                    <p className="DescricaoNFT">
                        {data.data.description}
                    </p>
                    <p className="PrecoNFT">
                        {data.data.price}
                    </p>
                        <button className="buttonNFT" onClick={() => buyNFT()}>Compre</button>
                </div>
            </div>
    )
}

export default NFTtitulo;
