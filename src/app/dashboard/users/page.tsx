'use client'
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { extractNameFromEmail } from "@/utils/utils";
import { getDocument } from "@/firebase/firestore/getData";
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, AbsoluteCenter, Box, Spinner, useMediaQuery, FormControl, FormLabel, Input } from "@chakra-ui/react";

const Users = () => {
    const { user } = useAuthContext() as { user: any };
    const uid = user.uid;
    const { name, lastName } = extractNameFromEmail(user.email);
    const [ loading, setLoading ] = useState(true)
    const [ address, setAddress ] = useState("")
    const [ balance, setBalance ] = useState(0)
    const [isMobile] = useMediaQuery("(max-width: 768px)");

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
                const { address, balance } = userData;
                if (!address) {
                    console.log("User document does not contain an address");
                    setLoading(false);
                    return;
                };
                setAddress(address);
                setBalance(balance)
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

        <>
            {!isMobile && (
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>User - {name} {lastName}</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Address</Th>
                                <Th>Balance</Th>
                            </Tr>
                        </Thead>
        
                        <Tbody>
                            <Tr>
                                <Td>{name} {lastName}</Td>
                                <Td>{user.email}</Td>
                                <Td>{address}</Td>
                                <Td>{balance}</Td>
                            </Tr>
                        </Tbody>
        
                        <Tfoot></Tfoot>
                    </Table>
                </TableContainer>
            ) }

            {isMobile && ( // Show FormControls when in mobile view
                <div> 
                    <FormControl id="name" mb={3}> 
                        <FormLabel>Name</FormLabel>
                        <Input type="text" value={`${name} ${lastName}`} isReadOnly /> 
                    </FormControl>

                    <FormControl id="email" mb={3}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" value={user.email} isReadOnly />
                    </FormControl>

                    <FormControl id="address" mb={3}>
                        <FormLabel>Address</FormLabel>
                        <Input type="text" value={address} isReadOnly />
                    </FormControl>

                    <FormControl id="balance" mb={3}>
                        <FormLabel>Balance</FormLabel>
                        <Input type="text" value={balance} isReadOnly />
                    </FormControl>
                </div>
            )}

        </>
    )
}

export default Users