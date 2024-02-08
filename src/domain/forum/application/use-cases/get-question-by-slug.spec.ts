
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { Question } from "../../enterprise/entities/question";
import { makeQuestion } from "../../../../../test/factories/make-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it("should return a question by slug", async () => {

    const newQuestion = makeQuestion({
      slug: Slug.createFromText("teste slug")
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: "teste-slug"
    })

    expect(question.Slug).toEqual(newQuestion.Slug)
  })
})