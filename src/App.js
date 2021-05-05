import './App.css';
import Web3 from '../node_modules/web3'
import {useState} from 'react';
import {Router} from './Router';
import detectEthereumProvider from '@metamask/detect-provider'
function App() {
  const[value,setvalue]=useState('Connect Wallet')
  const connect = async () => {
    
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      const accounts = await window.ethereum.request({
            method: "eth_accounts",
    });

      setvalue(accounts[0]);
      console.log(value) ;   
     

       
    }
    return false;
  };

  window.ethereum.on("accountsChanged", async function (accounts) {
    window.location.reload(true);
    await connect();

    console.log(accounts);
  });

  async function wethaddress(){
    const contractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const contract = await new window.web3.eth.Contract(Router,contractAddress);
  const getName = await contract.methods.WETH().call();
  //console.log(contract);
  console.log(getName);
  
  //console.log('getname',getName[0]);
 // updatedFetch({name1:getName[0],age:getName[1],mark1:getName[2],mark2:getName[3],mark3:getName[4],mark4:getName[5],hashcode:getName[6]})
   return getName;
}
  async function addliquidity(){
    const provider = await detectEthereumProvider();
    const web3=new Web3(provider)
    const contractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const contract = await new window.web3.eth.Contract(
      Router,
      contractAddress
    );
    
    const setliquidity = await contract.methods.addLiquidityETH("0xE2953427eDb31208dC2b6650aD85b619Cc75C571",
    "5000000000000000000",
    "5000000000000000000",
    "100000000000000000",
    "0xA7cAE81fa7edD41F6421Dbe75E3aB73E0cB81B3D",
    "1720129663").send({to:"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",from : value,value:await web3.utils.toWei("0.1", "ether")});

   // web3.sendTransaction({to:receiver, from:sender, value:web3.toWei("0.1", "ether")})
    console.log(value);
    return setliquidity;
    
  }

  async function addliquiditypairs(){
    // const provider = await detectEthereumProvider();
    // const web3=new Web3(provider)
    const contractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const contract = await new window.web3.eth.Contract(
      Router,
      contractAddress
    );
    
    const setliquiditypairs = await contract.methods.addLiquidity("0x9a37B5fAaD7c433ab87B8abA33aF2AC4015A63db",
    "0xA0268bb52344b3E5EDcfbB522B9e4C0a475e6632",
    "1000000000000000000",
    "1000000000000000000",
    "1000000000000000000",
    "1000000000000000000",
    "0xA7cAE81fa7edD41F6421Dbe75E3aB73E0cB81B3D",
    "1720212441").send({from : value});

   // web3.sendTransaction({to:receiver, from:sender, value:web3.toWei("0.1", "ether")})
    console.log(value);
    return setliquiditypairs;
    
  }
  

  return (
    <div className="App">
      <button onClick={() => connect()} value={value}>{value}</button>
      <button onClick={() => wethaddress()}>Wethaddress</button>
        <h3>Add liquidity</h3>
      <input type="text" placeholder="token address"/><br/>
      <input type="number" placeholder="amount token desired"/><br/>
      <input type="number" placeholder="amount token min"/><br/>
      <input type="number" placeholder="amount eth min" /><br/>
      <input type="text" placeholder="to"/><br/>
      <button onClick={() => addliquidity()}>Add liquidity</button>
      <h3>Add liquidity Pairs</h3>
      <input type="text" placeholder="token A"/><br/>
      <input type="text" placeholder="token B"/><br/>
      <input type="number" placeholder="amount A Desired"/><br/>
      <input type="number" placeholder="amount B Desired" /><br/>
      <input type="number" placeholder="amountAmin"/><br/>
      <input type="number" placeholder="amountBmin"/><br/>
      <input type="text" placeholder="address" /><br/>


      <button onClick={() => addliquiditypairs()}>Add liquidity pairs</button>
    </div>
  );
}

export default App;
