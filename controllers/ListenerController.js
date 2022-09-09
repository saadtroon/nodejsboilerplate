const MyContract = require("../contracts/MyContract");
const Web3 = require('web3');
const fs = require("fs");
const Farm = require("../models/FarmModel");
const CategoryDetailModel = require("../models/CategoryDetailModel");
const ethers = require("ethers");
const { stringify } = require("querystring");

/**
 * Book List.
 * 
 * @returns {Object}
 */
const EXPECTED_PONG_BACK = 15000
const KEEP_ALIVE_CHECK_INTERVAL = 7500

var abi = [{"inputs":[{"internalType":"address","name":"shoefyContract_","type":"address"},{"internalType":"address","name":"nftContract_","type":"address"},{"internalType":"string[]","name":"categories_","type":"string[]"},{"internalType":"uint256[]","name":"totalGeneralNFTs","type":"uint256[]"},{"internalType":"uint256[]","name":"totalRapidNFTs","type":"uint256[]"},{"internalType":"uint256[]","name":"generalFarmsAllowed_","type":"uint256[]"},{"internalType":"uint256[]","name":"rapidFarmsAllowed_","type":"uint256[]"},{"internalType":"uint256[]","name":"generalTokensRequired_","type":"uint256[]"},{"internalType":"uint256[]","name":"rapidTokensRequired_","type":"uint256[]"},{"internalType":"address","name":"_signerAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"bytes32","name":"category","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"farmId","type":"uint256"}],"name":"GeneralNFTFarmed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"bytes32","name":"category","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"farmId","type":"uint256"}],"name":"GeneralNFTMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"bytes32","name":"category","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"farmId","type":"uint256"}],"name":"RapidNFTFarmed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"bytes32","name":"category","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"farmId","type":"uint256"}],"name":"RapidNFTMinted","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmCategory","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmHarvested","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"category_","type":"bytes32"},{"internalType":"uint256","name":"farmAmount_","type":"uint256"},{"internalType":"bool","name":"generalFarm_","type":"bool"}],"name":"farmNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmType","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"generalFarm","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalFarmTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalFarmsAllowed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalFarmsLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalFarmsUsed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalTokensRequired","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"category_","type":"bytes32"},{"internalType":"bool","name":"generalFarm_","type":"bool"}],"name":"getUserLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"farmIds_","type":"uint256[]"},{"internalType":"string[]","name":"tokenURIs_","type":"string[]"},{"internalType":"bytes[]","name":"signatures_","type":"bytes[]"},{"internalType":"bool","name":"generalFarm_","type":"bool"}],"name":"harvestNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rapidFarm","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidFarmTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidFarmsAllowed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidFarmsLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidFarmsUsed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidTokensRequired","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"signerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_signerAddress","type":"address"}],"name":"updateSignerAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"categories_","type":"string[]"},{"internalType":"uint256[]","name":"totalGeneralNFTs","type":"uint256[]"},{"internalType":"uint256[]","name":"totalRapidNFTs","type":"uint256[]"},{"internalType":"uint256[]","name":"generalFarmsAllowed_","type":"uint256[]"},{"internalType":"uint256[]","name":"rapidFarmsAllowed_","type":"uint256[]"},{"internalType":"uint256[]","name":"generalTokensRequired_","type":"uint256[]"},{"internalType":"uint256[]","name":"rapidTokensRequired_","type":"uint256[]"}],"name":"updateconfig","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const web3 = new Web3('wss://rinkeby.infura.io/ws/v3/492fcc4da38f4eab99b315e2dfc3ae7d')
let options = {
	timeout: 10000, // ms

	clientConfig: 
	{
	  keepalive: true,
	  keepaliveInterval: 20000 // ms
	},

	reconnect: {
		auto: true,
		delay: 1000, // ms
		maxAttempts: 3,
		onTimeout: false
	}
};
//const contract =  new web3.eth.Contract((abi), '0xeba88d7B2A100c58d246c9482AED4B835af0Bce0',options)
const shoefyAddress = "0xeba88d7B2A100c58d246c9482AED4B835af0Bce0"
	
const provider = new ethers.providers.WebSocketProvider(
	 `wss://rinkeby.infura.io/ws/v3/492fcc4da38f4eab99b315e2dfc3ae7d`
	);
let pingTimeout = null
let keepAliveInterval = null

const contract = new ethers.Contract(shoefyAddress, abi, provider);

