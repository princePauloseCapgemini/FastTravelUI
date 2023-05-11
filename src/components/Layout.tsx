import { FC } from "react";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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
  const JWT = Cookies.get("jwt");
  const handleLogout = () => {
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
          <Heading size="md" color="grey">
            {title}
          </Heading>
          {rightElement ? rightElement : null}
        </Flex>
        {JWT && <Button onClick={() => handleLogout()}>Logout</Button>}
      </Flex>
      <Box>{children}</Box>
    </Box>
  );
};
