export enum RequestTypes {
    CONNECT_WALLET = 'REQ_CONNECT_WALLET',
    CHANGE_EMOJI = 'REQ_CHANGE_EMOJI',
    ENABLE_CHAT = 'REQ_ENABLE_CHAT',
    ENABLE_CHAT_DETAIL = 'REQ_ENABLE_CHAT_DETAIL',
}
export enum ResponseTypes {
    CONNECT_WALLET = 'RES_CONNECT_WALLET',
    CHANGE_EMOJI = 'RES_CHANGE_EMOJI',
    ENABLE_CHAT = 'RES_ENABLE_CHAT',
    ENABLE_CHAT_DETAIL = 'RES_ENABLE_CHAT_DETAIL',
}

// Background script request type
export interface Requests {
    type: RequestTypes
    message?: ChangeEmojiMsg | EnableChatDetailMsg | UpdateWalletAddress | null

}

export interface Responses {
    type: ResponseTypes
    message?: EnableChatDetailMsg | ChangeEmojiMsg | UpdateWalletAddress | null
}

export interface EnableChatDetailMsg {
    isShowChat: boolean
    contactInfo: ContactInfo
    roomId: string
}

export interface ChangeEmojiMsg {
    emoji: string
    isSameEmoji: boolean
}

export interface UpdateWalletAddress {
    wAddress: string;
}
// Background script response type
export interface ServiceWorkerResponse {
    type: ResponseTypes
}

export interface ContactInfo {
    name: string
    avatar: string
    domain: string
    id: number,
    waitingMess: string,
    time: string,
    address: string,
    mess: [
        {
            title: string,
            id: number,
        },
    ],
}

export interface UserSetting {
    isSameEmoji: boolean,
    fellowSoldiers: string[],
    customEmojiLink: string,
    defaultLink: string
}