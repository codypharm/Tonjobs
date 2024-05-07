import { mnemonicToWalletKey } from "ton-crypto";
import { TonClient, WalletContractV4 } from "ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";

import { Address, OpenedContract, fromNano, toNano } from "ton-core";
import config from "../config";
import { Organisation } from "../../../contract/wrappers/Organisation";

export async function verifyClaim(id: number, user: Address) {
  const mnemonic = `${process.env.MNEMONIC}`;
  const key = await mnemonicToWalletKey(mnemonic.split(" "));
  const wallet = WalletContractV4.create({
    publicKey: key.publicKey,
    workchain: 0,
  });

  const endpoint = await getHttpEndpoint({ network: "testnet" });
  const client = new TonClient({ endpoint });

  if (await client.isContractDeployed(wallet.address)) {
    console.log(await client.getBalance(wallet.address));
    // return console.log("wallet deployed");
  }
  const walletContract = client.open(wallet);
  const seqno = await walletContract.getSeqno();

  const contract = Organisation.fromAddress(
    Address.parse("EQDi7HR8NxcHIHonz85O6WGqec_T6Vh2geI7WLQZNI6Ta0_R") // replaCE  with actuall address
  );
  //@ts-ignore
  const orgContract = client.open(contract) as OpenedContract<Organisation>;
  //@ts-ignore
  const charge = Number(await orgContract?.getCharge());
  //@ts-ignore
  await orgContract?.send(
    wallet,
    {
      value: toNano("0.02"),
    },
    {
      $$type: "VerifyJobClaim",
      issueId: BigInt(id),
      completedBy: user,
    }
  );

  return true;
}
