export const generateNewChatRoomKey = (userKey: string, otherUserKey: string) => {
  //always returns same string for a cobination of two users in any order
  let string = (userKey < otherUserKey ? userKey + '_' + otherUserKey : otherUserKey + '_' + userKey);
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    let char = string.charCodeAt(i);
    hash = ((hash << 10) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return 'chat_' + Math.abs(hash);
}