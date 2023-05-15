import { FC, useMemo } from "react";

import {
  Box,
  Flex,
  Heading,
  ButtonGroup,
  Avatar,
  Stack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

interface LayoutProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  rightElement?: JSX.Element | JSX.Element[];
  bgImage?: string;
}

export const Layout: FC<LayoutProps> = ({
  rightElement,
  title,
  children,
  bgImage,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const JWT = Cookies.get("jwt");

  const userInfo = useMemo(() => {
    return typeof JWT === "string" ? JSON.parse(JWT) : {};
  }, [JWT]);

  const handleLogout = async () => {
    Cookies.remove("jwt");
    navigate("/");
  };

  return (
    <Box
      backgroundImage={`url(${bgImage})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      width="100vw"
      height="100vh"
      position="absolute"
      overflowX="auto"
      bgColor="grey"
    >
      <Flex
        bgColor="white"
        py="6"
        px="8"
        dir="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          <Heading
            size="md"
            color="grey"
            cursor="pointer"
            onClick={() => navigate(JWT ? "/book-a-trip" : "/login")}
          >
            {title}
          </Heading>
          {rightElement ? rightElement : null}
        </Flex>
        <ButtonGroup gap="2">
          {!JWT &&
            (function () {
              switch (pathname) {
                case "/login":
                  return (
                    <Button
                      colorScheme="teal"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </Button>
                  );
                case "/signup":
                  return (
                    <Button
                      colorScheme="teal"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                  );
              }
            })()}

          {JWT && (
            <>
              <Stack direction="row" style={{ zIndex: 30 }}>
                <Menu>
                  <MenuButton>
                    <Avatar size="sm" src="https://bit.ly/broken-link" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem fontWeight="semibold" cursor="text">
                      {userInfo?.firstName || ""}
                    </MenuItem>
                    <hr />
                    <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </>
          )}
        </ButtonGroup>
      </Flex>
      <Box>{children}</Box>
    </Box>
  );
};
