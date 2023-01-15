'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@chakra/theme';

type Props = {
    children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default Providers;
