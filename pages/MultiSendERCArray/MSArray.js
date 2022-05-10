import Head from "next/head";
import styles from "..../styles/Home.module.css";
import Web3Modal from "web3modal";
import { providers, Contract, ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { MULTISEND_CONTRACT_ADDRESS, abi} from "../../constants";

export default function DepositERC() {

    const [StringAddress, setStringAddress] = useState("");

    const [AddressDestArray, setAddressDestArray] = useState([]);

    const getAddresses = () => {
        const addressStringtoArray = StringAddress.split(",");
        setAddressDestArray(addressStringtoArray);
    }

    const getStringAddress = (val) => {
        setStringAddress(val.target.value);
        console.log(val.target.value);
    }
    const InputStringAddress = () => {
        return (
            <input className={styles.div.elem} type="text" onChange={getStringAddress}/>
        );
    }

    const buttonAddAdress = () => {
        return(
            <button onClick={getAddresses}>Add Address</button>
        );
    }

    const displayAddresses = () => {
        return (
            <ol>
                {AddressDestArray.map(item => <li key={item}>{item}</li>) }
            </ol>
        );
    }
    

    // useEffects are used to react to changes in state of the website
    // The array at the end of function call represents what state changes will trigger this effect
    // In this case, whenever the value of `walletConnected` changes - this effect will be called
    useEffect(() => {
        // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
        if (!walletConnected) {
          // Assign the Web3Modal class to the reference object by setting it's `current` value
          // The `current` value is persisted throughout as long as this page is open
          web3ModalRef.current = new Web3Modal({
            network: "binanceTest",
            providerOptions: {rpc: {
              97: 'https://speedy-nodes-nyc.moralis.io/f6ff47227c3725475f842d37/bsc/testnet'
           }},
            disableInjectedProvider: false,
          });
          connectWallet();
        }
      }, [walletConnected]);
    

    return (
        <div>
            <div className={styles.div}>
                    <h1>MultiSend</h1>
                    {InputStringAddress() }
                    {buttonMultisend() }
                    {buttonAddAdress() }
                    {displayAddresses() }
                    
                
            </div>
        </div>

    );
}