import { AnswerComment } from "../../enterprise/entities/answer-comment"
import {AnswerCommentsRepository } from "../repositories/answer-comments-repository"
import { AnswerRepository } from "../repositories/answers-repository"

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {

  private answerRepository: AnswerRepository
  private answerCommentsRepository: AnswerCommentsRepository

  constructor(answerRepository: AnswerRepository, answerCommentsRepository: AnswerCommentsRepository) {
    this.answerRepository = answerRepository
    this.answerCommentsRepository = answerCommentsRepository
  }

  async execute({ authorId, content, answerId }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const answerComment = new AnswerComment ({authorId, answerId, content, createdAt:new Date(), updatedAt:new Date()})

    await this.answerCommentsRepository.create(answerComment)

    return { answerComment }

  }
}