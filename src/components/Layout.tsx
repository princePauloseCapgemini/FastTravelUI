import { FC } from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

interface LayoutProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  rightElement?: JSX.Element | JSX.Element[];
}

export const Layout: FC<LayoutProps> = ({ rightElement, title, children }) => {
  return (
    <Box>
      <Flex
        bgColor="black"
        py="6"
        px="8"
        dir="row"
        justifyContent="space-between"
      >
        <Heading size="md" color="white">
          {title}
        </Heading>
        {rightElement ? rightElement : null}
      </Flex>
      {children}
    </Box>
  );
};
