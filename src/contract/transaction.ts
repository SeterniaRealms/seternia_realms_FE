import { AnchorWallet } from "@solana/wallet-adapter-react"
import { ComputeBudgetProgram, Connection, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js"
import { TOKEN_PROGRAM_ID,ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token';
import { AnchorProvider, setProvider } from "@coral-xyz/anchor"
import { Faction, Race, Treasure, STreasure } from "./types"
import { active,mint,smint,getProgram, getProgramS } from "./instructions";;
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js"
import BN from "bn.js";
import { useSnackbar } from "@/presentation/hook/useSnackbar";
 import { toast } from 'react-toastify';
import Link from "next/link";
const info = {
  TOKEN_METADATA_PROGRAM_ID: new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"),
  RuneKey: new PublicKey("3eDcm2adhJ9KrJtdmh9K6jjoH3UDq2psgWPTcw7fBrZd"),
}

const CustomToastWithLink = (tx) => (
  `<div>
    <Link href='${tx}'>This is a link</Link>
  </div>`
);


// eslint-disable-next-line react-hooks/rules-of-hooks
const { enqueueSnackbar } = useSnackbar();

export const MintTx = async (
  wallet: AnchorWallet,
  connection: Connection,
  is_nft:boolean,
  fid:BN,
  cid:BN,
  rid:BN,
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
  const id = faction_data.members.add(new BN(1));

  const [ClassKey] = await PublicKey.findProgramAddress(
    [FactionKey.toBuffer(),Buffer.from(cid.toArray("le", 8))],
    program.programId
  );
  const ClassKeyinfo = await connection.getAccountInfo(ClassKey)
  if (ClassKeyinfo == null) {
    console.log("New NFT ClassKey does not exist")
    return
  }

  const [RaceKey] = await PublicKey.findProgramAddress(
    [ClassKey.toBuffer(),Buffer.from(rid.toArray("le", 8))],
    program.programId
  );

  const RaceKeyinfo = await connection.getAccountInfo(RaceKey)
  if (RaceKeyinfo == null) {
    console.log("New NFT RaceKey does not exist")
    return
  }
  const race_data = await program.account.race.fetch(RaceKey) as Race;
  const AdminTokenAccount = await getAssociatedTokenAddress(
    race_data.token,
    treasury_data.admin
  );
  const [TraitKey] = await PublicKey.findProgramAddress(
    [RaceKey.toBuffer(),Buffer.from(tid.toArray("le", 8))],
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
  var rmint = info.RuneKey;
  let cump_limit = ComputeBudgetProgram.setComputeUnitLimit({ units: 800_000 });
  if (is_nft == true) {
    try{
      // validate nft
      var metaplex = new Metaplex(connection).use(walletAdapterIdentity(wallet))
      const nfts = await metaplex.nfts().findAllByOwner({ owner: wallet.publicKey })
      if (nfts != null && is_nft == true) {
        const nft_addr = await metaplex.nfts().findByMetadata({metadata: rmint});
        rmint = nft_addr.address;
        console.log("r ",treasury_data.runeCollection.toString())
        nfts.forEach(async nft => {
          console.log(nft.address.toString())
          if (
            nft.collection?.verified != null 
            && nft.collection?.verified == true
            && nft.collection?.address.toString() == treasury_data.runeCollection.toString()) {
              rmint = nft.address
          }
        });
      }
    }catch (error) {
      console.log("Error in Mint NFT trasnaction", error)
    }
  }else if (is_nft == false){
        console.log("ponto")
        const tx = new Transaction()
        var RuneTokenAccount = await getAssociatedTokenAddress(
          rmint,
          wallet.publicKey
        );
        if (!is_nft){
          rmint = race_data.token;
          RuneTokenAccount = await getAssociatedTokenAddress(
            race_data.token,
            wallet.publicKey
          );
        }
        const [RmetadataAddress] = await PublicKey.findProgramAddress(
          [Buffer.from("metadata"),info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),rmint.toBuffer()],
          info.TOKEN_METADATA_PROGRAM_ID
        );
        console.log("burn: ",rmint.toString(), "to id: ",id)
        const mint_ix = await mint(
          { id,is_nft,bump },
          {
            payer:wallet.publicKey,
            treasure:TreasuryKey,
            adminAtaDestination:AdminTokenAccount,
            faction:FactionKey,
            class:ClassKey,
            race:RaceKey,
            traits:TraitKey,
            mint:MintKey,
            collectionMint:CollectionKey,
            runeMint:rmint,
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
            race:RaceKey,
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
            // alert(`Successfully Mint NFT.\n Signature: ${signature}`)
            	enqueueSnackbar(`TX: ${signature}`,{variant: "success"});

            console.log("Successfully Mint NFT.\n Signature: ", signature);
          }
        } catch (error) {
          console.log("Error in Mint NFT  trasnaction", error)
        }
      }else{
        console.log("no nft address..")
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
          // alert(`Successfully Mint NFT.\n Signature: ${signature}`)
            enqueueSnackbar(`TX: ${signature}`,{variant: "success"});

        console.log({
          signature,
          blockhash,
        });
      }
    } catch (error) {
      console.log("Error in Mint NFT trasnaction", error)
    }
  } catch (error) {
    console.log("NFT address is incorrect", error)
  }
  return pass
}
