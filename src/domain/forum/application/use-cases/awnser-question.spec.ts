import { expect, test } from "vitest"
import { AwnserRepository } from "../repositories/awnser-repository"
import { AwnserQuestionUseCase } from "./awnser-question"

const fakeAwnserRepository: AwnserRepository = {
  create: async (awnser) => {
    return
  }
}

test("create a awnser", async () => {

  const awnserQuestion = new AwnserQuestionUseCase(fakeAwnserRepository)

  console.log(awnserQuestion)

  const awnser = awnserQuestion.execute({
    content: "any_content",
    instructorId: "any_instructor_id",
    questionId: "any_question_id"
  })

  console.log(awnser)

  expect(awnser.Content).toBe("any_content")
})