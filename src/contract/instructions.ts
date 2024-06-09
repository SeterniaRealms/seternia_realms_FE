import { TransactionInstruction,PublicKey } from "@solana/web3.js";

import { type Provider ,Program ,Idl} from '@coral-xyz/anchor';
import * as instructions from "./types";
import { SeterniaIdl ,type Seternia,SimpleMintIdl,type SimpleMint } from '../program';

const programId = new PublicKey('7fHyCXb2goZ8cGDm8CqY9rogsZm4FySD2QSznEUJHZvb');

const programIdS = new PublicKey('FthD8b6h9o9FMhVw9LW9kcHn8RyGo9KUW7aVpdJNhZxX');


export const getProgram = (provider: Provider) => new Program(
    SeterniaIdl as Idl,
    programId,
    provider,
) as unknown as Program<Seternia>;

export const getProgramS = (provider: Provider) => new Program(
    SimpleMintIdl as Idl,
    programIdS,
    provider,
) as unknown as Program<SimpleMint>;

export async function active(
    accounts: instructions.ActiveAccount,
    provider: Provider
): Promise<TransactionInstruction> {
    const seterniaProgram = getProgram(provider);
    const ix = await seterniaProgram.methods.active()
        .accountsStrict({
            payer: accounts.payer,
            treasure: accounts.treasure,
            race: accounts.race,
            traits: accounts.traits,
            dataMint: accounts.dataMint,
            mint: accounts.mint,
            associated: accounts.associated,
            metadata: accounts.metadata,
            associatedTokenProgram: accounts.associatedTokenProgram,
            rent: accounts.rent,
            systemProgram: accounts.systemProgram,
            tokenProgram: accounts.tokenProgram,
            metadataProgram: accounts.metadataProgram,
        }).instruction();
    return ix;
}
export async function mint(
    args: instructions.MintNFTArgs,
    accounts: instructions.MintNFTAccount,
    provider: Provider
): Promise<TransactionInstruction> {
    const seterniaProgram = getProgram(provider);
    const ix = await seterniaProgram.methods.mint(
        args.id,
        args.is_nft,
        args.bump
    ).accountsStrict({
            payer: accounts.payer,
            treasure: accounts.treasure,
            adminAtaDestination:accounts.adminAtaDestination,
            faction: accounts.faction,
            class: accounts.class,
            race:accounts.race,
            traits: accounts.traits,
            mint: accounts.mint,
            collectionMint: accounts.collectionMint,
            runeMint: accounts.runeMint,
            tokenAccount: accounts.tokenAccount,
            runeAccont: accounts.runeAccount,
            masterEditionAccount: accounts.masterEditionAccount,
            collectionMasterEdition: accounts.collectionMasterEdition,
            nftMetadata: accounts.nftMetadata,
            collectionMetadata: accounts.collectionMetadata,
            runeMetadata: accounts.runeMetadata,
            delegate: accounts.delegate,
            associatedTokenProgram: accounts.associatedTokenProgram,
            rent: accounts.rent,
            systemProgram: accounts.systemProgram,
            tokenProgram: accounts.tokenProgram,
            metadataProgram: accounts.metadataProgram
        }).instruction();
    return ix;
}
export async function smint(
    args: instructions.SimpleMintNFTArgs,
    accounts: instructions.MintSimpleNFTAccount,
    provider: Provider
): Promise<TransactionInstruction> {
    const simpleProgram = getProgramS(provider);
    const ix = await simpleProgram.methods.mint(
        args.id,
        args.bump
    ).accountsStrict({
            payer: accounts.payer,
            treasure: accounts.treasure,
            mint: accounts.mint,
            collectionMint: accounts.collectionMint,
            tokenAccount: accounts.tokenAccount,
            masterEditionAccount: accounts.masterEditionAccount,
            collectionMasterEdition: accounts.collectionMasterEdition,
            nftMetadata: accounts.nftMetadata,
            collectionMetadata: accounts.collectionMetadata,
            delegate: accounts.delegate,
            associatedTokenProgram: accounts.associatedTokenProgram,
            rent: accounts.rent,
            systemProgram: accounts.systemProgram,
            tokenProgram: accounts.tokenProgram,
            metadataProgram: accounts.metadataProgram
        }).instruction();
    return ix;
}