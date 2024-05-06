'use client'
import { AbsoluteCenter, useToast, Alert, AlertIcon, Box, Button, Flex, Image, Input, Link, Spinner, Text } from '@chakra-ui/react';
import { getDocument, getTransactionById } from '@/firebase/firestore/getData';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';


const ViewTransactionPage = () => {
    const toast = useToast();
    const { user } = useAuthContext() as { user: any };
    const uid = user.uid;
    const [ loading, setLoading ] = useState(true)
    const [ address, setAddress ] = useState("")
    const [ amount, setAmount ] = useState(0)
    const [ signature, setSignature ] = useState("")
    const [ recipient, setRecipient ] = useState("")
    const [ transactions, setTransactions ] = useState<any>()
    const [ verified, setVerified ] = useState("")

    const handleVerifyTX = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                sender: address,
                recipient,
                amount,
                signature
             })
          };

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const response = await fetch(
                `${apiUrl}/transactions/verify-transaction`, 
                requestOptions);
                
            if (response.ok) {
                const jsonData = await response.json();
                setVerified(jsonData.message)
                toast({
                    title: "Transaction Verified",
                    description: `${jsonData.message}`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Transaction Verification Failed",
                    description: "The transaction could not be verified.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                throw new Error('Failed to fetch data');
            }
            } catch (error) {
            console.error('Error fetching data:', error);
            }
    }


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
                setAddress(address)
                const txID = window.location.pathname.split('/').pop();
                if (!txID) {
                    console.error('Transaction ID is undefined');
                    return;
                }
                
                const transactionData = await getTransactionById('transactions', txID);
                setTransactions(transactionData.transactions[0]);
                setSignature(transactionData.transactions[0].signature);
                setRecipient(transactionData.transactions[0].recipient);
                setAmount(transactionData.transactions[0].amount);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching transaction data:', error);
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
        <Flex 
            justify="center"
            align="center"
            p={[0, 4]}
            width="100%"
        >
            <Flex
                direction="column"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                width={['100%', '80%']}
                >
                <Flex
                  align="center"
                  justify="center"
                  p="4"
                >
                    <Image src="/bitcoin.png" alt='' boxSize="30px" mr="2" />
                    <Text fontSize="lg">Bitcoin Network</Text>
                </Flex>
                <Flex direction="column" p="4" width={['100%', 'auto']}>
                    <Box mb="3">
                        <Text mb="1">Address</Text>
                        <Input name="address" type="text" disabled value={address} placeholder={address} />
                    </Box>
                    <Box mb="3">
                        <Text mb="1">Status</Text>
                        <Input name="status" type="text" disabled value={transactions.status} placeholder={transactions.status} />
                    </Box>
                    <Box mb="3">
                        <Text mb="1">TxID</Text>
                        <Input name="txID" type="text" disabled value={transactions.txID} placeholder={transactions.txID} />
                    </Box>
                    <Box mb="3">
                        <Text mb="1">Amount</Text>
                        <Input name="amount" type="text" disabled value={transactions.amount} placeholder={transactions.amount} />
                    </Box>
                    <Box mb="3">
                        <Text mb="1">Sender</Text>
                        <Input name="sender" type="text" disabled value={transactions.sender} placeholder={transactions.sender} />
                    </Box>
                    <Box mb="3">
                        <Text mb="1">Recipient</Text>
                        <Input name="recipient" type="text" disabled value={transactions.recipient} placeholder={transactions.recipient} />
                    </Box>
                    <Box mb="3">
                        <Text mb="1">Signature</Text>
                        <Input name="signature" type="text" disabled value={transactions.signature} placeholder={transactions.signature} />
                    </Box>
                </Flex>
                <Flex direction="column" p="4" width={['100%', 'auto']} align={"center"}>
                    <Link href="/dashboard/transactions">
                        <Button colorScheme="blue">Return</Button>
                    </Link>
                    <Button
                        bg={"#2e374a"}
                        color={"white"}
                        rounded={"md"}
                        _hover={{
                            bg:"#182237"
                        }}
                        onClick={handleVerifyTX}
                    >
                        Verify TX
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ViewTransactionPage;
