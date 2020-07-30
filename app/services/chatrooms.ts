import firestore from '@react-native-firebase/firestore';
import { generateNewChatRoomKey } from '../utils';

export {
    getChatroomByUsers
}
const getChatroomByUsers = async (userKey: string, otherUserKey: string) => {
    try {
        let chatroomKey = generateNewChatRoomKey(userKey, otherUserKey)
        const roomRef = firestore().collection('chatrooms').doc(chatroomKey);
        const doc = await roomRef.get();
        if (!doc.exists) {
            console.log('No such document!');
            return false
        } else {
            return { ...doc.data(), id: doc.id }
        }

    } catch (error) {
        console.log(error)
        return false
    }
} 