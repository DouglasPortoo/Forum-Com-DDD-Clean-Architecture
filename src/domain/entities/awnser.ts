import { randomUUID } from "node:crypto";

interface AwnserProps {
  content: string;
  authorId: string;
  questionId: string;
}

export class Awnser {

  public id: string;
  public content: string;
  public authorId: string;
  public questionId: string;

  constructor(props:AwnserProps, id?: string) {
    this.id = id ?? randomUUID();
    this.content = props.content;
    this.authorId = props.authorId;
    this.questionId = props.questionId;
  }
}