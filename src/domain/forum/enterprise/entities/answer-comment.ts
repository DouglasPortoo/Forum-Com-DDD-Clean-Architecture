import { Comment, CommentProps } from "./comment"

interface AnswerCommentProps extends CommentProps{
  answerId: string
}

export class AnswerComment extends Comment<AnswerCommentProps>{
  props: AnswerCommentProps; 

  constructor(props: AnswerCommentProps) {
    super(props);
    this.props = props; 
  }

  get AnswerId() {
    return this.props.answerId;
  }
}