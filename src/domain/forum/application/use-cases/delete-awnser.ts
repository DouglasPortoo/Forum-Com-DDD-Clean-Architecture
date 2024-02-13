import { AnswerRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
  questionId: string
}

interface DeleteAnswerUseCaseResponse { }

export class DeleteAnswerUseCase {

  private answerRepository: AnswerRepository

  constructor(answerRepository: AnswerRepository) {
    this.answerRepository = answerRepository
  }

  async execute({ authorId, answerId, questionId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (answer.AuthorId !== authorId) {
      throw new Error('You are not the author of this answer')
    }

    if (answer.QuestionId !== questionId) {
      throw new Error('Answer is not from this question')
    }

    await this.answerRepository.delete(answer)

    return {}
  }
}