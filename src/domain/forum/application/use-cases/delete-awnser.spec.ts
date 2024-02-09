import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository";

import { makeAnswer } from "../../../../../test/factories/make-awnser";
import { DeleteAnswerUseCase } from "./delete-awnser";



let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe("Delete Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should delete a answer', async () => {
    const newAnswer = makeAnswer({ authorId: 'author-1', questionId: 'question-1' }, 'answer-1')

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
      questionId: 'question-1'
    })

    expect(inMemoryAnswersRepository.items.length).toBe(0)

  })

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer({ authorId: 'author-1', questionId: 'question-1' }, 'answer-1')

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: 'answer-1',
        questionId: 'question-1'
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to delete a answer from another question', async () => {
    const newAnswer = makeAnswer({ authorId: 'author-1', questionId: 'question-1' }, 'answer-1')

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        authorId: 'author-1',
        answerId: 'answer-1',
        questionId: 'question-2'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})