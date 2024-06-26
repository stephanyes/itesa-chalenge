'use client'
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { getAllTransactions, getDocument, getPaginatedData } from "@/firebase/firestore/getData";
import { useEffect, useState } from "react";
import { TableContainer, Text, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Button, ButtonGroup, AbsoluteCenter, Box, Spinner, Container, Flex, Center, Icon } from "@chakra-ui/react";
import { TbError404 } from "react-icons/tb";
import { shortenWalletAddress } from "@/utils/utils";

//@ts-ignore
const TransactionsPage = ({searchParams}) => {
    const { user } = useAuthContext() as { user: any };
    const uid = user.uid;
    const [ loading, setLoading ] = useState(true)
    const [ transactions, setTransactions ] = useState<any[]>([])

    const [page, setPage] = useState(1);
    const [pageAction, setPageAction] = useState("NEXT");
    const [afterThis, setAfterThis] = useState(null);
    const [beforeThis, setBeforeThis] = useState(null);

    const handlePrevPage = () => {
        setPageAction("PREVIOUS");
        setPage((prevPage) => prevPage - 1);
    };
    
    const handleNextPage = () => {
        setPageAction("NEXT");
        setPage((prevPage) => prevPage + 1);
    };

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
                const PAGE_SIZE = 4;
                const entity = {
                    collection: 'transactions',
                    record_limits: PAGE_SIZE,
                    pageAction: pageAction,
                    page: page,
                    fields: {
                        txID: true,
                        amount: true,
                        sender: true,
                        recipient: true,
                        signature: true
                    },
                    orderByField: "amount",
                    orderByOrder: "desc",
                    firstIndex: beforeThis,
                    lastIndex: afterThis,
                    whereFields: [
                        {
                            name: 'sender',
                            value: address
                        },
                        {
                            name: 'recipient',
                            value: address
                        }
                    ]
                }

                const records: any = await getPaginatedData(entity);
                if(records?.length > 0) {
                    const last_index = records.length - 1;
                    const first_index = 0;

                    
                    const txResult: any = await getAllTransactions("transactions", address);
                    setTransactions(txResult.transactions)
                    setAfterThis(records[last_index][entity.orderByField]);
                    setBeforeThis(records[first_index][entity.orderByField]);
                    setTransactions(records)
                    setLoading(false);
                }
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [page, uid, pageAction, beforeThis, afterThis]);

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

    const title = page ? <Text>Page: {page}</Text> : null;
    return (
        <>
            <Flex flexDirection="column" alignItems="center" minH="50vh">
            {transactions.length > 0 ? (
                <>
                <Text>{title}</Text>
                    <TableContainer>
                        <Table variant='simple'>
                        {/* <TableCaption>LATEST TRANSACTIONS</TableCaption> */}
                        <Thead alignItems="center">
                            <Tr>
                            <Th>TxID</Th>
                            <Th>Amount</Th>
                            <Th>Sender</Th>
                            <Th>Recipient</Th>
                            <Th>Signature</Th>
                            <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {transactions.map((transaction, index) => (
                            <Tr key={index}>
                                <Td>{transaction.txID}</Td>
                                <Td isNumeric>${transaction.amount}</Td>
                                <Td>{shortenWalletAddress(transaction.sender)}</Td>
                                <Td>{shortenWalletAddress(transaction.recipient)}</Td>
                                <Td>{shortenWalletAddress(transaction.signature)}</Td>
                                <Td>
                                <Link href={`/dashboard/transactions/${transaction.txID}`}>
                                    <Button variant='outline' colorScheme='blue'>View</Button>
                                </Link>
                                </Td>
                            </Tr>
                            ))}
                        </Tbody>
                        <Tfoot>
                        </Tfoot>
                        </Table>
                    </TableContainer>
                    <Flex justifyContent="center" marginTop={2}>
                        <Button
                            flex="1" // Distribute remaining space equally
                            minWidth="120px" // Set a minimum width
                            bg={"#2e374a"}
                            disabled={true}
                            color={"white"}
                            rounded={"md"}
                            _hover={{
                                bg:"#182237"
                            }}
                            onClick={handlePrevPage}
                            mr={2}
                        >
                            Previous
                        </Button>
                        <Button
                            flex="1" // Distribute remaining space equally
                            minWidth="120px" // Set a minimum width
                            bg={"#2e374a"}
                            disabled={true}
                            color={"white"}
                            rounded={"md"}
                            _hover={{
                                bg:"#182237"
                            }}
                            onClick={handleNextPage}
                        >
                            Next
                        </Button>
                    </Flex>
                </>
            ) : (
                <Center flexDir={"column"} flex={1}>
                    <Icon as={TbError404} boxSize={8} color="red.500" />
                    <Text>No transactions available</Text>
                </Center>
            )}
            </Flex>
        </>
    )
}

export default TransactionsPage