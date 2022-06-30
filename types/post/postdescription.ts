export type DescriptionProps = {
    time: string, 
    post: {
        data: {
            creator: {
                uId: string,
                name: string,
                username: string,
            }
        }
    }
    openSettings: Function, 
    widgetClass: string, 
    closeSettings: Function,
    deletePost: Function, 
    fbCtx: {
        currentUser: {
            uid: string,
        }
    }
}