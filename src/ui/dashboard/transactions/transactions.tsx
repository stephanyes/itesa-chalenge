'use client'
import styles from "@/ui/dashboard/transactions/transactions.module.css"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { getDocument, getLatestTransactions } from "@/firebase/firestore/getData";
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, AbsoluteCenter, Box, Spinner } from "@chakra-ui/react";

const Transactions = () => {
    const { user } = useAuthContext() as { user: any };
    const [ loading, setLoading ] = useState(true)
    const [ transactions, setTransactions ] = useState<any[]>([])
    const uid = user.uid;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getDocument("users", uid);
                if (!result.result) {
                    console.log("User document does not exist");
                    setLoading(false);
                    return;
                }
                const userData = result.result.data();
                if (!userData) {
                    console.log("User data is empty");
                    setLoading(false);
                    return;
                }
                const { address } = userData;
                if (!address) {
                    console.log("User document does not contain an address");
                    setLoading(false);
                    return;
                }
                const txResult: any = await getLatestTransactions("transactions", address);
                setTransactions(txResult.transactions)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [uid]);

    const shortenWalletAddress = (address: string, length = 6) => {
        if (address.length <= length * 2) return address;
        const start = address.substring(0, length);
        const end = address.substring(address.length - length);
        return `${start}...${end}`;
    };


    if (loading) {
        return (
        <Box position='relative' h='100px'>
            <AbsoluteCenter p='4' axis='both'>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </AbsoluteCenter>
        </Box>
        )
    }
    return (
        // <Box overflowX="auto">
            <TableContainer border={"2px solid white"} borderRadius="10px">
                <Table variant='simple'>
                    <TableCaption 
                    margin={"10px"}
                    justifyContent="center" 
                    alignItems="center"
                    color={"white"} >
                        LATEST TRANSACTIONS</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Address</Th>
                            <Th>Status</Th>
                            <Th>TxID</Th>
                            <Th>Amount</Th>
                            <Th>Sender</Th>
                            <Th>Recipient</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {transactions.map((transaction, index) => (
                        <Tr key={index}>
                            <Td>{shortenWalletAddress(transaction.sender)}</Td>
                            <Td>{transaction.status}</Td>
                            <Td>{transaction.txID}</Td>
                            <Td isNumeric>${transaction.amount}</Td>
                            <Td>{shortenWalletAddress(transaction.sender)}</Td>
                            <Td>{shortenWalletAddress(transaction.recipient)}</Td>
                        </Tr>
                    ))}
                    </Tbody>
                    <Tfoot>

                    </Tfoot>
                </Table>
            </TableContainer>
        // </Box>
    )
}

export default Transactions;