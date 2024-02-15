import { Either, left, right } from "../../../../core/either";
import { AnswerRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
  questionId: string
}

type DeleteAnswerUseCaseResponse = Either<string, {}>

export class DeleteAnswerUseCase {

  private answerRepository: AnswerRepository

  constructor(answerRepository: AnswerRepository) {
    this.answerRepository = answerRepository
  }

  async execute({ authorId, answerId, questionId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left('Answer not found')
    }

    if (answer.AuthorId !== authorId) {
      return left('You are not the author of this answer')
    }

    if (answer.QuestionId !== questionId) {
      return left('Answer is not from this question')
    }

    await this.answerRepository.delete(answer)

    return right({})
  }
}