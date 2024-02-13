import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";



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