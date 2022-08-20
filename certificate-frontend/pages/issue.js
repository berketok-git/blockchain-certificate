import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import "../styles/Home.module.css";
import ContractAbi from "../utils/Contract.json";
import { TextField, Button } from "@mui/material";
import { CWContractAddress } from '../utils/config.js';


function App() {
  const [inputList, setInputList] = useState([
    { ownerAddress: "", ownerName: "", certificatetypeid: "",additionalValue:"" },
  ]);
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain:" + chainId);

      const rinkebyChainId = "0x4";

      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the Rinkeby Testnet!");
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

        console.log(inputList);
        CWContract.issueCertificate(inputList).catch((err) => {
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

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { ownerAddress: "", ownerName: "", certificatetypeid: "",additionalValue:"" },
    ]);
  };

  return (
    <div className="App">
      <h2 style={{ margin: "5px 5px" }}>Issue Certificate Panel</h2>
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <TextField
              className="ml10"
              name="ownerAddress"
              style={{ margin: "5px 5px" }}
              size="small"
              placeholder="Address"
              value={x.ownerAddress}
              onChange={(e) => handleInputChange(e, i)}
            />
            <TextField
              className="ml10"
              name="ownerName"
              style={{ margin: "5px 5px" }}
              size="small"
              placeholder="Name"
              value={x.ownerName}
              onChange={(e) => handleInputChange(e, i)}
            />
            <TextField
              className="ml10"
              name="certificatetypeid"
              style={{ margin: "5px 5px" }}
              size="small"
              placeholder="Certificate Id"
              value={x.certificatetypeid}
              onChange={(e) => handleInputChange(e, i)}
            />
            <TextField
              className="ml10"
              name="additionalValue"
              style={{ margin: "5px 5px" }}
              size="small"
              placeholder="Additional Value"
              value={x.additionalValue}
              onChange={(e) => handleInputChange(e, i)}
            />

            <div className="btn-box">
              {inputList.length !== 1 && (
                <Button className="mr10" onClick={() => handleRemoveClick(i)}>
                  Remove
                </Button>
              )}
              {inputList.length - 1 === i && (
                <Button  style={{ margin: "5px 5px"}} onClick={handleAddClick}>Add</Button>
              )}{" "}
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: 20 }}>
        <Button  style={{ margin: "5px 5px" }} variant="contained" color="primary" onClick={addCertificate}>
          Issue Certificate
        </Button>
      </div>
    </div>
  );
}

export default App;
