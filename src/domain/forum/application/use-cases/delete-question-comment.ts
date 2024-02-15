import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {

  private questionCommentsRepository: QuestionCommentsRepository

  constructor(questionCommentsRepository: QuestionCommentsRepository) {
    this.questionCommentsRepository = questionCommentsRepository
  }

  async execute({ authorId, questionCommentId }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse>{

    const questionComment = await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question Comment not found')
    }

    if (questionComment.AuthorId !== authorId) {
      throw new Error('You are not the author of this question comment')
    }

    await this.questionCommentsRepository.delete(questionComment)

    return {}
  }
}