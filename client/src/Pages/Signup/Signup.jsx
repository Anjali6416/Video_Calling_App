import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import validator  from "validator";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputState, setInputState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const toast = useToast({ position: "top" });

  const handleValuedInput = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };
  const validateForm = ({ name, email, password }) => {
    if (!name) {
      toast({
        title: `Name is required`,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (!email) {
      toast({
        title: `Email is required`,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (!validator.isEmail(email)) {
      toast({
        title: `Enter valid email`,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (!password) {
      toast({
        title: `Password is required`,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (!validator.isStrongPassword(password)) {
      toast({
        title: `Password should be over 8 characters, Uppercase, Lowercase and Special character.`,
        status: "error",
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  const handleFormSubmit = async () => {
    if (!validateForm(inputState)) return;

    try {
      setLoading(true);
      // console.log(inputState)
      let response = await fetch("https://easy-sweatsuit-pig.cyclic.app/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputState),
      });
      let data = await response.json();
      setLoading(false);
      if (data.success) {
        toast({
          title: `Registration Successful`,
          status: "success",
          isClosable: true,
        });
        // console.log(data);
        setInputState({
          name: "",
          email: "",
          password: "",
        });
        navigate("/login");
      }
       else{
        toast({
          title: `${data.message}`,
          status: "error",
          isClosable: true,
        });
      }

    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({

        title: `Couldn't Post Data`,
        status: "error",
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Create Account
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            To sign up, Please enter your Name, Email and Password
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleValuedInput}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleValuedInput}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleValuedInput}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                isLoading={loading}
                loadingText="Submitting"
                size="lg"
                bg={"teal.400"}
                color={"white"}
                _hover={{
                  bg: "teal.500",
                }}
                onClick={handleFormSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link
                  color={"teal.400"}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
export default Signup;
