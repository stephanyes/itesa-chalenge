import Sidebar from "@/ui/dashboard/sidebar/sidebar"
import Navbar from "@/ui/dashboard/navbar/navbar"
import Footer from "@/ui/dashboard/footer/footer"
import { Box, Flex } from "@chakra-ui/react"


const Layout = async ({ children }: any) => {
    return (
        <Flex backgroundColor="#182237" color="white" flexDirection={{ base: "column", md: "row" }} minHeight="100vh">
            <Box h="100%" flex={{ base: "none", md: 1 }} padding={{ base: 0, md: '20px' }}>
                <Sidebar />
            </Box>
            <Flex flex={{ base: "auto", md: 4 }} flexDirection="column">
                <Navbar />
                <Box flex="1" padding="20px" overflowY="auto">
                    {children}
                </Box>
                <Footer />
            </Flex>
        </Flex>
    );
}

export default Layout