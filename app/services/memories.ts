import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export {
    getMemories, saveMemory, getMemoryTags,
    updateMemoryById, likeDislikeMemory, addCommentToMemory,
    likeDislikeCommentOnMemory
}
const addCommentToMemory = async (message: string, memoryData: any, user: any) => {
    try {
        const now = Date.now();
        const memoriesRef = firestore().collection('memoryComments').doc();
        let data: any = {
            memoryId: memoryData.id,
            message,
            createdAt: now,
            updatedAt: now,
            likedByUsers: "",
            userAvatar: user?.displayPhoto,
            userName: user?.name,
        };
        await memoriesRef.set(data)
        return await updateMemoryById(memoryData.id, {
            commentsCounter: memoryData.commentsCounter ? memoryData.commentsCounter + 1 : 1,
            updatedAt: Date.now()
        })
    } catch (error) {
        return error
    }
}
const likeDislikeCommentOnMemory = async (commentData: any) => {
    try {
        let userId = auth().currentUser?.uid
        let { id, likedByUsers = '', ...rest } = commentData;
        likedByUsers = likedByUsers?.split(",")
        const index = likedByUsers?.indexOf(userId);
        if (userId && index > -1) {//dislike  
            likedByUsers.splice(index, 1);
            likedByUsers = likedByUsers.join()
        }
        else if (userId) {//like  
            likedByUsers = likedByUsers.join()
            likedByUsers = likedByUsers ? (likedByUsers + ',' + userId) : (userId + "");
        }
        const memoriesRef = firestore().collection('memoryComments').doc(id);        
        return await memoriesRef.update({ likedByUsers })
    } catch (error) {        
        return error;
    }
}
const likeDislikeMemory = async (memoryData: any) => {
    try {
        let userId = auth().currentUser?.uid
        let { id, likedByUsers = '', ...rest } = memoryData;
        likedByUsers = likedByUsers?.split(",")
        const index = likedByUsers?.indexOf(userId);
        if (userId && index > -1) {//like             
            likedByUsers.splice(index, 1);
            return await updateMemoryById(memoryData.id, {
                ...rest,
                likedByUsers: likedByUsers ? likedByUsers.join() : '',
                updatedAt: Date.now()
            })
        }else if (userId) {//like  
            likedByUsers = likedByUsers.join()
            likedByUsers = likedByUsers ? (likedByUsers + ',' + userId) : (userId + "")
            return await updateMemoryById(memoryData.id, {
                ...rest,
                likedByUsers,
                updatedAt: Date.now()
            })
        }
    } catch (error) {
        return error;
    }
}
const getMemoryTags = async () => {
    return await firestore()
        .collection('memoryTags')
        .get()
        .then(FORMAT_DATA)
        .catch(e => e)
}
const updateMemoryById = async (id: string, data: any) => {
    try {
        const memoriesRef = firestore().collection('memories').doc(id);
        await memoriesRef.update(data)
        return true;
    } catch (error) {
        console.error(error)
        return false;
    }
}
const saveMemory = async (data: any) => {
    try {
        const now = Date.now();
        const { userId } = data;
        const memoImageReference = storage().ref(`memoriesImages/memo-${userId}-${now}.png`);
        await memoImageReference.putFile(data.image);
        data.image = await memoImageReference.getDownloadURL();
        const memoriesRef = firestore().collection('memories').doc();
        data = {
            ...data,
            createdAt: now,
            updatedAt: now,
            likedByUsers: "",
            commentsCounter: 0
        };
        await memoriesRef.set(data);
        return data;
    } catch (error) {
        return error
    }
}
const getMemories = async () => {
    return await firestore()
        .collection('memories')
        .get()
        .then(FORMAT_DATA)
        .catch(e => e)
}

function FORMAT_DATA(querySnapshot: any) {
    let res: any[] = [];
    querySnapshot.forEach((documentSnapshot: any) => (
        res.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
        })
    ));
    return res;
}