provider._websocket.on('open', () => {
    keepAliveInterval = setInterval(() => {
      console.log('Checking if the connection is alive, sending a ping')

      provider._websocket.ping()

      // Use `WebSocket#terminate()`, which immediately destroys the connection,
      // instead of `WebSocket#close()`, which waits for the close timer.
      // Delay should be equal to the interval at which your server
      // sends out pings plus a conservative assumption of the latency.
      pingTimeout = setTimeout(() => {
        provider._websocket.terminate()
      }, EXPECTED_PONG_BACK)
    }, KEEP_ALIVE_CHECK_INTERVAL)

    // TODO: handle contract listeners setup + indexing
  })

  provider._websocket.on('close', () => {
    console.log('The websocket connection was closed')
    clearInterval(keepAliveInterval)
    clearTimeout(pingTimeout)
    Listener.eventListener();
    Listener.eventListenerRapid();
    Listener.eventListenerHarvestGeneral();
    Listener.eventListenerHarvestRapid();
  });

  provider._websocket.on('pong', () => {
    console.log('Received pong, so connection is alive, clearing the timeout')
    clearInterval(pingTimeout)
  });
  
 exports.eventListener = 
	async function () {
		try {
            console.log("Listner started : General Farm");
            // General Farm
            contract.on("GeneralNFTFarmed", (from, categoryBytes, value, event) => {
                console.log(from, categoryBytes, value,"event:::",event );

                var type;
                console.log("alue.args[1]:",value)
     
                type = determineType(categoryBytes)
                console.log(type);
                var query = {categoryName: type.toLowerCase()};
                var farmID = parseInt(value, 10);

                Farm.findOne({farmId: farmID}).then(res => {

                CategoryDetailModel.find(query).then(category => {
                    
                    let index = parseInt(randomNumber(0, category[0].availableNFTs.length)); 
                    let indexNum = category[0].availableNFTs[index];

                    if(index == category[0].availableNFTs.length-1){
                        category[0].availableNFTs.pop();
                    }else{
                        category[0].availableNFTs[index] = category[0].availableNFTs.pop()
                    }

                    var nextUpdatedTimestamp = Date.now();
                    // nextUpdatedTimestamp = nextUpdatedTimestamp + (15 * 86400000);
                    nextUpdatedTimestamp = nextUpdatedTimestamp + (15 * 60000);
                        if(category.length <= 0) {
                            console.log("no Category Detail Model row found:", query)
                        }
                        
                        var farm = new Farm (
                            {   userAddress: from,
                                categoryName: type,
                                categoryBytes: String(categoryBytes),
                                farmId: farmID,
                                typeNFT: "general",
                                mintStatus: "Pending",
                                assignedNFT: indexNum,
                                txHash: event.transactionHash,
                                nextUpdatedTimestamp: nextUpdatedTimestamp,
                            } );
                            counter = category[0].counterNFT
                            if (res !== null ) {
                                console.log("duplicate",farm.farmId);
                                return;
                            } else {
                                //Save book.assignedNFT
                                farm.save(function (err) {
                                    if (err) { console.log("error:",err); }
                                    console.log("saved Successfully with farm ID:", farmID);
                                    CategoryDetailModel.findOneAndUpdate(query,
                                        { $set: { availableNFTs: category[0].availableNFTs}},
                                        (err, doc) => {
                                            if (err) {
                                                console.log("Something wrong when updating data!",err,doc);
                                            }
                                        
                                        }
                                    )
                                });
                            }
                });
            });
        });

        await new Promise(resolve =>  {
            setTimeout(()=> resolve), 900000000000000});
      
        let promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve("done!"), 9000000000000)
        });
		} catch (err) {
			//throw error in json response with status 500. 
            console.log("error", err);
			return;
		}
	};


