import { PublicKey } from "@solana/web3.js";
import BN from "bn.js"; 

export type Treasure = {
  admin: PublicKey;
  mainCollection: PublicKey;
  runeCollection: PublicKey;
}
export type STreasure = {
  admin: PublicKey;
  mints: BN;
}
export type Role = {
  addresses: PublicKey[];
}

export type CoinWallet = {
  owner: PublicKey;
  amount: BN;
}

export type Faction = {
  id: BN;
  season: BN;
  coins: BN;
  members: BN;
  distribution: BN;
  classes: BN;
  faction: string;
}

export type Class = {
  faction: PublicKey;
  title: string;
  symbol: string;
  id: BN;
  traits: BN;
}

export type Traits = {
  class: PublicKey;
  level: BN;
  coins: BN;
  uri: string;
}

export type MintData = {
  attributes: PublicKey;
  class: PublicKey;
  traits: PublicKey;
  mint: PublicKey;
  season: BN;
  level: BN;
}

export type ClassList = {
  factionData: PublicKey[];
}

export type MintNFTArgs = {
    id:BN,
    bump:number
  }
  export interface MintNFTAccount {
    payer: PublicKey;
    treasure: PublicKey;
    faction: PublicKey;
    class: PublicKey;
    traits: PublicKey;
    mint: PublicKey;
    collectionMint: PublicKey;
    runeMint: PublicKey;
    tokenAccount: PublicKey;
    runeAccount: PublicKey;
    masterEditionAccount: PublicKey;
    collectionMasterEdition: PublicKey;
    nftMetadata: PublicKey;
    collectionMetadata: PublicKey;
    runeMetadata: PublicKey;
    delegate: PublicKey;
    associatedTokenProgram: PublicKey;
    rent: PublicKey;
    systemProgram: PublicKey;
    tokenProgram: PublicKey;
    metadataProgram: PublicKey;
}

export interface MintSimpleNFTAccount {
  payer: PublicKey;
  treasure: PublicKey;
  mint: PublicKey;
  collectionMint: PublicKey;
  tokenAccount: PublicKey;
  masterEditionAccount: PublicKey;
  collectionMasterEdition: PublicKey;
  nftMetadata: PublicKey;
  collectionMetadata: PublicKey;
  delegate: PublicKey;
  associatedTokenProgram: PublicKey;
  rent: PublicKey;
  systemProgram: PublicKey;
  tokenProgram: PublicKey;
  metadataProgram: PublicKey;
}

export interface ActiveAccount {
    payer: PublicKey;
    treasure: PublicKey;
    class: PublicKey;
    traits: PublicKey;
    dataMint: PublicKey;
    mint: PublicKey;
    associated: PublicKey;
    metadata: PublicKey;
    associatedTokenProgram: PublicKey;
    rent: PublicKey;
    systemProgram: PublicKey;
    tokenProgram: PublicKey;
    metadataProgram: PublicKey;
}