import { FC } from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

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
  return (
    <Box
      backgroundImage={`url(${bgImage})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      width="100vw"
      height="100vh"
    >
      <Flex
        bgColor="white"
        py="6"
        px="8"
        dir="row"
        justifyContent="space-between"
      >
        <Heading size="md" color="grey">
          {title}
        </Heading>
        {rightElement ? rightElement : null}
      </Flex>
      {children}
    </Box>
  );
};
