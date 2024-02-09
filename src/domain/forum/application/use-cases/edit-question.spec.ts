import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";
import { makeQuestion } from "../../../../../test/factories/make-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe(" Edit Question Use Case  ", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it("should be albe edit a question", async () => {
    const newQuestion = makeQuestion({
      authorId: '123',
    }, 'question-1')

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: '123',
      questionId: newQuestion.Id,
      title: 'new title',
      content: 'new content'
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'new title',
      content: 'new content'
    })

  })

  it("should not be albe edit a question from another user", async () => {
    const newQuestion = makeQuestion({
      authorId: '123',
    }, 'question-1')

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        authorId: '124',
        questionId: newQuestion.Id,
        title: 'new title',
        content: 'new content'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})