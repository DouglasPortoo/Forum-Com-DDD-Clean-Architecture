import { QuestionComment } from "../../enterprise/entities/question-comment"
import {QuestionCommentsRepository } from "../repositories/question-comments-repository"
import { QuestionRepository } from "../repositories/questions-repository"

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {

  private questionRepository: QuestionRepository
  private questionCommentsRepository: QuestionCommentsRepository

  constructor(questionRepository: QuestionRepository, questionCommentsRepository: QuestionCommentsRepository) {
    this.questionRepository = questionRepository
    this.questionCommentsRepository = questionCommentsRepository
  }

  async execute({ authorId, content, questionId }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    const questionComment = new QuestionComment ({authorId, questionId, content, createdAt:new Date(), updatedAt:new Date()})

    await this.questionCommentsRepository.create(questionComment)

    return { questionComment }

  }
}