'use client'
import { signIn } from "@/firebase/auth/signIn";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Flex,
  Stack,
  Heading,
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormHelperText,
  Link,
  Box,
} from "@chakra-ui/react";

import Image from "next/image";

function Page(): JSX.Element {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ error, setError ] = useState<any>(null)
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
      <Flex backgroundColor={"gray.100', 'gray.700"} h="100vh" alignItems="center" justifyContent="center">
        <Flex flexDirection="column" backgroundColor={"gray.100', 'gray.700"} p={12} borderRadius={8} boxShadow="lg">
          <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
            <Box alignItems="center">
              <Image src="/itesa.png" alt="" width={50} height={50} />
            </Box>
            <Heading mb={6}>Log In</Heading>
          </Stack>
          <form onSubmit={handleForm}>
            <FormControl>
              <Input
                bg={"transparent"}
                id="email"
                placeholder="johndoe@gmail.com"
                type="email"
                variant="filled"
                onChange={(e) => setEmail(e.target.value)}
                mb={3}
                />
              <InputGroup>
                <Input
                  bg={"transparent"}
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
                  Log In
                </Button>
                <Box color="teal.500">You don&apos;t have an account?<Link color="teal.500" href="/signup">Sign Up</Link></Box>
              </Flex>
            </FormControl>
          </form>
        </Flex>
      </Flex>
  )
}

export default Page;
