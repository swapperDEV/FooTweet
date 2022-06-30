export type CommentsProps = {
    type: String, 
    post: {
        data: {
            interaction: {
                comments: Array<{
                    likes: Array<string>
                    commentId: string,
                    comment: String,
                    creatorName: string,
                    commentReply: Array<{comment: string, creatorId: string, creatorName: string, creatorDate: string, replyId: string}>
                    creatorId: string,
                    createDate: number,
                }>,
                likes: Array<string>
            }
            metaData: {
                postId: string,
            },
            creator: {
                uId: string,
            }
        }
    }
    fbCtx: {
        currentUser: {
            uid: string,
        }
    }
    userCtx: {
        data: {
            username: string,
        }
    },
    commentCreateView: boolean,
}