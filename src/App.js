import React, {useState} from "react";
import abi from './abi.json';
import {ethers} from 'ethers';
var converter = require('hex2dec');



function App(){

const contractAddress = '0xfc54c449929dC992fDea3961AB898A15894e8f84';

const [errorMessage, setErrorMessage] = useState(null);
const [defaultAccount, setDefaultAccount] = useState(null);
const [connButtonText, setConnButtonText] = useState('connect Wallet');

const [lastTrx, setlasttrx] = useState(null);

const [provider, setProvider] = useState(null);
const [signer, setSigner] = useState (null);
const [contract, setContract] = useState(null);
const [SellerPan, setSellerPan] = useState("");
const [BuyerPan, setBuyerPan] = useState("");
const [Price, setPrice] = useState("");

const connectWalletHandler = () => {
  if(window.ethereum){
    window.ethereum.request({method : 'eth_requestAccounts'}).then(result =>{
      accountChangeHandler(result[0]);
      setConnButtonText('wallet Connected'); 
    })
  }else{
    setErrorMessage("need to install metamask");
  }
}

const accountChangeHandler = (newAccount)=>{
  setDefaultAccount(newAccount);
  updateEthers();
}

const updateEthers = ()=>{
let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
setProvider(tempProvider);

let tempSigner = tempProvider.getSigner();
setSigner(tempSigner);

let tempContract = new ethers.Contract(contractAddress, abi , tempSigner);
setContract(tempContract);
}

const getLastTrx = async ()=>{
  var count = await contract.txCount();
  count = converter.hexToDec(`${count}`);
  console.log(count);
  if(count == 0) alert("No Previos Trancation");
  else{
  let val =  await contract.transaction(count-1);
  console.log(val[0]._hex);
  console.log("Buyer Pan : " + converter.hexToDec(`${val[0]._hex}`));
  console.log("Seller Pan : " + converter.hexToDec(`${val[1]._hex}`));
  console.log("Price : " + converter.hexToDec(`${val[2]._hex}`));
  const timeStamp = converter.hexToDec(`${val[3]._hex}`);
  const unixTime = timeStamp;
  const date = new Date(unixTime*1000);
  console.log(date.toLocaleDateString("en-US"));


  setlasttrx("Buyer Pan : " + converter.hexToDec(`${val[0]._hex}`) + "\n" + "Seller Pan : " + converter.hexToDec(`${val[1]._hex}`) + "\n" + "Price : " + converter.hexToDec(`${val[2]._hex}`) + "\n" + "Date : " + date.toLocaleDateString("en-US"));




  }
}

const setHandler =  async (event)=>{
  event.preventDefault();
  console.log(BuyerPan);
  console.log(SellerPan);
  console.log(Price);
  await contract.doTransaction(`${BuyerPan}`,`${SellerPan}`,`${Price}`);
  alert('Transation Done');

}

return(
<div>
<h3>{"Get/Set Interaction with contract !"}</h3> 
<button onClick={connectWalletHandler}> {connButtonText} </button>
<h3> Address: {defaultAccount} </h3>

<hr />

<h1>Add Transactions</h1>

<form onSubmit={setHandler}>

<h2>Seller pan</h2>
  <input id="setText" type='text' name="sellerPan" onChange={(e)=> setSellerPan(e.target.value)}></input>
<h2>Buyer Pan</h2>
  <input id="setText" type='text' name="buyerPan" onChange={(e)=> setBuyerPan(e.target.value)}></input>
<h2>Price</h2> 
  <input id="setText" type='text' name="price" onChange={(e)=> setPrice(e.target.value)}></input>
  
  <button type="submit"> update contract </button>
</form>

<hr/>

<button onClick={getLastTrx}> Get Last Transction </button>
<div>{lastTrx}</div>
{errorMessage}
</div>
) 
 


}

export default App;
