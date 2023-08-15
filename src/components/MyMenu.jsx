import { useState, useRef, useLayoutEffect, useEffect } from "react";
import {
  Box,
  Flex,
  MenuItem,
  Text,
  MenuToggle,
  Icon,
  MenuList,
  Menu,
  useColorStyle,
  useColorMode,
} from "@tonic-ui/react";

const MENU_LIST_MAX_HEIGHT = 120;

const Avatar = (props) => (
  <Flex
    p="1x"
    borderRadius="50%"
    alignItems="center"
    justifyContent="center"
    fontSize="xs"
    lineHeight="1"
    {...props}
  />
);

const MyMenu = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const [menuState, setMenuState] = useState("main");

  const buttonRef = useRef();
  const menuRef = useRef();
  const [menuHeight, setMenuHeight] = useState(0);
  const [, setForceUpdate] = useState(0);

  useLayoutEffect(() => {
    setMenuHeight(MENU_LIST_MAX_HEIGHT);
  }, []);

  function calculatePlacement() {
    const buttonEl = buttonRef.current;
    const windowHeight = window.innerHeight;
    const buttonElRect = buttonEl?.getBoundingClientRect();

    const withinWindow =
      buttonElRect?.y + buttonEl?.offsetHeight + menuHeight < windowHeight;

    return withinWindow ? "bottom-start" : "top-start";
  }

  useEffect(() => {
    function updateMenuPosition() {
      setForceUpdate((count) => count + 1);
    }

    // Debounce the listener for better
    // scroll performance.
    // Should also listen for window resize events.
    window.addEventListener("scroll", updateMenuPosition);

    return () => {
      window.removeEventListener("scroll", updateMenuPosition);
    };
  }, []);

  const menuPlacement = calculatePlacement();

  return (
    <Menu
      placement={menuPlacement}
      onOpen={() => {
        setMenuState("main");
      }}
    >
      <MenuToggle ref={buttonRef}>
        <Avatar
          backgroundColor={colorStyle.background.secondary}
          color={colorStyle.color.secondary}
          _hover={{
            color: colorStyle.color.primary,
          }}
        >
          <Icon icon="user-team" size="5x" />
        </Avatar>
      </MenuToggle>
      <MenuList
        ref={menuRef}
        width="max-content"
        maxHeight={120}
        overflow="auto"
      >
        <Box display={menuState === "main" ? "block" : "none"}>
          <MenuItem>
            <Flex flex="none" mr="3x">
              <Icon icon="settings" />
            </Flex>
            <Flex flex="auto">
              <Text>Settings</Text>
            </Flex>
          </MenuItem>
          <MenuItem>
            <Flex flex="none" mr="3x">
              <Icon icon="user-team" />
            </Flex>
            <Flex flex="auto">
              <Text>Accounts</Text>
            </Flex>
          </MenuItem>
          <MenuItem>
            <Flex flex="none" mr="3x">
              <Icon icon="lock" />
            </Flex>
            <Flex flex="auto">
              <Text>Privacy control</Text>
            </Flex>
          </MenuItem>
          <MenuItem>
            <Flex flex="none" mr="3x">
              <Icon icon="lock" />
            </Flex>
            <Flex flex="auto">
              <Text>Privacy control 2</Text>
            </Flex>
          </MenuItem>
          <MenuItem>
            <Flex flex="none" mr="3x">
              <Icon icon="lock" />
            </Flex>
            <Flex flex="auto">
              <Text>Privacy control 3</Text>
            </Flex>
          </MenuItem>
        </Box>
      </MenuList>
    </Menu>
  );
};

export default MyMenu;
