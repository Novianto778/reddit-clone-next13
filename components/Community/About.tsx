'use client';
import { Community, communityState } from '@atoms/communitiesAtom';
import {
    Box,
    Button,
    Divider,
    Flex,
    Icon,
    Image,
    Spinner,
    Stack,
    Text,
} from '@chakra-ui/react';
import { auth, firestore, storage } from '@firebase/clientApp';
import useSelectFile from '@hooks/useSelectFile';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import moment from 'moment';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaReddit } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiCakeLine } from 'react-icons/ri';
import { useSetRecoilState } from 'recoil';

type Props = {
    communityData: Community;
};

const About = ({ communityData }: Props) => {
    const [user] = useAuthState(auth);
    const selectFileRef = useRef<HTMLInputElement>(null);
    const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
    const setCommunityStateValue = useSetRecoilState(communityState);
    const [imageLoading, setImageLoading] = useState(false);

    const updateImage = async () => {
        if (!selectedFile) return;
        setImageLoading(true);
        try {
            const imageRef = ref(
                storage,
                `communities/${communityData.id}/image`
            );
            await uploadString(imageRef, selectedFile, 'data_url');
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(firestore, 'communities', communityData.id), {
                imageURL: downloadURL,
            });
            console.log('HERE IS DOWNLOAD URL', downloadURL);

            // April 24 - added state update
            setCommunityStateValue((prev) => ({
                ...prev,
                currentCommunity: {
                    ...prev.currentCommunity,
                    imageURL: downloadURL,
                },
            }));
        } catch (error: any) {
            console.log('updateImage error', error.message);
        }

        setImageLoading(false);
    };
    return (
        <Box position="sticky" top="14px">
            <Flex
                justify="space-between"
                align="center"
                p={3}
                color="white"
                bg="blue.400"
                borderRadius="4px 4px 0px 0px"
            >
                <Text fontSize="10pt" fontWeight={700}>
                    About Community
                </Text>
                <Icon as={HiOutlineDotsHorizontal} cursor="pointer" />
            </Flex>
            <Flex
                direction="column"
                p={3}
                bg="white"
                borderRadius="0px 0px 4px 4px"
            >
                <Stack spacing={2}>
                    <Flex width="100%" p={2} fontWeight={600} fontSize="10pt">
                        <Flex direction="column" flexGrow={1}>
                            <Text>
                                {communityData?.numberOfMembers?.toLocaleString()}
                            </Text>
                            <Text>Members</Text>
                        </Flex>
                        <Flex direction="column" flexGrow={1}>
                            <Text>1</Text>
                            <Text>Online</Text>
                        </Flex>
                    </Flex>
                    <Divider />
                    <Flex
                        align="center"
                        width="100%"
                        p={1}
                        fontWeight={500}
                        fontSize="10pt"
                    >
                        <Icon as={RiCakeLine} mr={2} fontSize={18} />
                        {communityData?.createdAt && (
                            <Text>
                                Created{' '}
                                {moment(
                                    new Date(
                                        communityData.createdAt.seconds * 1000
                                    )
                                ).format('MMM DD, YYYY')}
                            </Text>
                        )}
                    </Flex>
                    {!false && (
                        <Link href={`/r/${communityData.id}/submit`}>
                            <Button mt={3} height="30px">
                                Create Post
                            </Button>
                        </Link>
                    )}
                    {user?.uid === communityData?.creatorId && (
                        <>
                            <Divider />
                            <Stack fontSize="10pt" spacing={1}>
                                <Text fontWeight={600}>Admin</Text>
                                <Flex align="center" justify="space-between">
                                    <Text
                                        color="blue.500"
                                        cursor="pointer"
                                        _hover={{ textDecoration: 'underline' }}
                                        onClick={() =>
                                            selectFileRef.current?.click()
                                        }
                                    >
                                        Change Image
                                    </Text>
                                    {communityData?.imageURL || selectedFile ? (
                                        <Image
                                            borderRadius="full"
                                            boxSize="40px"
                                            src={
                                                selectedFile ||
                                                communityData?.imageURL
                                            }
                                            alt="Dan Abramov"
                                        />
                                    ) : (
                                        <Icon
                                            as={FaReddit}
                                            fontSize={40}
                                            color="brand.100"
                                            mr={2}
                                        />
                                    )}
                                </Flex>
                                {selectedFile &&
                                    (imageLoading ? (
                                        <Spinner />
                                    ) : (
                                        <Text
                                            cursor="pointer"
                                            onClick={updateImage}
                                        >
                                            Save Changes
                                        </Text>
                                    ))}
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/x-png,image/gif,image/jpeg"
                                    hidden
                                    ref={selectFileRef}
                                    onChange={onSelectFile}
                                />
                            </Stack>
                        </>
                    )}
                </Stack>
            </Flex>
        </Box>
    );
};

export default About;