export const getChatId = (firstId: string | undefined, secondId: string | undefined): string => [firstId, secondId].sort().join('');

export const getCollocutorId = (userId: string | undefined, chatId: string | undefined): string => {
    return (userId && chatId) ? chatId.split(userId).join('') : '';
}

export const getTime = () => new Date().toTimeString().slice(0, 5);