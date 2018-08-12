var Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx')

var web3 = new Web3("http://127.0.0.1:7545");

web3.eth.defaultAccount = "0x4f3545ab2e33D35cc85373514EC16810f8D052B3";
const amountToSend = 0.00100000

const main = async () => {
    let myBalanceWei = web3.eth.getBalance(web3.eth.defaultAccount, function(err, data) {
        if(data > 0) {
            web3.eth.getTransactionCount(web3.eth.defaultAccount, function(err, nonce){

                let details = {
                    "to": "0x54404cbe397a0aD4591Fa0F49F1701EDb027397F",
                    "value": web3.utils.toHex( web3.utils.toBN(web3.utils.toWei('0.1')) ),
                    "gas": 21000,
                    "gasPrice": 10.3 * 1000000000, // converts the gwei price to wei
                    "nonce": nonce,
                    "chainId": 5777 // EIP 155 chainId - mainnet: 1, rinkeby: 4
                  }
                  //console.log(details);
                  
                  const transaction = new EthereumTx(details);
                  transaction.sign( Buffer.from('9321cf59bd2d79fc95648a9ad201daefb1a33dc933bc9a28c48f4ce049203437', 'hex') );
                  const serializedTransaction = transaction.serialize()
                  const transactionId = web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'), function(err, txdata) {
                      console.log("Transaction ID: " + txdata);
                  } )
            })
        } 
    })
  }
   
  main()