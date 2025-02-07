import { tag } from "./tag"

export interface post{
    id: string
    title : string
    content: string
    tags: tag[]
}