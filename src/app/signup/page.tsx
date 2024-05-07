'use client'
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Image from "next/image";
import { 
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack
} from "@chakra-ui/react";
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
    <Flex bg={"gray.100', 'gray.700"} h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        backgroundColor={"gray.100', 'gray.700"}
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
            id="email"
            placeholder="johndoe@gmail.com"
            type="email"
            variant="filled"
            onChange={(e) => setEmail(e.target.value)}
            mb={3}
          />
          <InputGroup>
            <Input
              id="password"
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
  )
}

export default Page;
