const MyContract = require("../contracts/MyContract");
const Web3 = require('web3');
const fs = require("fs");
const Farm = require("../models/FarmModel");
const CategoryDetailModel = require("../models/CategoryDetailModel");
/**
 * Book List.
 * 
 * @returns {Object}
 */
 exports.eventListener = 
	async function () {
		try {
            var abi = [{"inputs":[{"internalType":"address","name":"shoefyContract_","type":"address"},{"internalType":"string[]","name":"categories_","type":"string[]"},{"internalType":"uint256[]","name":"totalGeneralNFTs","type":"uint256[]"},{"internalType":"uint256[]","name":"totalRapidNFTs","type":"uint256[]"},{"internalType":"uint256[]","name":"generalFarmTimes_","type":"uint256[]"},{"internalType":"uint256[]","name":"rapidFarmtimes_","type":"uint256[]"},{"internalType":"uint256[]","name":"generalTokensRequired_","type":"uint256[]"},{"internalType":"uint256[]","name":"rapidTokensRequired_","type":"uint256[]"},{"internalType":"address","name":"_signerAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"bytes32","name":"","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"GeneralNFTFarmed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"bytes32","name":"","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"RapidNFTFarmed","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmCategory","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"category_","type":"bytes32"},{"internalType":"uint256","name":"farmAmount_","type":"uint256"}],"name":"farmGeneral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmHarvested","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"category_","type":"bytes32"},{"internalType":"uint256","name":"farmAmount_","type":"uint256"}],"name":"farmRapid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmType","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"generalFarm","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalFarmTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalFarmsLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalTokensRequired","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"farmIds_","type":"uint256[]"},{"internalType":"bytes[]","name":"signatures_","type":"bytes[]"}],"name":"harvestGeneral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"farmIds_","type":"uint256[]"},{"internalType":"bytes[]","name":"signatures_","type":"bytes[]"}],"name":"harvestRapid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rapidFarm","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidFarmTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidFarmsLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidTokensRequired","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"signerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"totalLayers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_signerAddress","type":"address"}],"name":"updateSignerAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"userFarmLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
            const web3 = new Web3('wss://rinkeby.infura.io/ws/v3/492fcc4da38f4eab99b315e2dfc3ae7d')
            const contract =  new web3.eth.Contract((abi), '0x19F20312Cc5f028999302f67C5b9C0c314fCA66D')
            // Gemeral Farm
            contract.events.GeneralNFTFarmed(function (error, event) {
                if (error) {
                    return error;
                } 
            }).on('data', function (data) {
                
                var type;
                type = determineType(data.returnValues[1])

                var query = {categoryName: type.toLowerCase()};
                var counter;
                CategoryDetailModel.find(query).then(category => {
                    
                    let index = parseInt(randomNumber(0, category[0].availableNFTs.length)); 
                    let indexNum = category[0].availableNFTs[index];

                    if(index == category[0].availableNFTs.length-1){
                        category[0].availableNFTs.pop();
                    }else{
                        category[0].availableNFTs[index] = category[0].availableNFTs.pop()
                    }

                    // ==============
                    var nextUpdatedTimestamp = Date.now();
                    nextUpdatedTimestamp = nextUpdatedTimestamp + (15 * 86400000);
                        if(category.length <= 0) {
                            console.log("no Category Detail Model row found:", query)
                        }
                        var farm = new Farm (
                            {   userAddress: data.returnValues[0],
                                categoryName: type,
                                categoryBytes: data.returnValues[1],
                                farmId: data.returnValues[2],
                                typeNFT: "general",
                                mintStatus: "Pending",
                                assignedNFT: indexNum,
                                nextUpdatedTimestamp: nextUpdatedTimestamp,
                            } );
                            counter = category[0].counterNFT

                            //Save book.assignedNFT
                            farm.save(function (err) {
                                if (err) { console.log("error:",err); }
                                console.log("saved Successfully with farm ID:", data.returnValues[2]);
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
                });
            })
            .on('changed', (event) => {
                console.log('--SomeEvent--Changed',event);
              })
            .on('error', (e) => {
            console.log('--SomeEvent--Error',e);
            });

        console.log("end");
        await new Promise(resolve =>  {
            setTimeout(()=> resolve), 9000000000000});
      
        let promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve("done!"), 9000000000000)
        });
        console.log("yeah")
		} catch (err) {
			//throw error in json response with status 500. 
            console.log("error", err);
			return;
		}
	};


    /**
 * Book List.
 * 
 * @returns {Object}
 */
 exports.eventListenerRapid = 
 async function () {
     try {
         console.log("start Rapid")
         var abi = [{"inputs":[{"internalType":"address","name":"shoefyContract_","type":"address"},{"internalType":"string[]","name":"categories_","type":"string[]"},{"internalType":"uint256[]","name":"totalGeneralNFTs","type":"uint256[]"},{"internalType":"uint256[]","name":"totalRapidNFTs","type":"uint256[]"},{"internalType":"uint256[]","name":"generalFarmTimes_","type":"uint256[]"},{"internalType":"uint256[]","name":"rapidFarmtimes_","type":"uint256[]"},{"internalType":"uint256[]","name":"generalTokensRequired_","type":"uint256[]"},{"internalType":"uint256[]","name":"rapidTokensRequired_","type":"uint256[]"},{"internalType":"address","name":"_signerAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"bytes32","name":"","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"GeneralNFTFarmed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"bytes32","name":"","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"RapidNFTFarmed","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmCategory","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"category_","type":"bytes32"},{"internalType":"uint256","name":"farmAmount_","type":"uint256"}],"name":"farmGeneral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmHarvested","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"category_","type":"bytes32"},{"internalType":"uint256","name":"farmAmount_","type":"uint256"}],"name":"farmRapid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmType","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"generalFarm","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalFarmTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalFarmsLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalTokensRequired","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"farmIds_","type":"uint256[]"},{"internalType":"bytes[]","name":"signatures_","type":"bytes[]"}],"name":"harvestGeneral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"farmIds_","type":"uint256[]"},{"internalType":"bytes[]","name":"signatures_","type":"bytes[]"}],"name":"harvestRapid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rapidFarm","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidFarmTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidFarmsLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidTokensRequired","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"signerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"totalLayers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_signerAddress","type":"address"}],"name":"updateSignerAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"userFarmLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
      // myContract.events.GeneralNFTFarmed({})
         const web3 = new Web3('wss://rinkeby.infura.io/ws/v3/492fcc4da38f4eab99b315e2dfc3ae7d')
         const contract =  new web3.eth.Contract((abi), '0x0Ab58257c7e876afbf67848b75ff77ea718842E8')
         
        // Rapid Farm
        contract.events.RapidNFTFarmed(function (error, event) {
        if (error) {
            return error;
        } 
        }).on('data', function (data) {
            var type;
            console.log(data.returnValues);
            type = determineType(data.returnValues[1])
            var query = {categoryName: type.toLowerCase()};
            var nextUpdatedTimestamp = Date.now();
            nextUpdatedTimestamp = nextUpdatedTimestamp + (20 * 86400000);

            let index = parseInt(randomNumber(0, category[0].availableNFTs.length)); 
            let indexNum = category[0].availableNFTs[index];

            if(index == category[0].availableNFTs.length-1){
                category[0].availableNFTs.pop();
            }else{
                category[0].availableNFTs[index] = category[0].availableNFTs.pop()
            }

        CategoryDetailModel.find(query).then(category => {
            var farm = new Farm (
            { 
                userAddress: data.returnValues[0],
                categoryName: type,
                categoryBytes: data.returnValues[1],
                farmId: data.returnValues[2],
                typeNFT: "rapid",
                mintStatus: "Pending",
                assignedNFT: indexNum,
                nextUpdatedTimestamp: nextUpdatedTimestamp,
            });

        counter = category[0].counterNFT

                //Save book.assignedNFT
                farm.save(function (err) {
                    if (err) { console.log("error:",err); }
                    console.log("saved Successfully with farm ID:", data.returnValues[2]);
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
            });
        });           

    console.log("end");
    await new Promise(resolve =>  {
        setTimeout(()=> resolve), 9000000000000});
  
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 9000000000000)
    });
    console.log("yeah")
    } catch (err) {
        //throw error in json response with status 500. 
        console.log("error", err);
        return;
    }
 };






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