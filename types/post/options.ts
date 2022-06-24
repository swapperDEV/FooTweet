export type OptionProps = {
    openCommentCreate: Function,
    post: {
        data: {
            interaction: {
                comments: Array<String> 
                likes: Array<string>
            }
            metaData: {
                postId: string, 
            }
            creator: {
                uId: string,
            }
            retweets: Array<String>,
        }
    }
    fbCtx: {
        currentUser: {
            uid: string
        }
    }
    heartActive: any, 
    wrapperClass: any, 
    commentCreateView: boolean,
    commentActive: any,
    redirectToPost: Function,
    pType: String,
    retweetActive: any,
}