import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAwnsersRepository } from "../../../../../test/repositories/in-memory-awnsers-repository";
import { DeleteAwnserUseCase } from "./delete-awnser";
import { makeAwnser } from "../../../../../test/factories/make-awnser copy";


let inMemoryAwnsersRepository: InMemoryAwnsersRepository
let sut: DeleteAwnserUseCase

describe("Delete Awnser", () =>{
  beforeEach(()=>{
    inMemoryAwnsersRepository = new InMemoryAwnsersRepository()
    sut = new DeleteAwnserUseCase(inMemoryAwnsersRepository)
  })

  it('should delete a awnser', async () =>{
    const newAwnser = makeAwnser({authorId:'author-1',questionId: 'question-1'},'awnser-1')
    
    await inMemoryAwnsersRepository.create(newAwnser)

    await sut.execute({
      authorId:'author-1',
      awnserId:'awnser-1',
      questionId: 'question-1'
    })

    expect(inMemoryAwnsersRepository.items.length).toBe(0)

  })

  it('should not be able to delete a awnser from another user', async () => {
    const newAwnser = makeAwnser({authorId:'author-1',questionId: 'question-1'},'awnser-1')

    await inMemoryAwnsersRepository.create(newAwnser)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        awnserId: 'awnser-1',
        questionId: 'question-1'
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to delete a awnser from another question', async () => {
    const newAwnser = makeAwnser({authorId:'author-1',questionId: 'question-1'},'awnser-1')

    await inMemoryAwnsersRepository.create(newAwnser)

    expect(() => {
      return sut.execute({
        authorId: 'author-1',
        awnserId: 'awnser-1',
        questionId: 'question-2'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})