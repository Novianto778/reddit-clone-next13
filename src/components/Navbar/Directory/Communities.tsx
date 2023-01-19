import { MenuItem, Flex, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import CreateCommunityModal from '../../Modal/CreateCommunity/CreateCommunityModal';
import { GrAdd } from 'react-icons/gr';

type Props = {};

const Communities = (props: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
            <MenuItem>
                <Flex
                    align="center"
                    width="100%"
                    fontSize="10pt"
                    _hover={{ bg: 'gray.100' }}
                    onClick={() => setOpen(true)}
                >
                    <Flex alignItems="center">
                        <Icon fontSize={20} mr={2} as={GrAdd} />
                        Create Community
                    </Flex>
                </Flex>
            </MenuItem>
        </div>
    );
};

export default Communities;
