'use client'
import styles from "@/ui/dashboard/card/card.module.css"
import { MdPeople, MdSupervisedUserCircle } from "react-icons/md";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { getDocument, getTopThreeTransactions } from "@/firebase/firestore/getData";
import { CardHeader, Heading, CardBody, Stack, StackDivider, Box, Card, Text, Spinner, Center, AbsoluteCenter, SimpleGrid, Badge, Button, DarkMode, Flex, Icon, Container, Avatar, useColorModeValue, Link } from "@chakra-ui/react";

const CardPage = () => {
    const { user } = useAuthContext() as { user: any };
    const uid = user.uid;
    const [ loading, setLoading ] = useState(true)
    const [ transactions, setTransactions ] = useState<any[]>([])

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
                const txResult: any = await getTopThreeTransactions("transactions", address);
                setTransactions(txResult.transactions)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [uid]);

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

    const shortenWalletAddress = (address: string, length = 6) => {
        if (address.length <= length * 2) return address; // If the address is shorter than desired length, return it as is
        const start = address.substring(0, length); // Take the first `length` characters
        const end = address.substring(address.length - length); // Take the last `length` characters
        return `${start}...${end}`; // Combine the start, "..." and end parts
    };

    return (
            <Container maxW="80rem" >
                <SimpleGrid columns={{ base: 1, md: 3 }} spacingX={25}>
                {transactions.map((transaction, index) => (
                <Center py={5} key={index}>
                    <Box
                        maxW={"270px"}
                        w={"full"}
                        bg={"#2e374a"}
                        boxShadow="inset 0 0 10px 0 rgba(255, 255, 255, 0.5)"
                        rounded={"md"}
                        overflow={"hidden"}
                        borderRadius={"12px"}
                        >
                        <Box p={8}>
                            <Stack spacing={0} align={"center"} mb={1}>
                                <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                                    Top {index + 1} transaction
                                </Heading>
                                <Text color={"gray.500"}>{shortenWalletAddress(transaction.recipient)}</Text>
                                <Text color={"gray.500"}>${transaction.amount}</Text>
                            </Stack>

                            <Link href={`/dashboard/transactions/${transaction.txID}`}>
                                <Button
                                    w={"full"}
                                    mt={8}
                                    bg={"teal.500"}
                                    color={"white"}
                                    rounded={"md"}
                                    _hover={{
                                        transform: "translateY(-2px)",
                                        boxShadow: "lg"
                                    }}
                                    >
                                        View
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Center>
                ))}
                </SimpleGrid>
        </Container>
    )
}

export default CardPage;
        // <>
        //     <SimpleGrid w='100%' columns={{sm: 1, md: 3}} spacing={3} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
        //         {transactions.map((transaction, index) => (
        //             <Flex
        //             borderRadius='20px'
        //             bg='#2e374a'
        //             p='20px'
        //             h='345px'
        //             w={{ base: "315px", md: "345px" }}
        //             alignItems='center'
        //             direction='column'>
        //             <Flex w='100%' mb='18px'>
        //               <Flex
        //                 w='38px'
        //                 h='38px'
        //                 align='center'
        //                 justify='center'
        //                 borderRadius='50%'
        //                 me='12px'
        //                 bg="black">
        //                 <Icon w='24px' h='24px' as={MdPeople} color="teal.500" />
        //               </Flex>
        //               <Text
        //                 my='auto'
        //                 fontWeight='600'
        //                 color="white"
        //                 textAlign='center'
        //                 fontSize='xl'
        //                 me='auto'>
        //                 Teams
        //               </Text>
        //             </Flex>
        //             <Text
        //               fontWeight='600'
        //               color="white"
        //               textAlign='start'
        //               fontSize='xl'
        //               w='100%'>
        //               Simmmple Web
        //             </Text>
        //             <Flex mt='auto' justify='space-between' w='100%' align='center'>
        //               <DarkMode>
        //                 <Badge
        //                   borderRadius='9px'
        //                   size='md'
        //                   colorScheme='green'
        //                   color='green.400'
        //                   textAlign='center'
        //                   display='flex'
        //                   justifyContent='center'
        //                   alignItems='center'>
        //                   Design
        //                 </Badge>
        //               </DarkMode>
        //             </Flex>
        //           </Flex>
        //             // <div className={styles.container} key={index}>
        //             //     <MdSupervisedUserCircle size={24} />
        //             //     <div className={styles.texts}>
        //             //         <span className={styles.title}>Receipient: {transaction.recipient.toUpperCase()}</span>
        //             //         <span className={styles.number}>${transaction.amount}</span>
        //             //         <span className={styles.detail}>
        //             //             <span className={styles.positive}>12%</span> more than last week
        //             //         </span>
        //             //     </div>
        //             // </div>
        //             // <Card key={index}>
        //             //     <CardHeader>
        //             //         <Heading size='md'>Top {index + 1} Transaction</Heading>
        //             //     </CardHeader>
                    
        //             //     <CardBody >
        //             //         <Stack divider={<StackDivider />} spacing='4'>
        //             //             <Box>
        //             //                 <Heading  size='xs' textTransform='uppercase'>
        //             //                     Recipient
        //             //                 </Heading>
        //             //                 <Text pt='2' fontSize='sm'>
        //             //                     {transaction.recipient.toUpperCase()}.
        //             //                 </Text>
        //             //             </Box>
        //             //             <Box>
        //             //                 <Heading  size='xs' textTransform='uppercase'>
        //             //                     Amount
        //             //                 </Heading>
        //             //                 <Text pt='2' fontSize='sm'>
        //             //                     ${transaction.amount}.
        //             //                 </Text>
        //             //             </Box>
        //             //             <Box>
        //             //                 <Heading  size='xs' textTransform='uppercase'>
        //             //                     Analysis
        //             //                 </Heading>
        //             //                 <Text pt='2' fontSize='sm'>
        //             //                     Something really interesting about this tx.
        //             //                 </Text>
        //             //             </Box>
        //             //         </Stack>
        //             //     </CardBody>
        //             // </Card>
        //         ))}
        //     </SimpleGrid> 
        // </>
