export type DescriptionProps = {
    time: String, 
    post: {
        data: {
            creator: {
                uId: String,
                name: String,
                username: String,
            }
        }
    }
    openSettings: Function, 
    widgetClass: string, 
    closeSettings: Function,
    deletePost: Function, 
    fbCtx: {
        currentUser: {
            uid: String,
        }
    }
}