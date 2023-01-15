import { Flex, Button, Text, Image } from '@chakra-ui/react';
import error from 'next/error';
import React from 'react';

type Props = {};

const OAuthButtons = (props: Props) => {
    return (
        <Flex direction="column" mb={4} width="100%">
            <Button
                variant="oauth"
                mb={2}
                // onClick={() => signInWithGoogle()}
                // isLoading={loading}
            >
                <Image
                    src="/images/googlelogo.png"
                    height="20px"
                    mr={4}
                    alt="google icon"
                />
                Continue with Google
            </Button>
            <Button variant="oauth">Some Other Provider</Button>
            {/* {error && (
                <Text textAlign="center" fontSize="10pt" color="red" mt={2}>
                    {error}
                </Text>
            )} */}
        </Flex>
    );
};

export default OAuthButtons;
