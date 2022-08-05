// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// const Contract = require("./Aiverse.json");

// const Mint = ({ userAddress, passData }) => {
//   const url =
//     "https://gmail.us10.list-manage.com/subscribe/post?u=3cc5b7a53a75b3091ee32bab3&amp;id=b139dcf936";
//   const web3 = createAlchemyWeb3(
//     "https://eth-rinkeby.alchemyapi.io/v2/qFOiMhS5KfF1JnCgCdxexsSKluJi1rZy"
//   );
//   const contractAddress = "0x3647b747ed3cb65a9c6ed915d31c8a69f39c5121";
//   const nftContract = new web3.eth.Contract(Contract.abi, contractAddress);
//   const [phase, setPhase] = useState("");
//   const [open, setOpen] = useState(false);
//   const [snackBarMessage, setSnackBarMessage] = useState("");
//   const [uri, seturi] = useState(null);

//   const handlePhaseInput = (e) => {
//     setPhase(e.target.value);
//   };

//   const handleMinting = () => {
//     if (phase == "") {
//       setSnackBarMessage("Please Enter the Phase!!!");
//     } else {
//       if (userAddress) {
//         function sendTransaction(tokenURI) {
//           let params = [
//             {
//               from: userAddress,
//               to: contractAddress,
//               gas: "",
//               // gasPrice: "0x59D8",
//               value: "0x6F05B59D3B20000",
//               data: nftContract.methods
//                 .safeMint(userAddress, tokenURI)
//                 .encodeABI(),
//             },
//           ];
//           console.log("minting now", nftContract, "Contract ABI", Contract.abi);
//           let result = window.ethereum
//             .request({ method: "eth_sendTransaction", params })
//             .catch((err) => {
//               console.log(err);
//             });
//         }
//         function mintingNFT(tokenURI) {
//           sendTransaction(tokenURI);
//         }
//         setSnackBarMessage(
//           "Your NFT is being minted. Please wait for few minutes in the while AI would generate image for you. Please don't close window or browser"
//         );
//         fetch(`https://www.apiaiversenft.xyz/nft/${phase}`, {
//           signal: Timeout(600).signal,
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Content-type": "application/json",
//           },
//         })
//           .then((data) => {
//             if (data.ok) {
//               console.log("hello");
//               data.json().then((res) => {
//                 // setSnackBarMessage(
//                 //   "Minting has started. Please don't close window or browser"
//                 // );
//                 seturi(res.query);
//                 mintingNFT(res.query);
//               });
//             } else {
//               // alert("Too many requests. Try after some time");
//               setSnackBarMessage("Too many requests. Try after some time");
//             }
//           })
//           .catch((err) => console.log(err));
//       } else {
//         setSnackBarMessage("Please connect your wallet and then mint your NFT");
//       }
//     }
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className="mintParent" id="mint">
//       <p className="mintTitle">Mint Your First</p>
//       <p className="mintTitleBold">AI Generated NFTs</p>
//       <div className="mintButtonParent">
//         <input
//           className="mintInput"
//           placeholder="Enter your phase"
//           onChange={handlePhaseInput}
//           value={phase}
//         />
//         <button
//           className="buttonMint"
//           style={{ cursor: "pointer" }}
//           onClick={handleMinting}
//         >
//           Mint Now
//         </button>
//       </div>
//       <div>
//         <div className="mintDesign"></div>
//         <div className="elipse"></div>
//         <div className="bottomElipse"></div>
//       </div>
//       <p className="mintBottomText">
//         Let Us <span className="mintBottomtextGradientKnow">Know What</span>
//         <br />
//         <span className="mintBottomtextGradientThinking">You're Thinking</span>
//       </p>
//       <div className="mintEmailParent">
//         <MailchimpSubscribe
//           url={url}
//           render={({ subscribe, status, message }) => (
//             <Form
//               status={status}
//               message={message}
//               onValidated={(formData) => subscribe(formData)}
//             />
//           )}
//         />
//         <p className="mintEmailText">
//           Get In
//           <br />
//           Touch
//         </p>
//       </div>
//       <div className="mintFooter">
//         <img className="logo" src={logo} />
//         <div className="maintFooterTextParent">
//           <p className="mintFooterText">Shaping the</p>
//           <p className="mintFooterText">AI Industry </p>
//         </div>
//         <div className="mintFooterLinkParent">
//           <div className="mintFooterInternalLink">
//             <a className="internalLink" onClick={() => passData("about")}>
//               About Us
//             </a>
//             <a className="internalLink" onClick={() => passData("mint")}>
//               Contact
//             </a>
//             <a className="internalLink" onClick={() => passData("home")}>
//               Home
//             </a>
//             <a
//               className="internalLink"
//               href="https://drive.google.com/file/d/12wUlejsHPuImzPBrUmNlmody70lU8AcL/view"
//             >
//               Whitepaper
//             </a>
//           </div>
//           <div className="mintFooterExternalLink">
//             <a href="https://twitter.com/AIVerse_Dai">
//               <TwitterIcon className="externalLink" />
//             </a>
//             <a href="https://t.me/AIVERSE_DAI">
//               <TelegramIcon className="externalLink mintFooterExternalLinkMiddle" />
//             </a>
//             <a href="mailto:abhishekl@aiverse.co.in">
//               <EmailIcon className="externalLink" />
//             </a>
//           </div>
//         </div>
//       </div>
//       {/* For Mint Footer Mobile */}
//       <div className="mintFooterMobile">
//         <img className="logoMobile" src={logo} />
//         <div className="maintFooterTextParentMobile">
//           <p className="mintFooterTextMobile">Shaping the</p>
//           <p className="mintFooterTextMobile">AI Industry </p>
//         </div>
//       </div>
//       <div className="mintFooterLinkParentMobile">
//         <div className="mintFooterInternalLink">
//           <a className="internalLink" onClick={() => passData("about")}>
//             About Us
//           </a>
//           <a className="internalLink" onClick={() => passData("mint")}>
//             Contact
//           </a>
//           <a className="internalLink" onClick={() => passData("home")}>
//             Home
//           </a>
//           <a
//             className="internalLink"
//             href="https://drive.google.com/file/d/12wUlejsHPuImzPBrUmNlmody70lU8AcL/view"
//           >
//             Whitepaper
//           </a>
//         </div>
//         <div className="mintFooterExternalLink">
//           <a href="https://twitter.com/AIVerse_Dai">
//             <TwitterIcon className="externalLink" />
//           </a>
//           <a href="https://t.me/AIVERSE_DAI">
//             <TelegramIcon className="externalLink mintFooterExternalLinkMiddle" />
//           </a>
//           <a href="mailto:abhishekl@aiverse.co.in">
//             <EmailIcon className="externalLink" />
//           </a>
//         </div>
//       </div>
//       <div className="mintTermsAndPolicyParent">
//         <div className="copyRight">
//           <CopyrightIcon style={{ fontSize: "medium" }} />
//           <p className="mintTermsAndPolicy">&nbsp;2021. All Right Reserved.</p>
//         </div>
//         <p className="mintTermsAndPolicy mintTermsAndPolicyMiddle">
//           Privacy Policy
//         </p>
//         <p className="mintTermsAndPolicy">Terms & Conditions</p>
//       </div>
//       <Snackbar
//         open={open}
//         autoHideDuration={40000}
//         message={snackBarMessage}
//         onClose={handleClose}
//       />
//     </div>
//   );
// };

// export default Mint;
