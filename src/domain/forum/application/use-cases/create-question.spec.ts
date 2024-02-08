import { beforeEach, describe, expect, it } from "vitest";
import { CreatQuestionUseCase } from "./create-question";

import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";

let questionRepository: InMemoryQuestionsRepository
let sut : CreatQuestionUseCase

describe("Create Question", () => {

  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new CreatQuestionUseCase(questionRepository)
  })

  it("should be able to create a question", async () => {

    const { question } = await sut.execute({
      authorId: "123",
      content: "content",
      title: "A volta dos que não foram"
    })
  
    console.log(question)
  
    expect(question.Id).toBeTruthy()
  })
})

