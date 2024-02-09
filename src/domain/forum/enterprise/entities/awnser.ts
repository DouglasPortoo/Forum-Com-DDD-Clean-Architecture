import { randomUUID } from "node:crypto";

export interface AnswerProps {
  authorId: string;
  questionId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer {

  private id: string;
  private content: string;
  private authorId: string;
  private questionId: string;
  private createdAt: Date;
  private updatedAt?: Date;

  constructor(props: AnswerProps, id?: string) {
    this.id = id ?? randomUUID();
    this.content = props.content;
    this.authorId = props.authorId;
    this.questionId = props.questionId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  get Content() {
    return this.content
  }

  get AuthorId() {
    return this.authorId
  }

  get QuestionId() {
    return this.questionId
  }

  get CreatedAt() {
    return this.createdAt
  }

  get UpdatedAt() {
    return this.updatedAt
  }

  get Id() {
    return this.id
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