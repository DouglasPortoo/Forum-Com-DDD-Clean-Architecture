import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository";

import { makeAnswer } from "../../../../../test/factories/make-answer";
import { EditAnswerUseCase } from "./edit-awnser";



let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe(" Edit Answer Use Case  ", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it("should be albe edit a answer", async () => {
    const newAnswer = makeAnswer({
      authorId: '123',
    }, 'answer-1')

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: '123',
      answerId: newAnswer.Id,
      content: 'new content'
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'new content'
    })

  })

  it("should not be albe edit a answer from another user", async () => {
    const newAnswer = makeAnswer({
      authorId: '123',
    }, 'answer-1')

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        authorId: '124',
        answerId: newAnswer.Id,
        content: 'new content'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})