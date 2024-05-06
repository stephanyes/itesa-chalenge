import styles from "@/ui/dashboard/footer/footer.module.css"
import { Flex, Box, Text } from "@chakra-ui/react";
import Image from "next/image";
const Footer = () => {
    return (
        <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            bg="#182237"
            color="white"
            p={4}
        >
            <Box display="flex" alignItems="center">
                <Image src="/itesa.png" alt="" width={25} height={25} style={{marginRight: "12px"}} />
                <Text>Itesa Global</Text>
            </Box>
            <Text textAlign={{ base: "center", md: "right" }}>© All rights reserved.</Text>
        </Flex>
    );
}

export default Footer;

// return(
//     <div className={styles.container}>
//         <div className={styles.logo}>
//             <Image 
//             src="/itesa.png"
//             alt=""
//             width={25}
//             height={25}
//             />
//             Itesa Global
//         </div>
//         <div className={styles.text}>© All rights reserved.</div>
//     </div>
// )