export interface CommentProps {
  authorId: string
  content: string
  createdAt: Date
  updatedAt?: Date
}

export abstract class Comment<Props extends CommentProps> {

  private authorId: string
  private content: string
  private createdAt: Date
  private updatedAt?: Date

  constructor(props: Props) {
    this.authorId = props.authorId
    this.content = props.content
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  get AuthorId() {
    return this.authorId
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