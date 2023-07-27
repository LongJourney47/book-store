export type ChatGTPAgent = 'user' | 'system'

export interface ChatGPTMessage {
    role: ChatGTPAgent
    content:string
}
