import { Flex } from '@chakra-ui/react';
import AuthModal from '@components/Modal/Auth/AuthModal';
import AuthButtons from './AuthButtons';

type Props = {};

const RightContent = (props: Props) => {
    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center">
                <AuthButtons />
            </Flex>
        </>
    );
};

export default RightContent;
