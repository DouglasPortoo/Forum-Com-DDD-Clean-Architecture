import { Answer, AnswerProps } from "../../src/domain/forum/enterprise/entities/awnser"


export function makeAnswer(override: Partial<AnswerProps> = {}, id?: string) {
  const answer = new Answer({
    authorId: "123",
    questionId: "123",
    content: "content",
    createdAt: new Date(),
    ...override
  }, id)

  return answer
}

