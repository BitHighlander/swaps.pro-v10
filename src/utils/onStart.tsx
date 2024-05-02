// src/utils/onStartApp.tsx
import { usePioneer } from "@coinmasters/pioneer-react";
import { WalletOption, availableChainsByWallet } from '@coinmasters/types';

export const useOnStartApp = () => {
    const { onStart } = usePioneer();

    const onStartApp = async () => {
        try {
            let walletsVerbose = [];
            const { keepkeyWallet } = await import("@coinmasters/wallet-keepkey");

            const pioneerSetup: any = {
                appName: "Swaps.PRO",
                appIcon: "https://pioneers.dev/coins/blueMoon.png",
            };

            const walletKeepKey = {
                type: WalletOption.KEEPKEY,
                icon: "https://pioneers.dev/coins/keepkey.png",
                chains: availableChainsByWallet[WalletOption.KEEPKEY],
                wallet: keepkeyWallet,
                status: "offline",
                isConnected: false,
            };

            const { evmWallet } = await import("@coinmasters/wallet-evm-extensions");
            const walletMetamask = {
                type: "METAMASK", // TODO
                icon: "https://pioneers.dev/coins/evm.png",
                chains: availableChainsByWallet[WalletOption.METAMASK], // TODO
                wallet: evmWallet,
                status: "offline",
                isConnected: false,
            };
            walletsVerbose.push(walletMetamask);

            const { walletconnectWallet } = await import("@coinmasters/wallet-wc");
            const walletWalletConnect = {
                type: WalletOption.WALLETCONNECT,
                icon: "https://pioneers.dev/coins/walletconnect.png",
                chains: availableChainsByWallet[WalletOption.WALLETCONNECT],
                wallet: walletconnectWallet,
                status: "offline",
                isConnected: false,
            };
            walletsVerbose.push(walletWalletConnect);

            walletsVerbose.push(walletKeepKey);
            onStart(walletsVerbose, pioneerSetup);
        } catch (e) {
            console.error("Failed to start app!", e);
        }
    };

    return onStartApp;
};
