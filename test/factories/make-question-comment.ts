import { QuestionComment, QuestionCommentProps } from "../../src/domain/forum/enterprise/entities/question-comment"

export function makeQuestionComment(override: Partial<QuestionCommentProps> = {}, id?: string) {
  const questionComment = new QuestionComment({
    authorId: "123",
    questionId: "123",
    content: "content",
    createdAt: new Date(),
    ...override
  }, id)

  return questionComment
}