import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answer-repository";

interface editAnswerRequest {
  authorId: string
  answerId: string
  content: string
}

interface editAnswerResponse {
  answer: Answer
}

export class EditAnswerUseCase {

  private answerRepository: AnswerRepository

  constructor(answerRepository: AnswerRepository) {
    this.answerRepository = answerRepository
  }

  async execute({ authorId, content, answerId }: editAnswerRequest): Promise<editAnswerResponse> {

    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (answer.AuthorId !== authorId) {
      throw new Error('You are not the author of this answer')
    }

    answer.Content = content

    await this.answerRepository.save(answer)


    return {
      answer
    }
  }
}