import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAwnsersRepository } from "../../../../../test/repositories/in-memory-awnsers-repository";
import { EditAwnserUseCase } from "./edit-awnser";
import { makeAwnser } from "../../../../../test/factories/make-awnser";


let inMemoryAwnsersRepository: InMemoryAwnsersRepository
let sut: EditAwnserUseCase

describe(" Edit Awnser Use Case  ", () => {
  beforeEach(() => {
    inMemoryAwnsersRepository = new InMemoryAwnsersRepository()
    sut = new EditAwnserUseCase(inMemoryAwnsersRepository)
  })

  it("should be albe edit a awnser", async () => {
    const newAwnser = makeAwnser({
      authorId: '123',
    }, 'awnser-1')

    await inMemoryAwnsersRepository.create(newAwnser)

    await sut.execute({
      authorId: '123',
      awnserId: newAwnser.Id,
      content: 'new content'
    })

    expect(inMemoryAwnsersRepository.items[0]).toMatchObject({
      content: 'new content'
    })

  })

  it("should not be albe edit a awnser from another user", async () => {
    const newAwnser = makeAwnser({
      authorId: '123',
    }, 'awnser-1')

    await inMemoryAwnsersRepository.create(newAwnser)

    expect(() => {
      return sut.execute({
        authorId: '124',
        awnserId: newAwnser.Id,
        content: 'new content'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})