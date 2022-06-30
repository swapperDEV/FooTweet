export type DataType = {
    data: {
           metaData: {
               createDate: number,
               postId: string,
           }
           content: {
               description: string,
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
           },
           retweets: Array<string>
       },
   }
export type PostProps = {
    data: DataType,
    type: String,
    avatar: boolean,
}
   
export type Event = any