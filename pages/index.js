import { useState, useEffect,useRef } from "react";
import { ethers } from "ethers";
import bipinKumarWalletAbi from "../artifacts/contracts/Assessment.sol/CoffeeDispenser.json"

export default function HomePage() {
  const [bipinWallet, setBipinWallet] = useState(undefined);
  const [bipinAccount, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);

  const depositRef = useRef();
  const withdrawRef = useRef();
  const depositSecret = useRef();

  const contractAddress = "0x6036060d46FDd2eA75Dd11b44F11bBc893332634";
  const atmABI = bipinKumarWalletAbi.abi;

  const getWalletAddress = async () => {
    if (window.ethereum) {
      setBipinWallet(window.ethereum);
    }

    if (bipinWallet) {
      try {
        const accounts = await bipinWallet.request({ method: "eth_accounts" });
        accoundHandler(accounts);
      } catch (error) {
        console.log("error", error)
      }
    }
  };

  const accoundHandler = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No bipinAccount found");
    }
  };

  const copyAddress = ()=>{
    navigator.clipboard.writeText(contractAddress);
  }

  const connectToMetamask = async () => {
    if (!bipinWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await bipinWallet.request({ method: "eth_requestAccounts" });
    accoundHandler(accounts);

    // once wallet is set, we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(bipinWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      try {
        const currentBal = await atm.getBalance();
        console.log(currentBal)

        setSecretBalance(currentBal.toNumber());
      } catch (error) {
        console.log("error", error)
      }
    }
  };

  const fill_dispenser = async () => {

    const amt = Number(depositRef.current.value);
    const addr = depositSecret.current.value;
    console.log(amt,addr);

    if(amt===0){
      alert("amount should be more than 0");
      return;
    }

    if( !addr ){
      alert('address is required');
      return;
    }

    try {
      if (atm) {
        let tx = await atm.FillDispenser(amt,addr);
        await tx.wait();
        getBalance();
        depositRef.current.value = 0;
        depositSecret.current.value = 0;
        alert(`DISPENSER FILLED WITH ${amt} cups`);
      }
    } catch (error) {
      alert("TRANSACTION REJECTED");
    }
  };

  const dispense_coffee = async () => {

    const cups = Number(withdrawRef.current.value);

    if(cups===0){
      alert("amount should be more than 0");
      return;
    }

    console.log(cups);

    try {
      if (atm) {
        let tx = await atm.DispenseCoffee(cups);
        await tx.wait();
        getBalance();
        alert(`MACHINE DISPENSED ${cups} OF COFFEE`);
      }
    } catch (error) {
      alert("TRANSACTION REJECTED");
      console.log(error);
    }


  };


  useEffect(() => {
    getWalletAddress();
  }, []);

  useEffect(() => {
    if (atm) {
      getBalance();
    }
  }, [atm]);

  return (
    <main className="container">
      <header>
        <h1>Coffee Dispenser from</h1>
        <h2>Bipin Tyagi</h2>
      </header>
      <div className="content">
        {!bipinAccount ? (
          <button onClick={connectToMetamask}>Start the Coffee Dispenser</button>
        ) : (
          <>
            <div className="button-group">

              <div className="btn-input">

                <button onClick={copyAddress}>
                  Copy the address
                </button>
                
              </div>
              <div className="btn-input">
                <button onClick={fill_dispenser}>Fill Coffee Dispenser</button>
                <div>
                  <input ref={depositRef} type="number" placeholder="Amount"></input>
                  <input ref={depositSecret} type="password" placeholder="Owner Address"></input>
                </div>

              </div>

              <div className="btn-input">
                <button onClick={dispense_coffee}>Dispense Coffee</button>
                <div>
                  <input ref={withdrawRef} type="number" placeholder="Amount"></input>
                </div>
              </div>

            </div>
          </>
        )}
      </div>
      <style jsx>{`body {
  background-color: #1a1a1a;
  color: #fff;
}

main {
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(to right, #33ff77, #33aaff);
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.btn-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1em;
}

input {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #1a1a1a;
  color: #fff;
  border: 1px solid #33aaff;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.2s, transform 0.2s;
  margin: 0.4em;
}

.btn-input > div {
  display: flex;
}

.container {
  text-align: center;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to bottom, #1a1a1a, #333);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: #fff;
}

header {
  margin-bottom: 30px;
  font-size: 36px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  border-radius: 8px;
}

.button-group {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  display: block;
  padding: 10px 20px;
  font-size: 16px;
  background: linear-gradient(to right, #33aaff, #33ff77);
  color: black;
  border: 1px solid #33aaff;
  font-weight: bold;
  cursor: pointer;
  width: 20vw;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, background 0.2s;
}

button:hover {
  transform: scale(1.05);
  background: linear-gradient(to right, #3399ff, #33cc66);
}

`}</style>
    </main>
  );
}
