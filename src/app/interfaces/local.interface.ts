export enum LocalTypes {
    LOCAL_USER= "chat-app__user",
    LOCAL_MESSAGES= "chat-app__message-list",
}

export interface ILocal {
    type: LocalTypes
}
