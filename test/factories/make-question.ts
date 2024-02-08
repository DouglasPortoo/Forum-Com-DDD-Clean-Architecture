import { Question, QuestionProps } from "../../src/domain/forum/enterprise/entities/question";
import { Slug } from "../../src/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(override: Partial<QuestionProps> = {},id?: string) {
  const question = new Question({
    authorId: "123",
    content: "content",
    title: "A volta dos que não foram",
    slug: Slug.createFromText("A volta dos que não foram "),
    createdAt: new Date(),
    ...override
  },id)

  return question
}

