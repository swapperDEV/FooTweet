export type ReplyProps = {
    reply: {
        creatorName: string,
        comment: string,
        replyId: string,
        creatorId: string,
    },
    deleteReply: Function
}