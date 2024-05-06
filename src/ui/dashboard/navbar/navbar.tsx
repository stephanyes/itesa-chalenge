'use client'
import styles from "@/ui/dashboard/navbar/navbar.module.css"
import { Flex, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation"

const shortenWalletAddress = (address: string, length = 6) => {
  if (address.length <= length * 2) return address;
  const start = address.substring(0, length);
  const end = address.substring(address.length - length);
  return `${start}...${end}`;
};


const Navbar = () => {
  const pathname = usePathname();
  const splitPathname = pathname.split("/");
  const lastSegment = splitPathname[splitPathname.length - 1];
  
  // Capitalize the first letter of the last segment
  let title = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  if (title === "Personal Information" || title.toLowerCase() === "transactions" || title.toLowerCase() === "dashboard") {
    return (
      <Flex 
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="5vh"
        padding={"40px"}
      >
        <Text color="white">{title}</Text>
      </Flex>
    );
  }

  if (title.length > 6) {
    title = "TXID - " + shortenWalletAddress(title);
  }

  return (
    <Flex 
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="5vh"
      padding={"40px"}
      >
      <Text color="white">{title}</Text>
    </Flex>
  );
};
export default Navbar;


  // const pathname = usePathname();
  // return (
  //     <div className={styles.container}>
  //         <div className={styles.titles}>
  //             <h1>
  //                 {pathname.split("/").pop()?.toUpperCase()}
  //             </h1>
  //         </div>
  //     </div>
  // )