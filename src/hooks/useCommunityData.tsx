import { useEffect, useState } from 'react';
import {
    Community,
    CommunitySnippet,
    communityState,
} from '@atoms/communitiesAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@firebase/clientApp';
import {
    collection,
    doc,
    getDocs,
    increment,
    writeBatch,
} from 'firebase/firestore';
import { authModalState } from '../atoms/authModalAtom';

const useCommunityData = () => {
    const [user] = useAuthState(auth);
    const [communityStateValue, setCommunityStateValue] =
        useRecoilState(communityState);
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onJoinOrLeaveCommunity = (
        communityData: Community,
        isJoined: boolean
    ) => {
        // is the user signed in?
        // if not, open auth modal
        if (!user) {
            setAuthModalState({
                open: true,
                view: 'login',
            });
            return;
        }

        if (isJoined) {
            leaveCommunity(communityData.id);
            return;
        }
        joinCommunity(communityData);
    };

    const getMySnippets = async () => {
        setLoading(true);
        try {
            const snippetDocs = await getDocs(
                collection(firestore, `users/${user?.uid}/communitySnippets`)
            );

            const snippets = snippetDocs.docs.map((doc) => ({
                ...doc.data(),
            }));
            setCommunityStateValue((prevState) => ({
                ...prevState,
                mySnippets: snippets as CommunitySnippet[],
            }));
        } catch (error) {
            console.log('getMySnippets error', error);
        }
        setLoading(false);
    };

    const joinCommunity = async (communityData: Community) => {
        // batch write
        // // creating a new community snippet
        // // update the number of member
        try {
            const batch = writeBatch(firestore);
            const newSnippet: CommunitySnippet = {
                communityId: communityData.id,
                imageURL: communityData.imageURL || '',
            };
            batch.set(
                doc(
                    firestore,
                    `users/${user?.uid}/communitySnippets`,
                    communityData.id
                ),
                newSnippet
            );

            batch.update(doc(firestore, 'communities', communityData.id), {
                numberOfMembers: increment(1),
            });
            await batch.commit();
            // update recoil state - communityState.mySnippets
            setCommunityStateValue((prevState) => ({
                ...prevState,
                mySnippets: [...prevState.mySnippets, newSnippet],
            }));
        } catch (error: any) {
            console.log('joinCoummnity error', error);
            setError(error.message);
        }
    };

    const leaveCommunity = async (communityId: string) => {
        // batch write
        // // deleting the community smippet form user
        // // update the number of member (-1)

        // update recoil state - communityState.mySnippets
        try {
            const batch = writeBatch(firestore);
            batch.delete(
                doc(
                    firestore,
                    `users/${user?.uid}/communitySnippets`,
                    communityId
                )
            );
            batch.update(doc(firestore, 'communities', communityId), {
                numberOfMembers: increment(-1),
            });
            await batch.commit();

            setCommunityStateValue((prevState) => ({
                ...prevState,
                mySnippets: prevState.mySnippets.filter(
                    (snippet) => snippet.communityId !== communityId
                ),
            }));
        } catch (error: any) {
            console.log('leaveCommunity error', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            getMySnippets();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading,
    };
};

export default useCommunityData;
