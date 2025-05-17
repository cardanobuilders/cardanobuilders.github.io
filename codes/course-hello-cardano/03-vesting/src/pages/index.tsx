import {
  applyParamsToScript,
  Asset,
  BlockfrostProvider,
  deserializeAddress,
  mConStr0,
  MeshTxBuilder,
  MeshWallet,
  serializePlutusScript,
} from "@meshsdk/core";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import blueprint from "../aiken-workspace/plutus.json";

// Set up the blockchain provider with your key
const provider = new BlockfrostProvider("YOUR_KEY_HERE");

const appWallet = [
  "access",
  "spawn",
  "taxi",
  "prefer",
  "fortune",
  "sword",
  "nerve",
  "price",
  "valid",
  "panther",
  "sure",
  "hello",
  "layer",
  "try",
  "grace",
  "seven",
  "fossil",
  "voice",
  "tobacco",
  "circle",
  "measure",
  "solar",
  "pride",
  "together",
];

export default function Home() {
  const { wallet, connected } = useWallet();

  function getScriptAddress() {
    const scriptCbor = applyParamsToScript(
      blueprint.validators[0]!.compiledCode,
      []
    );

    const { address } = serializePlutusScript({
      code: scriptCbor,
      version: "V3",
    });
    return address;
  }

  async function depositTx(
    amount: Asset[],
    lockUntilTimeStampMs: number,
    beneficiaryAddress: string
  ) {
    const scriptAddress = getScriptAddress();

    // app wallet
    const wallet = new MeshWallet({
      networkId: 0,
      key: {
        type: "mnemonic",
        words: appWallet,
      },
      fetcher: provider,
      submitter: provider,
    });

    const utxos = await wallet.getUtxos();
    const changeAddress = await wallet.getChangeAddress();

    const { pubKeyHash: ownerPubKeyHash } = deserializeAddress(changeAddress);
    const { pubKeyHash: beneficiaryPubKeyHash } =
      deserializeAddress(beneficiaryAddress);

    // create transaction
    const txBuilder = new MeshTxBuilder({
      fetcher: provider,
      verbose: true,
    });

    const unsignedTx = await txBuilder
      .txOut(scriptAddress, amount)
      .txOutInlineDatumValue(
        mConStr0([lockUntilTimeStampMs, ownerPubKeyHash, beneficiaryPubKeyHash])
      )
      .changeAddress(changeAddress)
      .selectUtxosFrom(utxos)
      .complete();

    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("Transaction hash:", txHash);
  }

  async function deposit() {
    if (connected) {
      const beneficiaryAddress = await wallet.getChangeAddress();
      const lovelaceAmount = "2000000";

      const assets: Asset[] = [
        {
          unit: "lovelace",
          quantity: lovelaceAmount,
        },
      ];

      const lockUntilTimeStamp = new Date();
      lockUntilTimeStamp.setMinutes(lockUntilTimeStamp.getMinutes() + 1);

      await depositTx(assets, lockUntilTimeStamp.getTime(), beneficiaryAddress);
    }
  }

  async function withdraw() {
    if (connected) {
      const inputs = await wallet.getUtxos();
      const changeAddress = await wallet.getChangeAddress();
    }
  }

  return (
    <div>
      <CardanoWallet isDark={true} />
      <button onClick={() => deposit()}>Deposit</button> |{" "}
      <button onClick={() => withdraw()}>Withdraw</button>
    </div>
  );
}
