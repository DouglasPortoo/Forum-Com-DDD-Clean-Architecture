import { randomUUID } from "node:crypto";
import { Slug } from "./value-objects/slug";

export interface QuestionProps {
  title: string;
  content: string;
  slug: Slug;
  authorId: string;
  bestAnswerId?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question {
  private id: string;
  private title: string;
  private content: string;
  private slug: Slug
  private authorId: string;
  private bestAnswerId?: string;
  private createdAt: Date;
  private updatedAt?: Date;

  constructor(props: QuestionProps, id?: string) {
    this.id = id ?? randomUUID();
    this.title = props.title;
    this.content = props.content;
    this.slug = props.slug;
    this.authorId = props.authorId;
    this.bestAnswerId = props.bestAnswerId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  // Getters

  get Title() {
    return this.title
  }

  get Content() {
    return this.content
  }

  get Slug() {
    return this.slug
  }

  get AuthorId() {
    return this.authorId
  }

  get BestAnswerId() {
    return this.bestAnswerId
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

  get Id() {
    return this.id
  }

  private touch() {
    this.updatedAt = new Date()
  }

  set Content(content: string) {
    this.content = content
    this.touch()
  }

  set Title(title: string) {
    this.title = title
    this.slug = Slug.createFromText(title)
    this.touch()
  }

  set BestAnswerId(answerId: string | undefined) {
    this.bestAnswerId = answerId
    this.touch()
  }
}