'use client';
import PageContent from '@components/Layout/PageContent';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import NewPostForm from '@components/Post/NewPostForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@firebase/clientApp';

type Props = {
    params: {
        communityId: string;
    };
};

const SubmitPost = ({ params: { communityId } }: Props) => {
    const [user] = useAuthState(auth);

    return (
        <PageContent>
            <>
                <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
                    <Text fontWeight={600}>Create a post</Text>
                </Box>
                {user && <NewPostForm user={user} communityId={communityId} />}
                {/* {user && (
                    <NewPostForm
                        communityId={communityStateValue.currentCommunity.id}
                        communityImageURL={
                            communityStateValue.currentCommunity.imageURL
                        }
                        user={user}
                    />
                )} */}
            </>
            <></>
        </PageContent>
    );
};

export default SubmitPost;
