var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Split = artifacts.require("./Split.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Split);
};