/**
 * Event Listener Rapid
 * 
 * @returns {Object}
 */
 exports.eventListenerRapid = 
 async function () {
     try {
         console.log("Listner started : Rapid Farm");
        // Rapid Farm
        contract.on("RapidNFTFarmed", (from, categoryBytes, value, event) => {
            var type;
            console.log("from:",from, "category:", categoryBytes, "event",event);
            console.log("value:",value);
            type = determineType(category);

            var query = {categoryName: type.toLowerCase()};
            var nextUpdatedTimestamp = Date.now();
            // nextUpdatedTimestamp = nextUpdatedTimestamp + (20 * 86400000);
            nextUpdatedTimestamp = nextUpdatedTimestamp + (20 * 60000);
            var farmID = parseInt(value, 10);
            Farm.findOne({farmId: farmID}).then(res => {   

            CategoryDetailModel.find(query).then(category => {
                
                let index = parseInt(randomNumber(0, category[0].availableNFTs.length)); 
                let indexNum = category[0].availableNFTs[index];

                if(index == category[0].availableNFTs.length-1){
                    category[0].availableNFTs.pop();
                }else{
                    category[0].availableNFTs[index] = category[0].availableNFTs.pop()
                }

                var farm = new Farm (
                { 
                    userAddress: from,
                    categoryName: type,
                    categoryBytes: string(categoryBytes),
                    farmId: farmID,
                    typeNFT: "rapid",
                    mintStatus: "Pending",
                    assignedNFT: indexNum,
                    txHash: event.transactionHash,
                    nextUpdatedTimestamp: nextUpdatedTimestamp,
                });

            counter = category[0].counterNFT
            if (res !== null ) {
                console.log("duplicate",farm.farmId);
                return;
            } else {
                    //Save book.assignedNFT
                    farm.save(function (err) {
                        if (err) { console.log("error:",err); }
                        console.log("saved Successfully with farm ID:", farmID);
                        CategoryDetailModel.findOneAndUpdate(query,
                            { $set: { availableNFTs: category[0].availableNFTs}},
                            (err, doc) => {
                                if (err) {
                                    console.log("Something wrong when updating data!",err,doc);
                                }
                            
                                // console.log("success updated:",doc);
                            }
                        )
                    });
                }
            });
        });           
    }); 
    // console.log("end");
    await new Promise(resolve =>  {
        setTimeout(()=> resolve), 900000000000000});
  
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 9000000000000)
    });   
    // console.log("yeah")
    } catch (err) {
        //throw error in json response with status 500. 
        console.log("error", err);
        return;
    }
 };



 /**
 * Event Listener Harvest general
 * 
 * @returns {Object}
 */
  exports.eventListenerHarvestGeneral = 
  async function () {
      try {
          console.log("Listner started : General harvest ");
         // Rapid Farm
         contract.on("GeneralNFTMinted", (from, categoryBytes, value, event) => {
            console.log("from:",from, "categoryBytes:", categoryBytes,"value:", value, "event:", event);
            var query = {farmId: parseInt(value,10), mintStatus: "Completed"};
            Farm.findOneAndUpdate(query,
                { $set: { mintStatus: "Minted"}},
                (err, doc) => {
                    if (err) {
                        console.log("Something wrong when updating data!",err,doc);
                    }
                    // console.log("success updated:",doc);
                }
            )
         });           
 
    //  console.log("end");
     await new Promise(resolve =>  {
         setTimeout(()=> resolve), 9000000000000});
   
     let promise = new Promise((resolve, reject) => {
       setTimeout(() => resolve("done!"), 9000000000000)
     });
    //  console.log("yeah")
     } catch (err) {
         //throw error in json response with status 500. 
         console.log("error", err);
         return;
     }
  };
 
 

   /**
 * Event Listener Harvest Rapid
 * 
 * @returns {Object}
 */
    exports.eventListenerHarvestRapid = 
    async function () {
        try {
            console.log("Listner started : Rapid harvest ");
           // Rapid Farm
            contract.on("RapidNFTMinted", (from, categoryBytes, value, event) => {
            console.log("from:",from, "categoryBytes:", categoryBytes,"value:", value, "event:", event);

            var query = {farmId: parseInt(value,10), mintStatus: "Completed"};
            Farm.findOneAndUpdate(query,
                { $set: { mintStatus: "Minted"}},
                (err, doc) => {
                    if (err) {
                        console.log("Something wrong when updating data!",err,doc);
                    }
                }
            )
           });
       await new Promise(resolve =>  {
           setTimeout(()=> resolve), 9000000000000});
     
       let promise = new Promise((resolve, reject) => {
         setTimeout(() => resolve("done!"), 9000000000000)
       });
    //    console.log("yeah")
       } catch (err) {
           //throw error in json response with status 500. 
           console.log("error", err);
           return;
       }
    };

    exports.eventListenerTest = async function () {

        contract.on('error', (e) => {
            console.log('provider errored: ' + e);
        });
    }      



 ///// helper functions


 function determineType(returnValue){
     var type;
    if (returnValue == "0x3955032f1b4fd3485213d1c8a0e4ced5c0b5d4e9ffa466e04ca90c624d38a252") { // common
        type = "COMMON";

    } else if (returnValue == "0x7876765697b67ef92ea049557e63bf2e2e65bbccace3318b91b901e293c1946d") {  //unique
        type = "UNIQUE";
    
    } else if (returnValue == "0x2cf735e2c7740b1996c475c19261a0b7dc86863c4718b4dfa4b90956a5ece4ff") {  // rare
        type = "RARE";

    } else if (returnValue == "0x04f4f20a2d65eb0f15d7fb252c9027859568c706ff77f8b4471a76adbed564c4") {  // epic
        type = "EPIC";

    } else if (returnValue == "0x5b62d0d589d39df21aaf5ecafa555f3f0c1bfcfe9655dbed3f07da10f5e39875") {  // legendary
        type = "LEGENDARY";

    } else if (returnValue == "0x26d053d43cd0108003f60e6e90adfb10b90203969f78f4c831e6f61a20da5ff5") {  // mythic-god
        type = "MYTHICGOD"; 

    } else if (returnValue == "0x44e32297331fe14111706e1cb9bd9190b17b12743186529932199f3fd6d31352") {  // mythic-devil
        type = "MYTHICDEVIL";

    } else if (returnValue == "0xc997682c8ea1bbd29746fc05468bbcae2ae8133425ce5f23be32e09774956e82") {  // mythic-alien
        type = "MYTHICALIEN";
    }
    return type;
 }

 function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}