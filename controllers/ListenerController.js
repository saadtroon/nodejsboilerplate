const MyContract = require("../contracts/MyContract");
const Web3 = require('web3');
const fs = require("fs");
const Farm = require("../models/FarmModel");

/**
 * Book List.
 * 
 * @returns {Object}
 */
 exports.eventListener = 
	async function () {
		try {
            console.log("start")
            var abi = [{"inputs":[{"internalType":"address","name":"shoefyContract_","type":"address"},{"internalType":"string[]","name":"categories_","type":"string[]"},{"internalType":"uint256[]","name":"totalGeneralNFTs","type":"uint256[]"},{"internalType":"uint256[]","name":"totalRapidNFTs","type":"uint256[]"},{"internalType":"uint256[]","name":"generalFarmTimes_","type":"uint256[]"},{"internalType":"uint256[]","name":"rapidFarmtimes_","type":"uint256[]"},{"internalType":"uint256[]","name":"generalTokensRequired_","type":"uint256[]"},{"internalType":"uint256[]","name":"rapidTokensRequired_","type":"uint256[]"},{"internalType":"address","name":"_signerAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"bytes32","name":"","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"GeneralNFTFarmed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"bytes32","name":"","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"RapidNFTFarmed","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmCategory","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"category_","type":"bytes32"},{"internalType":"uint256","name":"farmAmount_","type":"uint256"}],"name":"farmGeneral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmHarvested","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"category_","type":"bytes32"},{"internalType":"uint256","name":"farmAmount_","type":"uint256"}],"name":"farmRapid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmType","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"generalFarm","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalFarmTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalFarmsLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalTokensRequired","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"farmIds_","type":"uint256[]"},{"internalType":"bytes[]","name":"signatures_","type":"bytes[]"}],"name":"harvestGeneral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"farmIds_","type":"uint256[]"},{"internalType":"bytes[]","name":"signatures_","type":"bytes[]"}],"name":"harvestRapid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rapidFarm","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidFarmTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidFarmsLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidTokensRequired","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"signerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"totalLayers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_signerAddress","type":"address"}],"name":"updateSignerAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"userFarmLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
         // myContract.events.GeneralNFTFarmed({})
            const web3 = new Web3('wss://rinkeby.infura.io/ws/v3/492fcc4da38f4eab99b315e2dfc3ae7d')
            const contract =  new web3.eth.Contract((abi), '0x0Ab58257c7e876afbf67848b75ff77ea718842E8')
            
            // Gemeral Farm
            contract.events.GeneralNFTFarmed(function (error, event) {
                if (error) {
                    return error;
                } 
            }).on('data', function (data) {
                var farm = new Farm(
                    { userAddress: data.returnValues[0],
                        category: data.returnValues[1],
                        farmId: data.returnValues[2],
                        NFTType: "general"
                    });
                    //Save book.
                    farm.save(function (err) {
                        if (err) { console.log("error:",err); }
                        console.log("saved Successfully with farm ID:", data.returnValues[2])
                    });
            })

        console.log("end");
        await new Promise(resolve =>  {
            setTimeout(()=> resolve), 2000000});
      
        let promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve("done!"), 1000)
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
        var farm = new Farm(
        { 
            userAddress: data.returnValues[0],
            category: data.returnValues[1],
            farmId: data.returnValues[2],
            NFTType: "rapid"
        });
        //Save book.
        farm.save(function (err) {
        if (err) { console.log("error:",err); }
        console.log("saved Successfully with farm ID:", data.returnValues[2])
        });
        })
            

     console.log("end");
     await new Promise(resolve =>  {
         setTimeout(()=> resolve), 2000000});
   
     let promise = new Promise((resolve, reject) => {
       setTimeout(() => resolve("done!"), 1000)
     });
     console.log("yeah")
     } catch (err) {
         //throw error in json response with status 500. 
         console.log("error", err);
         return;
     }
 };
