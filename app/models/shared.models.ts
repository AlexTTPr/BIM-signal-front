export type Login = {
    username: string,
    password: string
}

export type LoginFields = {
    username?: string,
    password?: string,
    remember?: string
}

export type ConfirmationFileds = {
    code: string
}

export type Response<T> = {
    message: string,
    code: number,
    сodeMessage: string,
    data: T
}

export type LoginTokens = {
    token: string,
    refreshtoken: string
}

export type EventPreview = {
    id: number,
    category: { id: number, name: string },
    description: string,
    eventImage: string,
    startDate: Date,
    title: string,
    location: string
}

export type FeedItem = {
    title: string, 
    description: string
}

export type RegistrationFields = {
    login: string,
    email: string,
    password: string,
    cardID: number,
    code?: string
}

export type Splash = {
    text: string,
    image: string,
    width: string;
    height: string;
}

export type Overlay = {
    open: boolean;
    children: React.ReactNode
}

export type EventComment = {
    id: number;
    content: string;
    creator: string;
    created: Date;
}