'use client'
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Image from "next/image";
import { Avatar, Box, Button, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import React from "react";

function Page(): JSX.Element {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ error, setError ] = useState<any>(null)
  const router = useRouter();
  const [ show, setShow ] = React.useState(false)
  const handleClick = () => setShow(!show)

  const handleForm = async ( event: { preventDefault: () => void } ) => {
    event.preventDefault();
    const { result, error } = await signUp( email, password );

    if ( error ) {
      // Display and log any sign-up errors
      console.log( error );
      setError(error)
    }

    if (result) {
      setError(null)
      router.push( "/dashboard" );
    }
  }

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={"gray.100', 'gray.700"}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
      <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
        <Box alignItems="center">
          <Image src="/itesa.png" alt="" width={50} height={50} />
        </Box>
        <Heading mb={6}>New? Sign up</Heading>
      </Stack>
      <form onSubmit={handleForm}>
        <FormControl>
          <Input
            placeholder="johndoe@gmail.com"
            type="email"
            variant="filled"
            onChange={(e) => setEmail(e.target.value)}
            mb={3}
          />
          <InputGroup>
            {/* <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              // children={<CFaLock color="gray.300" />}
            /> */}
            <Input
              placeholder="**********"
              type={show ? "text" : "password"}
              variant="filled"
              mb={6}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
          </InputGroup>
          <Flex m={0} justifyContent={"center"} alignItems="center" flexDir={'column'}>
            <FormHelperText >
                {error ? (<p style={{color: "red"}}>{error.code}</p>) : (null)}
                {/* <Link>forgot password?</Link> */}
            </FormHelperText>
            <Button type="submit" colorScheme="teal" mb={8}>
                Sign up
            </Button>
            <Box color="teal.500">
              Already have an account?{" "}
              <Link color="teal.500" href="/signin">
                Login in
              </Link>
            </Box>
          </Flex>
        </FormControl>
      </form>
    </Flex>
  </Flex>
    // <Flex
    //   flexDirection="column"
    //   width="100wh"
    //   height="100vh"
    //   backgroundColor="#151c2c"
    //   justifyContent="center"
    //   alignItems="center"
    // >
    //   <Box alignItems="center">
    //     <Image src="/itesa.png" alt="" width={50} height={50} />
    //   </Box>
    //   <Stack
    //     flexDir="column"
    //     mb="2"
    //     justifyContent="center"
    //     alignItems="center"
    //   >
    //     {/* <Avatar bg="teal.500" /> */}
    //     <Heading color="teal.400">New here? Sign up</Heading>
    //     <Box minW={{ base: "90%", md: "468px" }}>
    //       <form onSubmit={handleForm}>
    //         <Stack
    //           spacing={4}
    //           p="1rem"
    //           backgroundColor="teal"
    //           boxShadow="md"
    //           borderRadius={10}
    //         >
    //           <FormControl>
    //             <InputGroup>
    //               {/* <InputLeftElement
    //                 pointerEvents="none"
    //                 // children={<CFaUserAlt color="gray.300" />}
    //               /> */}
    //               <Input 
    //               onChange={(e) => setEmail(e.target.value)}
    //               value={email}
    //               type="email" placeholder="email address" />
    //             </InputGroup>
    //           </FormControl>
    //           <FormControl>
    //             <InputGroup>
    //               {/* <InputLeftElement
    //                 pointerEvents="none"
    //                 color="gray.300"
    //                 // children={<CFaLock color="gray.300" />}
    //               /> */}
    //               <Input
    //                 type={show ? "text" : "password"}
    //                 placeholder="Password"
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 value={password}
    //               />
    //               <InputRightElement width="4.5rem">
    //                 <Button h="1.75rem" size="sm" onClick={handleClick}>
    //                   {show ? "Hide" : "Show"}
    //                 </Button>
    //               </InputRightElement>
    //             </InputGroup>
                // <FormHelperText textAlign="right">
                //   {error ? (<p style={{color: "#151c2c"}}>{error.code}</p>) : (null)}
                //   {/* <Link>forgot password?</Link> */}
                // </FormHelperText>
    //           </FormControl>
    //           <Button
    //             borderRadius={10}
    //             type="submit"
    //             variant="solid"
    //             colorScheme="teal"
    //             width="full"
    //           >
    //             Sign up
    //           </Button>
    //         </Stack>
    //       </form>
    //     </Box>
    //   </Stack>
      // <Box color="teal.500">
      //   Already have an account?{" "}
      //   <Link color="teal.500" href="/signin">
      //     Login in
      //   </Link>
      // </Box>
    // </Flex>
  )
}

export default Page;
