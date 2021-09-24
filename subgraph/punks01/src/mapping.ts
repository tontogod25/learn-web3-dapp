import {BigInt} from '@graphprotocol/graph-ts';

import {Assign as AssignEvent} from '../generated/punks/punks';
import {Account, Punk} from '../generated/schema';

// event Assign(address indexed to, uint256 punkIndex);
export function handleAssign(event: AssignEvent): void {
  let account = Account.load(event.params.to.toHexString());
  if (account == null) {
    account = new Account(event.params.to.toHexString());
    account.id = event.params.to.toHexString();
    account.numberOfPunksOwned = BigInt.fromI32(1);
  } else {
    account.numberOfPunksOwned ==
      account.numberOfPunksOwned.plus(BigInt.fromI32(1));
  }
  account.LastMvtAt = event.block.timestamp;
  account.save();

  let punk = Punk.load(event.params.punkIndex.toHexString());
  if (punk == null) {
    punk = new Punk(event.params.punkIndex.toHexString());
    punk.id = event.params.punkIndex.toHexString();
    punk.owner = event.params.to.toHexString();
  } else {
    punk.owner = event.params.to.toHexString();
  }
  punk.LastAssignAt = event.block.timestamp;
  punk.save();
}
