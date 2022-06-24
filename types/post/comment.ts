export type CommentProps = {
    comment: {
        likes: Array<string>
        commentId: string,
        comment: String,
        creatorName: string,
        commentReply: Array<Object>
        creatorId: string,
    }
    post: {
        data: {
            interaction: {
                likes: Array<string>
                comments: Array<any>
            }
            metaData: {
                postId: string
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
            username: String
        }
    },
    deleteComment: Function
}

export type table = {
    commentId: string,
    creatorId: string,
    commentReply: Array<String>,
    replyId: String,
}