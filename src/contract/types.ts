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

export type Race = {
  value: BN;
  token: PublicKey;
  class: PublicKey;
  limit: BN;
  current: BN;
  name: string;
}

export type Traits = {
  race: PublicKey;
  level: BN;
  coins: BN;
  uri: string;
}

export type MintData = {
  attributes: PublicKey;
  race: PublicKey;
  traits: PublicKey;
  mint: PublicKey;
  season: BN;
  level: BN;
}

export type ClassList = {
  factionData: PublicKey[];
}

export type SimpleMintNFTArgs = {
    id:BN,
    bump:number
  }
  export type MintNFTArgs = {
    id:BN,
    is_nft:boolean,
    bump:number
  }
  export interface MintNFTAccount {
    payer: PublicKey;
    treasure: PublicKey;
    adminAtaDestination:PublicKey;
    faction: PublicKey;
    class: PublicKey;
    race:PublicKey;
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
    race: PublicKey;
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