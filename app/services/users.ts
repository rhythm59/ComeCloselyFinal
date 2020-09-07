import firestore from '@react-native-firebase/firestore';
import { generateNewChatRoomKey } from '../utils';

export {
    getUser
}
const getUser = async (userKey: string) => {
    try {
        const roomRef = firestore().collection('chatrooms').doc(userKey);
        const doc = await roomRef.get();
        if (!doc.exists) {           
            return false
        } else {
            return { ...doc.data(), id: doc.id }
        }

    } catch (error) {
        return false
    }
} 