'use client'
import { MdDashboard, MdLogout, MdShoppingBag, MdSupervisedUserCircle } from "react-icons/md"
import { auth } from "@/firebase/auth/signIn";
import { signOut } from "firebase/auth";
import MenuLink from "./menuLink/menuLink"
import Image from "next/image"
import { redirect } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { extractNameFromEmail } from "@/utils/utils";
import { Badge, Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import SidebarDrawer from "./alert";


const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />,
            },
            {
                title: "User",
                path: "/dashboard/users",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Transactions",
                path: "/dashboard/transactions",
                icon: <MdShoppingBag />,
            }
        ]
    }
]

const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useAuthContext() as { user: any };
    if (!user) {
        return redirect("/signin");
    }
    const { name, lastName } = extractNameFromEmail(user.email);

    const handleClick = async (e: any) => {
        e.preventDefault();
        await signOut(auth)
        // redirect("/signin")
    }

    return (
        <Flex h="100%" direction="column" p={4}>
            {/* Button to open the sidebar in mobile view */}
            <Button boxShadow="inset 0 0 10px 0 rgba(255, 255, 255, 0.5)" backgroundColor={"teal.500"} color={"white"} onClick={onOpen} display={{ base: 'block', md: 'none' }}>
                Menu
            </Button>

            <SidebarDrawer 
            isOpen={isOpen}
            onClose={onClose}
            name={name}
            lastName={lastName}
            menuItems={menuItems}
            handleClick={handleClick} />

            {/* Sidebar content for desktop view */}
            <Flex direction="column" p={4} display={{ base: 'none', md: 'flex' }}>
                <Flex align="center" mb={4}> {/* Add margin bottom */}
                <Image width={50} height={50} src="/itesa.png" alt={""} />
                    <Box ml="3">
                        <Text fontWeight="bold">
                            {name} {lastName}
                            <Badge ml="1" colorScheme="green">
                                New
                            </Badge>
                        </Text>
                        <Text fontSize="sm">Crypto Lord</Text>
                    </Box>
                </Flex>
                <ul style={{ listStyle: "none", marginBottom: "20px" }}> {/* Add margin bottom */}
                    {menuItems.map((cat) => (
                        <li key={cat.title}>
                            {cat.list.map((item) => (
                                <MenuLink onClose={null} item={item} key={item.title} />
                            ))}
                        </li>
                    ))}
                </ul>
                <Button
                    leftIcon={<MdLogout />}
                    variant="outline"
                    colorScheme="red"
                    onClick={handleClick}
                    mt={4}
                >
                    Logout
                </Button>
            </Flex>
        </Flex>
    );
}

export default Sidebar