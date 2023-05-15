import { FC, useMemo } from "react";

import { useMutation } from "@apollo/client";
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
import { LOGOUT_USER } from "../graphqlOperation/mutation";

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
  const [logout] = useMutation(LOGOUT_USER);

  const toast = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const JWT = Cookies.get("jwt");

  const userInfo = useMemo(() => {
    return typeof JWT === "string" ? JSON.parse(JWT) : {};
  }, [JWT]);

  const handleLogout = async () => {
    await logout({
      variables: { userData: { emailAddress: userInfo?.emailAddress } },
    })
      .then(() => {
        Cookies.remove("jwt");
        navigate("/");
        toast({
          title: "Logged in successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: error.message || "Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
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
