import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import validator from "validator";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../Components/Context/ContexProvider";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function Login() {
  const navigate = useNavigate();
  const { toggleIsAuth } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputState, setInputState] = useState({
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
  const validateForm = ({ email, password }) => {
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
        title: `Password should be over 8 characters.`,
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

      let response = await fetch("https://easy-sweatsuit-pig.cyclic.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputState),
      });
      let data = await response.json();
      setLoading(false);
      if (data.success) {
        sessionStorage.setItem("accessToken", data.accessToken);
        toast({
          title: `Login Successful`,
          status: "success",
          isClosable: true,
        });

        toggleIsAuth(true);
        setInputState({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
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
        title: `Wrong Email or password`,
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
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Please enter valid Email and Password ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
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
            <Stack spacing={10}>
              <Button
                isLoading={loading}
                bg={"teal.400"}
                color={"white"}
                _hover={{
                  bg: "teal.500",
                }}
                onClick={handleFormSubmit}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                New User?{" "}
                <Link
                  onClick={() => {
                    navigate("/signup");
                  }}
                  color={"blue.400"}
                >
                  Signup
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
