import { ChangeEvent, useState } from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Checkbox,
  Button,
  Input,
  Spacer,
  Flex,
  useClipboard,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import {
  generatePassword,
  GeneratePasswordOptions,
  GeneratePasswordType,
} from "../../utils/CharRandomGenerator";

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState<number>(12);
  const [newGeneratedPassword, setNewGeneratedPassword] = useState<string>("");
  const [toggleShowPassword, setToggleShowPassword] = useState<
    "password" | "text"
  >("password");
  const [options, setOptions] = useState<GeneratePasswordOptions>({
    uppercase: false,
    lowercase: false,
    specialChar: false,
  });
  const { onCopy, hasCopied } = useClipboard(newGeneratedPassword);

  function handleOptionChecked(event: ChangeEvent<HTMLInputElement>) {
    setOptions((prevVal) => ({
      ...prevVal,
      [event.target.name]: event.target.checked,
    }));
  }

  return (
    <Flex
      w="350px"
      h="400px"
      maxW="98vw"
      mx="auto"
      mt="50px"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      flexDir={"column"}
      gap={3}
    >
      <Box>
        <Box as="p">Password Length: {passwordLength}</Box>
        <Slider
          aria-label="password-length-slider"
          colorScheme="teal"
          min={8}
          max={32}
          value={passwordLength}
          onChange={(newPasswordLength) => setPasswordLength(newPasswordLength)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
      <Flex flexDir={"column"} gap={1}>
        <Box as="p">Configure Password</Box>
        <Spacer />
        {CHECKBOX_DATA.map((checkbox) => {
          return (
            <CheckBox
              {...checkbox}
              key={checkbox.type}
              onChangeFunc={handleOptionChecked}
            />
          );
        })}
      </Flex>

      <Button
        colorScheme="teal"
        onClick={() =>
          setNewGeneratedPassword(generatePassword(options, passwordLength))
        }
      >
        Generate Password
      </Button>
      <Box aria-label="spacer" />

      {newGeneratedPassword && (
        <>
          <Box>
            <Box as="p">New Generated Password</Box>
            <InputGroup>
              <Input
                readOnly
                type={toggleShowPassword}
                size="md"
                value={newGeneratedPassword}
              />
              <InputRightElement
                onClick={() => {
                  if (toggleShowPassword === "text")
                    return setToggleShowPassword("password");
                  if (toggleShowPassword === "password")
                    return setToggleShowPassword("text");
                }}
              >
                {toggleShowPassword === "text" ? (
                  <Icon icon="solar:eye-bold" />
                ) : (
                  <Icon icon="solar:eye-closed-bold" />
                )}
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box>
            <Button display={"flex"} gap={1} onClick={onCopy}>
              {hasCopied ? (
                <>
                  <Icon color="success" icon="solar:check-read-linear" />
                  Copied Password
                </>
              ) : (
                <>
                  <Icon icon="solar:copy-linear" />
                  Copy Password
                </>
              )}
            </Button>
          </Box>
        </>
      )}
    </Flex>
  );
};

type CheckboxProps = {
  type: GeneratePasswordType;
  title: string;
  onChangeFunc: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CHECKBOX_DATA = [
  {
    type: "uppercase",
    title: "Uppercase Letters",
  },
  {
    type: "lowercase",
    title: "Lowercase Letters",
  },
  {
    type: "specialChar",
    title: "Special Characters",
  },
] satisfies Array<Omit<CheckboxProps, "onChangeFunc">>;

const CheckBox = ({ type, title, onChangeFunc }: CheckboxProps) => {
  return (
    <Checkbox name={type} colorScheme="teal" onChange={onChangeFunc}>
      {title}
    </Checkbox>
  );
};

export default PasswordGenerator;
