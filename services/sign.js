const Web3 = require('web3');

// const Rpc = config.eth.rpc || null;
// const web3 = new Web3(Rpc);
const web3 = new Web3();

exports.getmessageHash = function (userAddress, farmId, nftNumber) {
  const data = web3.utils.soliditySha3(userAddress, farmId, nftNumber);
  return data;
};

exports.signMessage = function (msgHash, adminAddress, adminKey) {
  web3.eth.defaultAccount = adminAddress;
  const signObj = web3.eth.accounts.sign(msgHash, adminKey);
  return signObj;
};


