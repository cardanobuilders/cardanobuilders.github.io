import blueprint from "./plutus.json"


import { ScriptHash, MintingBlueprint, SpendingBlueprint, PolicyId, ConStr0, ConStr1, WithdrawalBlueprint } from "@meshsdk/core"





const version = "V3"
const networkId = 0; // 0 for testnet; 1 for mainnet
// Every spending validator would compile into an address with an staking key hash
// Recommend replace with your own stake key / script hash
const stakeKeyHash = ""
const isStakeScriptCredential = false

export class MintingLogicsDelegatedMintBlueprint extends MintingBlueprint {
  compiledCode: string

  constructor(params: [any]) {
    const compiledCode = blueprint.validators[0]!.compiledCode;
    super(version);
    this.compiledCode = compiledCode
    this.paramScript(compiledCode,  params, "JSON")
  }

   params = (data: [any]): [any] => data
}




export class SpendingLogicsDelegatedSpendBlueprint extends SpendingBlueprint {
  compiledCode: string

  constructor(params: [any]) {
    const compiledCode = blueprint.validators[2]!.compiledCode;
    super(version, networkId, stakeKeyHash, isStakeScriptCredential);
    this.compiledCode = compiledCode
    this.paramScript(compiledCode,  params, "JSON")
  }

   params = (data: [any]): [any] => data
   datum = (data: Data): Data => data
   redeemer = (data: Data): Data => data
}




export class ComplexWithdrawalContractWithdrawBlueprint extends WithdrawalBlueprint {
  compiledCode: string

  constructor(params: [any]) {
    const compiledCode = blueprint.validators[4]!.compiledCode;
    super(version, networkId);
    this.compiledCode = compiledCode
    this.paramScript(compiledCode,  params, "JSON")
  }

   params = (data: [any]): [any] => data
}


export class ComplexWithdrawalContractPublishBlueprint extends WithdrawalBlueprint {
  compiledCode: string

  constructor(params: [any]) {
    const compiledCode = blueprint.validators[5]!.compiledCode;
    super(version, networkId);
    this.compiledCode = compiledCode
    this.paramScript(compiledCode,  params, "JSON")
  }

   params = (data: [any]): [any] => data
}







export type ScriptHash = any;

export type Data = any;

export type PolicyId = any;

export type MyRedeemer = ContinueCounting | StopCounting;

export type ContinueCounting = ConStr0<[]>;

export type StopCounting = ConStr1<[]>;


