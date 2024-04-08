import { AnchorWallet } from "@solana/wallet-adapter-react"
import { ComputeBudgetProgram, Connection, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js"
import { TOKEN_PROGRAM_ID,ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token';
import { AnchorProvider, setProvider } from "@coral-xyz/anchor"
import { Faction, Treasure,STreasure } from "./types"
import { active,mint,smint,getProgram, getProgramS } from "./instructions"
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js"
import BN from "bn.js";
const info = {
  TOKEN_METADATA_PROGRAM_ID: new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"),
  RuneKey: new PublicKey("11111111111111111111111111111111"),
}

export const MintTx = async (
  wallet: AnchorWallet,
  connection: Connection,
  fid:BN,
  cid:BN,
  tid:BN
) => {
  var pass = false;
  // check the connection
  if (!wallet.publicKey || !connection) {
    console.log("Warning: Wallet not connected")
    return
  }
  // set Provider
  const provider = new AnchorProvider(connection,wallet,{});
  setProvider(provider)
  const program = await getProgram(provider);

  const [TreasuryKey,bump] = await PublicKey.findProgramAddress(
    [Buffer.from("TRESURE_SEED")],
    program.programId
  );
  const treasury_data = await program.account.treasure.fetch(TreasuryKey) as Treasure;

  const [FactionKey] = await PublicKey.findProgramAddress(
    [Buffer.from("FACTION_SEED"),Buffer.from(fid.toArray("le", 8))],
    program.programId
  );
  const FactionKeyinfo = await connection.getAccountInfo(FactionKey)
  if (FactionKeyinfo == null) {
    console.log("New NFT FactionKey does not exist", FactionKey)
    return
  }

  const faction_data = await program.account.faction.fetch(FactionKey) as Faction;
  const id =  faction_data.members.add(new BN(1));

  const [ClassKey] = await PublicKey.findProgramAddress(
    [FactionKey.toBuffer(),Buffer.from(cid.toArray("le", 8))],
    program.programId
  );
  const ClassKeyinfo = await connection.getAccountInfo(ClassKey)
  if (ClassKeyinfo == null) {
    console.log("New NFT ClassKey does not exist")
    return
  }

  const [TraitKey] = await PublicKey.findProgramAddress(
    [ClassKey.toBuffer(),Buffer.from(tid.toArray("le", 8))],
    program.programId
  );
  const TraitKeyinfo = await connection.getAccountInfo(TraitKey)
  if (TraitKeyinfo == null) {
    console.log("New NFT TraitKey does not exist")
    return
  }

  const [CollectionKey] = await PublicKey.findProgramAddress(
    [Buffer.from("collection")],
    program.programId
  );
  const [CmetadataAddress] = await PublicKey.findProgramAddress(
    [Buffer.from("metadata"),info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),CollectionKey.toBuffer()],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const [CmasterEdition] = await PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      CollectionKey.toBuffer(),
      Buffer.from("edition")
    ],
    info.TOKEN_METADATA_PROGRAM_ID
  );

  const [MintKey] = await PublicKey.findProgramAddress(
    [Buffer.from("mint"),Buffer.from(id.toArray("le", 8))],
    program.programId
  );
  const [MintDataKey] = await PublicKey.findProgramAddress(
    [MintKey.toBuffer()],
    program.programId
  );
  const [metadataAddress] = await PublicKey.findProgramAddress(
    [Buffer.from("metadata"),info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),MintKey.toBuffer()],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const [masterEdition] = await PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      MintKey.toBuffer(),
      Buffer.from("edition")
    ],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const [delegate] = await PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      CollectionKey.toBuffer(),
      Buffer.from("collection_authority"),
      TreasuryKey.toBuffer()
    ],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const MintTokenAccount = await getAssociatedTokenAddress(
    MintKey,
    wallet.publicKey
  );
  try {
    // validate nft
    var metaplex = new Metaplex(connection).use(walletAdapterIdentity(wallet))
    const nfts = await metaplex.nfts().findAllByOwner({ owner: wallet.publicKey })
    let cump_limit = ComputeBudgetProgram.setComputeUnitLimit({ units: 800_000 });
    if (nfts != null) {
      console.log("r ",treasury_data.runeCollection.toString())
      nfts.forEach(async nft => {
        console.log(nft.address.toString())
        if (
          nft.collection?.verified != null 
          && nft.collection?.verified == true
          && nft.collection?.address.toString() == treasury_data.runeCollection.toString()) {
            info.RuneKey = nft.address
        }
      });
      
      const nft_addr = await metaplex.nfts().findByMetadata({metadata: info.RuneKey});
      info.RuneKey = nft_addr.address;
      if (info.RuneKey != new PublicKey("11111111111111111111111111111111")){
        const tx = new Transaction()
        const RuneTokenAccount = await getAssociatedTokenAddress(
          info.RuneKey,
          wallet.publicKey
        );
        const [RmetadataAddress] = await PublicKey.findProgramAddress(
          [Buffer.from("metadata"),info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),info.RuneKey.toBuffer()],
          info.TOKEN_METADATA_PROGRAM_ID
        );
        console.log("burn: ",info.RuneKey.toString(), "to id: ",id)
        const mint_ix = await mint(
          { id,bump },
          {
            payer:wallet.publicKey,
            treasure:TreasuryKey,
            faction:FactionKey,
            class:ClassKey,
            traits:TraitKey,
            mint:MintKey,
            collectionMint:CollectionKey,
            runeMint:info.RuneKey,
            tokenAccount:MintTokenAccount,
            runeAccount:RuneTokenAccount,
            masterEditionAccount:masterEdition,
            collectionMasterEdition:CmasterEdition,
            nftMetadata:metadataAddress,
            collectionMetadata:CmetadataAddress,
            runeMetadata:RmetadataAddress,
            delegate:delegate,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            metadataProgram: info.TOKEN_METADATA_PROGRAM_ID,
          },
          provider
        );
        const active_ix = await active(
          {
            payer:wallet.publicKey,
            treasure:TreasuryKey,
            class:ClassKey,
            traits:TraitKey,
            dataMint:MintDataKey,
            mint:MintKey,
            associated:MintTokenAccount,
            metadata:metadataAddress,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            metadataProgram: info.TOKEN_METADATA_PROGRAM_ID,
          },
          provider
        );
        tx.add(mint_ix).add(active_ix).add(cump_limit);
        try {
          tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
          tx.feePayer = wallet.publicKey
          if (wallet.signTransaction) {
            const signedTx = await wallet.signTransaction(tx)
            const sTx = signedTx.serialize()
            const signature = await connection.sendRawTransaction(sTx, { skipPreflight: false })

            const blockhash = await connection.getLatestBlockhash()
            await connection.confirmTransaction({
              signature,
              blockhash: blockhash.blockhash,
              lastValidBlockHeight: blockhash.lastValidBlockHeight
            }, "processed");
            pass = true;
            alert(`Successfully Mint NFT.\n Signature: ${signature}`)
            console.log("Successfully Mint NFT.\n Signature: ", signature);
          }
        } catch (error) {
          console.log("Error in Mint NFT  trasnaction", error)
        }
      }else{
        console.log("no nft address..")
      }
    }else{
      console.log("nft não encontrada")
    }
  } catch (error) {
    console.log("NFT address is incorrect", error)
  }
  return pass
}
export const SMintTx = async (
  wallet: AnchorWallet,
  connection: Connection,
) => {
  var pass = false;
  // check the connection
  if (!wallet.publicKey || !connection) {
    console.log("Warning: Wallet not connected")
    return
  }
  // set Provider
  const provider = new AnchorProvider(connection,wallet,{});
  setProvider(provider)
  const program = await getProgramS(provider);

  const [TreasuryKey,bump] = await PublicKey.findProgramAddress(
    [Buffer.from("TRESURE_SEED")],
    program.programId
  );
  const treasury_data = await program.account.treasure.fetch(TreasuryKey) as STreasure;
  const id = treasury_data.mints.add(new BN(1));

  const [CollectionKey] = await PublicKey.findProgramAddress(
    [Buffer.from("collection")],
    program.programId
  );
  const [CmetadataAddress] = await PublicKey.findProgramAddress(
    [Buffer.from("metadata"),info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),CollectionKey.toBuffer()],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const [CmasterEdition] = await PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      CollectionKey.toBuffer(),
      Buffer.from("edition")
    ],
    info.TOKEN_METADATA_PROGRAM_ID
  );

  const [MintKey] = await PublicKey.findProgramAddress(
    [Buffer.from("mint"),Buffer.from(id.toArray("le", 8))],
    program.programId
  );
  const [metadataAddress] = await PublicKey.findProgramAddress(
    [Buffer.from("metadata"),info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),MintKey.toBuffer()],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const [masterEdition] = await PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      MintKey.toBuffer(),
      Buffer.from("edition")
    ],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const [delegate] = await PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      CollectionKey.toBuffer(),
      Buffer.from("collection_authority"),
      TreasuryKey.toBuffer()
    ],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const MintTokenAccount = await getAssociatedTokenAddress(
    MintKey,
    wallet.publicKey
  );
  try {
    const tx = new Transaction()
    const mint_ix = await smint(
      { id,bump },
      {
        payer:wallet.publicKey,
        treasure:TreasuryKey,
        mint:MintKey,
        collectionMint:CollectionKey,
        tokenAccount:MintTokenAccount,
        masterEditionAccount:masterEdition,
        collectionMasterEdition:CmasterEdition,
        nftMetadata:metadataAddress,
        collectionMetadata:CmetadataAddress,
        delegate:delegate,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        metadataProgram: info.TOKEN_METADATA_PROGRAM_ID,
      },
      provider
    );
    let cump_limit = ComputeBudgetProgram.setComputeUnitLimit({ units: 800_000 });
    tx.add(mint_ix).add(cump_limit);
    try {
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
      tx.feePayer = wallet.publicKey
      if (wallet.signTransaction) {
        const signedTx = await wallet.signTransaction(tx)
        const sTx = signedTx.serialize()
        const signature = await connection.sendRawTransaction(sTx, { skipPreflight: false })

        const blockhash = await connection.getLatestBlockhash()
        await connection.confirmTransaction({
          signature,
          blockhash: blockhash.blockhash,
          lastValidBlockHeight: blockhash.lastValidBlockHeight
        }, "processed");
        pass = true;
          alert(`Successfully Mint NFT.\n Signature: ${signature}`)
        console.log("Successfully Mint NFT.\n Signature: ", signature);
      }
    } catch (error) {
      console.log("Error in Mint NFT trasnaction", error)
    }
  } catch (error) {
    console.log("NFT address is incorrect", error)
  }
  return pass
}
