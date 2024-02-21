import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../pinata.js";
import Marketplace from '../../Marketplace.json';
import { ethers } from "ethers";
import React from 'react';
import "./ListaNFT.css"

function ListaNFT() {
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: '' });
    const [fileURL, setFileURL] = useState(null);
    const [message, updateMessage] = useState('');

    async function disableButton() {
        const listButton = document.getElementById("list-button")
        listButton.disabled = true
        listButton.style.backgroundColor = "grey";
        listButton.style.opacity = 0.3;
    }

    async function enableButton() {
        const listButton = document.getElementById("list-button")
        listButton.disabled = false
        listButton.style.backgroundColor = "#A500FF";
        listButton.style.opacity = 1;
    }

    //This function uploads the NFT image to IPFS
    async function OnChangeFile(e) {
        var file = e.target.files[0];
        //check for file extension
        try {
            //upload the file to IPFS
            disableButton();
            updateMessage("Carregando imagem.. por favor não clique em nada!")
            const response = await uploadFileToIPFS(file);
            if (response.success === true) {
                enableButton();
                updateMessage("")
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setFileURL(response.pinataURL);
            }
        }
        catch (e) {
            console.log("Error during file upload", e);
        }
    }

    //This function uploads the metadata to IPFS
    async function uploadMetadataToIPFS() {
        const { name, description, price } = formParams;
        //Make sure that none of the fields are empty
        if (!name || !description || !price || !fileURL) {
            updateMessage("Por favor preencha todos os espaços!")
            return -1;
        }

        const nftJSON = {
            name, description, price, image: fileURL, currentlyListed: true,
        }

        try {
            //upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(nftJSON);
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
            const metadataURL = await uploadMetadataToIPFS();
            if (metadataURL === -1)
                return;
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            disableButton();
            updateMessage("Carregando NFT(em média 5 minutos).. por favor não clique em nada!")

            //Pull the deployed contract instance
            let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

            //massage the params to be sent to the create NFT request
            const price = ethers.utils.parseUnits(formParams.price, 'ether')
            let listingPrice = await contract.getListPrice()
            listingPrice = listingPrice.toString()

            //actually create the NFT
            let transaction = await contract.createToken(metadataURL, price, { value: listingPrice })
            await transaction.wait()

            alert("NFT listada na loja com sucesso!");
            enableButton();
            updateMessage("");
            updateFormParams({ name: '', description: '', price: '' });
            window.location.replace("/Comprador")
        }
        catch (e) {
            alert("Upload error" + e)
        }
    }

    return (
        <div className="colunaGeralDoacao">
            <div className="container d-flex align-items-center justify-content-center">
                <div className="cardVendedor">
                    <div className="card-body">
                        <h3 className="">NFT para o marketplace</h3>
                        <form className="formulario">
                            <div className="colunaCentral">
                                <div className="mb-3">
                                    <label>Nome</label>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input className="form-control" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({ ...formParams, name: e.target.value })} value={formParams.name}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label>Descrição</label>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <textarea className="form-control" cols="40" rows="5" id="description" type="text" placeholder="Axie Infinity Collection" value={formParams.description} onChange={e => updateFormParams({ ...formParams, description: e.target.value })}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label>Preço em ETH</label>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input className="form-control" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({ ...formParams, price: e.target.value })}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image">Upload da imagem (&lt;500 KB)</label>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input className="form-control" type={"file"} onChange={OnChangeFile}></input>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="">{message}</div>
                                <button onClick={listNFT} className='ButtonSend' id="list-button">
                                    List NFT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListaNFT;