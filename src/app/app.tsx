"use client";
import { Select, Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import * as React from 'react';
import { usePioneer } from "@coinmasters/pioneer-react"
import { availableChainsByWallet, WalletOption } from '@coinmasters/types';
import { useState, useEffect } from 'react';
import { useOnStartApp } from "../utils/onStart";
import Drawr from '../components/drawer';
import Leaderboard from '../components/leaderboard';

//components
import {
  Swap,
} from '@coinmasters/pioneer-lib';
import Image from 'next/image';

export default function App() {
  const onStartApp = useOnStartApp();
  const { state } = usePioneer();
  const { api, app, assets, context, wallets } = state;
  const [intent, setIntent] = useState('basic');
  const [tabIndex, setTabIndex] = useState(1);
  const [txHash, setTxHash] = useState();
  const [selectedAsset, setSelectedAsset] = useState({ });
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleDrawer = () => setIsOpen(!isOpen);
  // const toggleShowAll = () => setShowAll(!showAll);
  const connectWallet = (walletType: any) => {
    console.log('Connecting to wallet type:', walletType);
    // Implement your wallet connection logic here
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
        <button onClick={toggleDrawer}>Connect Wallet</button>
        <Drawr
            isOpen={isOpen}
            onClose={toggleDrawer}
            wallets={wallets}
            context={context}
            connectWallet={connectWallet}
        />
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
              <TabPanel><Leaderboard></Leaderboard></TabPanel>
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
