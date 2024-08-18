import { Center } from "@chakra-ui/react";
import PasswordGenerator from "./components/passwordGenerator/PasswordGenerator";

function App() {
  return (
    <Center h={"100vh"} as="main">
      <PasswordGenerator />
    </Center>
  );
}

export default App;
