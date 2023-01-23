'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@chakra/theme';
import { RecoilRoot } from 'recoil';

type Props = {
    children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
    return (
        <RecoilRoot>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </RecoilRoot>
    );
};

export default Providers;
