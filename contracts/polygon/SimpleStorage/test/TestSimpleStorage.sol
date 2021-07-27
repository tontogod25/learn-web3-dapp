// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleStorage.sol";

contract TestSimpleStorage {

  function testInitialStoredDataUsingDeployedContract() public {
    SimpleStorage store = SimpleStorage(DeployedAddresses.SimpleStorage());

    Assert.equal(store.get(), 0, "storedData should be 0 initially");
  }

  function testSettingStoredData() public {
    SimpleStorage store = new SimpleStorage();

    uint expected = 10000;

    store.set(expected);

    Assert.equal(store.get(), expected, "storedData should equal 10000");
  }

}
