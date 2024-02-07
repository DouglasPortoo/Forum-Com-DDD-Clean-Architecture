import { expect, test } from "vitest";
import { QuestionRepository } from "../repositories/question-repository";
import { CreatQuestionUseCase } from "./create-question";

const fakeQuestionRepository: QuestionRepository = {
  create: async (question) => { }
}

test("crate a question", async () => {
  const createQuestion = new CreatQuestionUseCase(fakeQuestionRepository)

  const { question } = await createQuestion.execute({
    authorId: "123",
    content: "content",
    title: "A volta dos que não foram"
  })

  console.log(question)

  expect(question.Id).toBeTruthy()
  })