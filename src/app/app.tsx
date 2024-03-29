"use client";
import { Select, Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import * as React from 'react';
import { usePioneer } from "@coinmasters/pioneer-react"
import { availableChainsByWallet, WalletOption } from '@coinmasters/types';
import { useState, useEffect } from 'react';
//components
import {
  Pioneer,
  Basic,
  Portfolio,
  Transfer,
  Assets,
  Asset,
  Amount,
  Quote,
  Quotes,
  Swap,
  Track,
  SignTransaction
} from '@coinmasters/pioneer-lib';
import Image from 'next/image';

export default function App() {
  const { onStart, state } = usePioneer();
  const { api, app, assets, context } = state;
  const [intent, setIntent] = useState('basic');
  const [tabIndex, setTabIndex] = useState(1);
  const [txHash, setTxHash] = useState();
  const [selectedAsset, setSelectedAsset] = useState({ });

  let onStartApp = async function(){
    try{
      let walletsVerbose = []
      const { keepkeyWallet } = await import("@coinmasters/wallet-keepkey");
      //console.log('keepkeyWallet: ', keepkeyWallet);

      const pioneerSetup: any = {
        appName: "Pioneer Template",
        appIcon: "https://pioneers.dev/coins/pioneerMan.png",
      };
      const walletKeepKey = {
        type: WalletOption.KEEPKEY,
        icon: "https://pioneers.dev/coins/keepkey.png",
        chains: availableChainsByWallet[WalletOption.KEEPKEY],
        wallet: keepkeyWallet,
        status: "offline",
        isConnected: false,
      };
      //console.log('walletKeepKey: ', walletKeepKey);
      walletsVerbose.push(walletKeepKey);
      //console.log('walletsVerbose: ', walletsVerbose);
      onStart(walletsVerbose, pioneerSetup);
    }catch(e){
      console.error("Failed to start app!")
    }
  }
  useEffect(() => {
    onStartApp();
  }, []);

  useEffect(() => {
    if(app && app.assetContext) setSelectedAsset(app.assetContext)
  }, [app, app?.assetContext]);

  const handleTabsChange = (index: any) => {
    setTabIndex(index);
  };

  const onClose = () => {
    //console.log("onClose")
  };

  const onSelect = (asset: any) => {
    //console.log("onSelect: ", asset)
  }

  const onAcceptSign = (tx: any) => {
    //console.log("onAcceptSign: ", tx)
  }

  const setInputAmount = (amount: any) => {
    console.log("setInputAmount: ", amount)
  }

  const handleIntentChange = (event: any) => {
    setIntent(event.target.value);
  };


  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center w-full px-10 py-5 bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center gap-4">
          {/* Avatar logo */}
          <Image src="/png/blueMoon.png" alt="Logo" width={60} height={60} className="rounded-full" />
          {/* Website title */}
          <span className="text-xl font-bold">Swaps.PRO</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Tabs
            index={tabIndex}
            onChange={handleTabsChange}
            colorScheme="green"
        >
          <Box bg="black" mx="auto" w="35rem">
            <TabList justifyContent="center">
              <Tab>Trades</Tab>
              <Tab>Swaps</Tab>
              <Tab>Leaderboard</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                Your trade history

                Global trade volume
              </TabPanel>
              <TabPanel>
                <Swap usePioneer={usePioneer}/>
              </TabPanel>
              <TabPanel>Leaderboard</TabPanel>
            </TabPanels>
          </Box>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="w-full px-10 py-5 bg-gray-200 dark:bg-gray-900 text-center">
        Powered by <a href="https://pioneers.dev" target="_blank" rel="noopener noreferrer" className="text-blue-500">Pioneers</a>
      </footer>
    </>
  );
}
