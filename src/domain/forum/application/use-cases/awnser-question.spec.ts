import { beforeEach, describe, expect, it, test } from "vitest"
import { AwnserRepository } from "../repositories/awnser-repository"
import { AwnserQuestionUseCase } from "./awnser-question"
import { InMemoryAwnsersRepository } from "../../../../../test/repositories/in-memory-awnsers-repository"

let AwnserRepository: InMemoryAwnsersRepository
let sut : AwnserQuestionUseCase

describe("Awnser Question", () =>{
  beforeEach(()=>{
    AwnserRepository = new InMemoryAwnsersRepository()
    sut = new AwnserQuestionUseCase(AwnserRepository) 
  })
  it("should be able to create a awnser", async () => {
  
    const {awnser} =await sut.execute({
      content: "any_content",
      instructorId: "any_instructor_id",
      questionId: "any_question_id"
    })
  
    console.log(awnser)
  
    expect(awnser.Content).toBe("any_content")
  })
})
