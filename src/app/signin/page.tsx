'use client'
import { signIn } from "@/firebase/auth/signIn";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Flex, Stack, Avatar, Heading, FormControl, InputGroup, Input, InputRightElement, Button, FormHelperText, Link, Box } from "@chakra-ui/react";
import Image from "next/image";

function Page(): JSX.Element {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ error, setError ] = useState("")
  const router = useRouter();
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  // Handle form submission
  const handleForm = async ( event: { preventDefault: () => void } ) => {
    event.preventDefault();
    console.log(email)
    console.log(password)
    // Attempt to sign in with provided email and password
    const { result, error } = await signIn( email, password );

    if ( error ) {
      // Display and log any sign-in errors
      console.log( error );
      setError(error)
      return;
    }

    // Sign in successful
    console.log( result );

    // Redirect to dashboard
      router.push( "/dashboard" );
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="#151c2c"
      justifyContent="center"
      alignItems="center"
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
        {/* <Avatar bg="teal.500" /> */}
        <Heading color="teal.400">Welcome back!</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleForm}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="teal"
              boxShadow="md"
              borderRadius={10}
            >
              <FormControl>
                <InputGroup>
                  {/* <InputLeftElement
                    pointerEvents="none"
                    // children={<CFaUserAlt color="gray.300" />}
                  /> */}
                  <Input 
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email" placeholder="email address" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  {/* <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    // children={<CFaLock color="gray.300" />}
                  /> */}
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type={show ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {/* <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText> */}
              </FormControl>
              <Button
                borderRadius={10}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
              {error ? (<p style={{color: "red"}}>{error}</p>) : null}
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box color="teal.500">
        New to us?{" "}
        <Link color="teal.500" href="/signup">
          Sign Up
        </Link>
      </Box>
    </Flex>
  )
}

export default Page;
