export type CommentsProps = {
    type: String, 
    post: {
        data: {
            interaction: {
                comments: Array<any>,
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