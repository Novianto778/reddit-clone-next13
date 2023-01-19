import CreatePostLink from '@components/Community/CreatePostLink';
import PageContent from '@components/Layout/PageContent';
import { Community } from '@atoms/communitiesAtom';
import Header from '@components/Community/Header';
import { firestore } from '@firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import Posts from '@components/Post/Posts';

type Props = {
    params: {
        communityId: string;
    };
};

const getCommunityData = async (communityId: string) => {
    try {
        const communityDocRef = doc(firestore, 'communities', communityId);
        const communityDoc = await getDoc(communityDocRef);
        if (!communityDoc.exists()) return null;
        return { id: communityDoc.id, ...communityDoc.data() } as Community;
    } catch (error) {
        console.error(error);
    }
};

const CommunityPage = async ({ params }: Props) => {
    const { communityId } = params;

    const communityData = await getCommunityData(communityId);
    if (!communityData) return notFound();

    return (
        <>
            <Header communityData={JSON.parse(JSON.stringify(communityData))} />
            <PageContent>
                <>
                    <CreatePostLink params={params} />
                    <Posts
                        communityData={JSON.parse(
                            JSON.stringify(communityData)
                        )}
                    />
                </>
                <>
                    <div>Right</div>
                </>
            </PageContent>
        </>
    );
};

export default CommunityPage;
