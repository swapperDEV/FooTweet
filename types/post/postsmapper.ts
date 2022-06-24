export type PostsProps = {
    requirements: any,
    requirementsType: string | undefined,
}


export type PostListType = {
    data: {
        metaData: {
            createDate: number,
            postId: string,
        }
        content: {
            description: String,
            hashtag: Array<String>,
            haveImg: boolean,
        }
        creator: {
            email: string,
            name: string,
            uId: string,
            username: string,
        }
        interaction: {
            comments: Array<any>
            likes: Array<string>
        }
    },
    id: string,
}

export interface IPostList {
    data:  {
        content: {
            description: String,
            hashtag: Array<String>
            haveImg: boolean,
        }
        metaData: {
            createDate: number,
            postId: string,
        }
    }
}
