'use client'
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { getDocument, getTopThreeTransactions } from "@/firebase/firestore/getData";
import { Heading, Stack, Box, Text, Spinner, Center, AbsoluteCenter, SimpleGrid, Button, Container, Link } from "@chakra-ui/react";
import { shortenWalletAddress } from "@/utils/utils";

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