const MyContract = require("../contracts/MyContract");
const Web3 = require('web3');
const fs = require("fs");

/**
 * Book List.
 * 
 * @returns {Object}
 */
 exports.BSClistener = 
	async function () {
		try {
            var abi = [{"inputs":[{"internalType":"address","name":"shoefyContract_","type":"address"},{"internalType":"string[]","name":"categories_","type":"string[]"},{"internalType":"uint256[]","name":"totalGeneralNFTs","type":"uint256[]"},{"internalType":"uint256[]","name":"totalRapidNFTs","type":"uint256[]"},{"internalType":"uint256[]","name":"generalFarmTimes_","type":"uint256[]"},{"internalType":"uint256[]","name":"rapidFarmtimes_","type":"uint256[]"},{"internalType":"uint256[]","name":"generalTokensRequired_","type":"uint256[]"},{"internalType":"uint256[]","name":"rapidTokensRequired_","type":"uint256[]"},{"internalType":"address","name":"_signerAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"bytes32","name":"","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"GeneralNFTFarmed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"bytes32","name":"","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"RapidNFTFarmed","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmCategory","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"category_","type":"bytes32"},{"internalType":"uint256","name":"farmAmount_","type":"uint256"}],"name":"farmGeneral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmHarvested","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"category_","type":"bytes32"},{"internalType":"uint256","name":"farmAmount_","type":"uint256"}],"name":"farmRapid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farmType","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"generalFarm","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalFarmTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalFarmsLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"generalTokensRequired","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"farmIds_","type":"uint256[]"},{"internalType":"bytes[]","name":"signatures_","type":"bytes[]"}],"name":"harvestGeneral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"farmIds_","type":"uint256[]"},{"internalType":"bytes[]","name":"signatures_","type":"bytes[]"}],"name":"harvestRapid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rapidFarm","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidFarmTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidFarmsLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rapidTokensRequired","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"signerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"totalLayers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_signerAddress","type":"address"}],"name":"updateSignerAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"userFarmLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
         // myContract.events.GeneralNFTFarmed({})
            const web3 = new Web3('https://ropsten.infura.io/v3/492fcc4da38f4eab99b315e2dfc3ae7d')
            const contract =  new web3.eth.Contract((abi), '0xdd923c4e1F325D8bD5454B70759eeffa62DB8eBd')    
            await contract.events.GeneralNFTFarmed()
            .on('data', (event) => {
                console.log("Got Event on fantom:"+event)
                if (event.returnValues.to) {
                    to = event.returnValues.to
                    from = event.returnValues.from
                    amount = event.returnValues.value

                    if (to == 0x0) {
                    //    tranferTrx.transfer(from, amount)
                    }
                    else {
                        console.log("Ignore other adress other than address(0)")
                    }
                }
            })
            .on('error', console.error);

		} catch (err) {
			//throw error in json response with status 500. 
            console.log("error", err);
			return;
		}
	};