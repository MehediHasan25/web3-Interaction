    
const W3 = require('web3');
const Tx = require('ethereumjs-tx');
const fs = require('fs');
const path = require('path');

var ethPath = path.join(__dirname, '/eth-conf.json');

const ethConf = JSON.parse(fs.readFileSync(ethPath));

const web3 = new W3(new W3.providers.HttpProvider(ethConf.provider));

web3.eth.defaultAccount = ethConf.defaultAccount;

const contractAddress = ethConf.contractAddress;

const priKey = ethConf.defaultAccountPrivateKey;

const KycContract = new web3.eth.Contract(ethConf.contractABI, contractAddress, {
    from: web3.eth.defaultAccount, // default from address
    gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});

async function setNID(key, nid, nidImage) {
    var privateKey = Buffer.from(priKey, 'hex');
    let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);

    var rawTransaction = {
        "from": web3.eth.defaultAccount,
        "gasPrice": web3.utils.toHex(20 * 1e9),
        "gasLimit": web3.utils.toHex(210000),
        "to": contractAddress,
        "value": "0x0",
        "data": KycContract.methods.setNID(key, nid, nidImage).encodeABI(),
        "nonce": web3.utils.toHex(nonce)
    };

    var transaction = new Tx(rawTransaction);

    transaction.sign(privateKey);

    web3.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'), (err, txHash) => {
        console.log(txHash);
    });
    // .once('receipt', function(receipt){console.log("Receipt: ", receipt)})
    // .on('confirmation', function(confNumber, receipt){console.log("conf: ", confNumber)})
    // .on('error', function(error){console.log(error)})
    // .then(function(receipt){
    //     // will be fired once the receipt is mined
    //     console.log("from receipt: ", receipt);
    // })
    
    console.log("Exiting...");
    //return tx;
}

async function setTIN(key, tin, tinImage){
    var privateKey = Buffer.from(priKey, 'hex');
    let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);

    var rawTransaction1={
        "from": web3.eth.defaultAccount,
        "gasPrice": web3.utils.toHex(20 * 1e9),
        "gasLimit": web3.utils.toHex(210000),
        "to": contractAddress,
        "value": "0x0",
        "data": KycContract.methods.setTIN(key, tin, tinImage).encodeABI(),
        "nonce": web3.utils.toHex(nonce)

    }
    var transaction = new Tx(rawTransaction1);
    transaction.sign(privateKey);

    web3.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'), (err, txHash) => {
        console.log(txHash);
    });
    console.log("SetTin Exiting");
}

async function getNID(key) {
    let nidDetails = await KycContract.methods.getNID(key).call();
    //console.log(nidDetails);
    return nidDetails;
}

async function getTIN(key){
    let tinDetails = await KycContract.methods.getTIN(key).call();
    console.log(tinDetails);
    return getTIN;
}

async function main() {
   setNID("Mehedi", "{'id':'0123456','name':'Md. Mehedi Hasan','address':'Mohakhali'}", "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");

    console.log(tx);

    let nd = await getNID("mehedi");

    nd.forEach(item => {
        console.log(item);
    })
    //setTIN("Nahid", "{name: Nahid Chowdhury}", "where is my TIn");
    

    // let tn= await getTIN("Nahid");
    // console.log(tn);
    
    // tn.forEach( tinitem =>{
    //     console.log(tinitem);
    // })
    
}

main();
