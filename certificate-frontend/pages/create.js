import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import "../styles/Home.module.css";
import ContractAbi from "../utils/Contract.json";
import { CWContractAddress } from '../utils/config.js';


export default function Create() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [instituteName, setInstituteName] = useState("");
  const [certificateType, setCertificateType] = useState("");
  const [additionalKey, setAdditonalKey] = useState("");


  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain:" + chainId);

      const rinkebyChainId = "0xaa36a7";

      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the Sepolia Testnet!");
        return;
      } else {
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Found account", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  const addCertificate = async (e) => {
    e.preventDefault();

    let institute = {
      institutename: instituteName,
      certificatetype: certificateType,
      additionalkey: additionalKey,
    };

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const CWContract = new ethers.Contract(
          CWContractAddress,
          ContractAbi.abi,
          signer
        );
        console.log();
        CWContract.createCertificate(
          institute.institutename,
          institute.certificatetype,
          institute.additionalkey
        ).catch((err) => {
          console.log(err);
        });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div>
      {currentAccount === "" ? (
        <button
          className="text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : correctNetwork ? (
        <div className="App">
          <h2 style={{ margin: "5px 5px" }}> Clarusway Certificate Creation Panel</h2>
          <form>
            <TextField
              id="outlined-basic"
              label="Institutename"
              variant="outlined"
              style={{ margin: "5px 5px" }}
              size="small"
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Certificate Name "
              variant="outlined"
              style={{ margin: "5px 5px" }}
              size="small"
              value={certificateType}
              onChange={(e) => setCertificateType(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Additional Key"
              variant="outlined"
              style={{ margin: "5px 5px" }}
              size="small"
              value={additionalKey}
              onChange={(e) => setAdditonalKey(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addCertificate}
              style={{ margin: "5px 5px" }}
            >
              Send Certificate
            </Button>
          </form>

          <form></form>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3">
          <div>----------------------------------------</div>
          <div>Please connect to the Correct Network</div>
          <div>and reload the page</div>
          <div>----------------------------------------</div>
        </div>
      )}
    </div>
  );
}
