'use client'
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { extractNameFromEmail } from "@/utils/utils";
import { getDocument } from "@/firebase/firestore/getData";
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, AbsoluteCenter, Box, Spinner } from "@chakra-ui/react";

const Users = () => {
    const { user } = useAuthContext() as { user: any };
    const uid = user.uid;
    const { name, lastName } = extractNameFromEmail(user.email);
    const [ loading, setLoading ] = useState(true)
    const [ address, setAddress ] = useState("")
    const [ balance, setBalance ] = useState(0)

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
    )
}

export default Users