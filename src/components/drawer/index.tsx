import React, { useState, useEffect } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Card,
    Box,
    HStack,
    VStack,
    Text,
    Avatar,
    Badge,
    Button,
} from '@chakra-ui/react';

const Drawr = ({ isOpen, onClose, wallets, context, connectWallet }:any) => {
    // Moved showAll state and toggle function inside the Drawr component
    const [walletsLocal, setWalletsLocal] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const toggleShowAll = () => setShowAll(!showAll);

    useEffect(() => {
        if(wallets && wallets.length > 0)setWalletsLocal(wallets);
    }, [wallets]);

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Wallets</DrawerHeader>
                    <DrawerBody>
                        {!context ? (
                            <Text>You must pair a wallet to continue</Text>
                        ) : (
                            <Text>
                                <small>context: {JSON.stringify(context)}</small>
                            </Text>
                        )}
                        {showAll
                            ? walletsLocal.map((wallet: any) => (
                                <Card key={wallet.type}>
                                    <Box
                                        key={wallet.type}
                                        p={4}
                                        boxShadow="md"
                                        borderRadius="md"
                                        maxW="sm"
                                        w="full"
                                        mt={4}
                                        onClick={() => connectWallet(wallet.type)}
                                        opacity={wallet.wallet.isDetected ? 1 : 0.5}
                                    >
                                        <HStack spacing={4}>
                                            <Avatar src={wallet.icon} name={wallet.type} />
                                            <VStack alignItems="start" spacing={1}>
                                                <Text fontWeight="bold">{wallet.type}</Text>
                                                <HStack spacing={2}>
                                                    {wallet.wallet.isDetected ? (
                                                        <Badge colorScheme="green">AVAILABLE</Badge>
                                                    ) : (
                                                        <Badge colorScheme="gray">UNAVAILABLE</Badge>
                                                    )}
                                                    <Badge
                                                        colorScheme={wallet.isConnected ? "green" : "red"}
                                                    >
                                                        {wallet.isConnected ? "CONNECTED" : "DISCONNECTED"}
                                                    </Badge>
                                                </HStack>
                                            </VStack>
                                        </HStack>
                                    </Box>
                                </Card>
                            ))
                            : walletsLocal
                                .filter((wallet:any) => wallet.wallet.isDetected)
                                .map((wallet: any) => (
                                    <Card key={wallet.type}>
                                        <Box
                                            key={wallet.type}
                                            p={4}
                                            boxShadow="md"
                                            borderRadius="md"
                                            maxW="sm"
                                            w="full"
                                            mt={4}
                                            onClick={() => connectWallet(wallet.type)}
                                            opacity={wallet.wallet.isDetected ? 1 : 0.5}
                                        >
                                            <HStack spacing={4}>
                                                <Avatar src={wallet.icon} name={wallet.type} />
                                                <VStack alignItems="start" spacing={1}>
                                                    <Text fontWeight="bold">{wallet.type}</Text>
                                                    <HStack spacing={2}>
                                                        {wallet.wallet.isDetected ? (
                                                            <Badge colorScheme="green">AVAILABLE</Badge>
                                                        ) : (
                                                            <Badge colorScheme="gray">UNAVAILABLE</Badge>
                                                        )}
                                                        <Badge
                                                            colorScheme={wallet.isConnected ? "green" : "red"}
                                                        >
                                                            {wallet.isConnected ? "CONNECTED" : "DISCONNECTED"}
                                                        </Badge>
                                                    </HStack>
                                                </VStack>
                                            </HStack>
                                        </Box>
                                    </Card>
                                ))}
                        <Button mt={4} onClick={toggleShowAll} size="sm">
                            {showAll ? "Hide Options" : "Show All Options"}
                        </Button>
                    </DrawerBody>
                    <DrawerFooter />
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
};

export default Drawr;
