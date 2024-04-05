import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';

const Leaderboard = () => {
    const [traders, setTraders] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('https://swaps.pro/api/v1/leaderboard');
                setTraders(response.data.slice(0, 10)); // Assuming the data is an array and we take the top 10
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <Box width="100%" p={5}>
            <Text fontSize="2xl" mb={4}>Top 10 Traders</Text>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Rank</Th>
                            <Th>Trader</Th>
                            <Th isNumeric>Volume</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {traders.map((trader:any, index: any) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{trader.name}</Td>
                                <Td isNumeric>{trader.volume}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Leaderboard;
