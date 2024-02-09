import { Answer } from "../../enterprise/entities/awnser";
import { AnswerRepository } from "../repositories/awnser-repository";



interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string
}

interface answerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  private answerRepository: AnswerRepository

  constructor(answerRepository: AnswerRepository) {
    this.answerRepository = answerRepository
  }

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest): Promise<answerQuestionUseCaseResponse> {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId,
      createdAt: new Date(),
    })

    await this.answerRepository.create(answer)

    return { answer }
  }
}