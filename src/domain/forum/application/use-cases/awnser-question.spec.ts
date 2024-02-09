import { beforeEach, describe, expect, it, test } from "vitest"
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository"
import { AnswerQuestionUseCase } from "./awnser-question"

let AnswerRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe("Answer Question", () => {
  beforeEach(() => {
    AnswerRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(AnswerRepository)
  })
  it("should be able to create a answer", async () => {

    const { answer } = await sut.execute({
      content: "any_content",
      instructorId: "any_instructor_id",
      questionId: "any_question_id"
    })

    expect(answer.Content).toBe("any_content")
  })
})
