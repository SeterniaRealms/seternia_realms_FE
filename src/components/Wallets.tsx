import React, { useEffect, useState } from 'react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { PublicKey, Transaction } from '@solana/web3.js';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { Pages } from '@/presentation/enums/pages';
import { createSignInUsecase } from '@/factories/createSignInUsecase';

interface IBtnWalletConnect {
    wallet: string;
    icon: any;
    onClick: () => void;
}

const login = createSignInUsecase();

const Wallets = ({ wallet, icon, onClick }: IBtnWalletConnect) => {
    const [provider, setProvider] = useState<any | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const router = useRouter();

    async function loginWall(publicKey: string) {
        const loginWallet = await login.execute({ publicKey })
        console.log(loginWallet)
        if (loginWallet)
            void router.push(Pages.START)
        else
            return
    }

    useEffect(() => {
        handleConnect();
    }, [provider]);

    const initializeProvider = async () => {
        const walletProvider = getProvider();
        if (walletProvider) {
            try {
                await walletProvider.connect();
                setProvider(walletProvider);
            } catch (error) {
                setError('Failed to connect to Phantom Wallet. Please try again later.');
                console.error(error);
            }
        }
    };

    const getProvider = (): any | undefined => {
        if ("solana" in window) {
            console.log('found solana extention');
            const provider = (window as any).solana;
            console.log(provider);
            if (provider.isPhantom) {
                return provider;
            }
        }
        console.log('Not found solana extention, install pls');
        window.open("https://phantom.app/", "_blank");
        return undefined;
    };

    const handleConnect = async () => {
        if (!provider) {
            setError('Phantom Wallet extension not found. Please install it.');
            return;
        }

        try {
            const connectValue = await provider.connect({ onlyIfTrusted: true });
            const pbKey = connectValue?.publicKey ?? connectValue;
            loginWall(pbKey)
        } catch (error) {
            setError('Failed to connect to Phantom Wallet. Please try again later.');
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <button
                className='bg-[#5C4539] border mt-3 border-silver hover:bg-yellow-900 hover:scale-95 transition-all tracking-wider w-full flex p-2 rounded-lg gap-4 items-center'
                onClick={initializeProvider}
                disabled={provider !== undefined}
            >
                <Image className='w-8 h-8' width={32} height={32} src={icon} alt={wallet} />
                {wallet}
            </button>
        </div>
    );
};

export default Wallets;
