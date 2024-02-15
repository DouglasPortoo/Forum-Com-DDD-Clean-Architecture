import { randomUUID } from "crypto"

export interface QuestionCommentProps {
    authorId: string
    questionId: string
    content: string
    createdAt: Date
    updatedAt?: Date
}

export class QuestionComment {
    private id: string;
    private authorId: string
    private questionId: string
    private content: string
    private createdAt: Date
    private updatedAt?: Date

    constructor(props: QuestionCommentProps,id?: string) {
        this.id = id ?? randomUUID();
        this.authorId = props.authorId
        this.questionId = props.questionId
        this.content = props.content
        this.createdAt = props.createdAt
        this.updatedAt = props.updatedAt
    }

    get Id() {
        return this.id
    }

    get AuthorId() {
        return this.authorId
    }

    get QuestionId() {
        return this.questionId
    }

    get Content() {
        return this.content
    }

    get CreatedAt() {
        return this.createdAt
    }

    get UpdatedAt() {
        return this.updatedAt
    }

    get excerpt() {
        return this.content
            .substring(0, 120)
            .trimEnd()
            .concat('...')
    }

    private touch() {
        this.updatedAt = new Date()
    }

    set Content(content: string) {
        this.content = content
        this.touch()
    }
}