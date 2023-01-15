'use client';
import { Flex, Image } from '@chakra-ui/react';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';
type Props = {};

const Navbar = (props: Props) => {
    return (
        <Flex bg="white" height="44px" padding="6px 12px">
            <Flex align="center">
                <Image
                    src="/images/redditFace.svg"
                    height="30px"
                    alt="reddit face"
                />
                <Image
                    src="/images/redditText.svg"
                    height="46px"
                    alt="reddit text"
                    display={{ base: 'none', md: 'block' }}
                />
            </Flex>
            {/* <Directory /> */}
            <SearchInput />
            <RightContent />
        </Flex>
    );
};

export default Navbar;
