
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Stack, Text, Link } from "@chakra-ui/react";
import { ArrowForwardIcon, CalendarIcon } from "@chakra-ui/icons";
function Home() {
  const navigate = useNavigate();

 

  return (
    <Flex
      align={"center"}
      justifyContent={"center"}
      paddingTop={"100px"}
      bg={"gray.50"}
      h={"90vh"}
      backgroundImage={
        "https://images.pexels.com/photos/4492129/pexels-photo-4492129.jpeg?auto=compress&cs=tinysrgb&w=720&h=750&dpr=2"
      }
      backgroundPosition={"center"}
      backgroundRepeat={"no-repeat"}
      // opacity={"0.1"}
    >
      <Box  mt={-60}>
        <Stack>
          <Text fontSize={"2em"}>
            One Platform to <Link color={"teal"}>Connect</Link>
          </Text>
        </Stack>
        
        <Stack direction="row" spacing={4} mt={10}>
          <Button
            leftIcon={<CalendarIcon />}
            colorScheme="teal"
            variant="solid"
            onClick={() => {
              navigate("/schedule");
            }}
          >
            Schedule a Meeting
          </Button>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            color="white"
            variant="outline"
            onClick={() => {
              navigate("/join");
            }}
          >
            Join Meeting
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}
export default Home;
