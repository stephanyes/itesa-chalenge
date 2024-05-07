'use client'
import { shortenWalletAddress } from "@/utils/utils";
import { Flex, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation"

const Navbar = () => {
  const pathname = usePathname();
  const splitPathname = pathname.split("/");
  const lastSegment = splitPathname[splitPathname.length - 1];
  
  // Capitalize the first letter of the last segment
  let title = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  if (title.toLowerCase() === "users") {
    title = "Personal Information";
  }

  if (title === "Personal Information" || title.toLowerCase() === "transactions" || title.toLowerCase() === "dashboard") {
    return (
      <Flex 
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="5vh"
      padding={"40px"}
      // bg="#1A202C"
      color="white"
      position="relative"
      borderRadius="5px"
    >
      <Flex
        position="absolute"
        borderRadius="10px"
        top={0}
        left={0}
        right={0}
        bottom={0}
        border="2px solid white"
      />
      <Text fontSize="xl">{title}</Text>
    </Flex>
    );
  }

  if (title.length > 6) {
    title = "Transaction ID - " + shortenWalletAddress(title);
  }

  return (
    <Flex 
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="5vh"
      padding={"40px"}
      border="2px solid white"
      borderRadius="10px"
      >
      <Text color="white">{title}</Text>
    </Flex>
  );
};
export default Navbar;