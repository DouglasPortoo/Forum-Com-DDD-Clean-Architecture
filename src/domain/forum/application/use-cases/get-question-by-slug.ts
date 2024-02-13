import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/questions-repository";

interface GetQuestionBySlugRequest {
  slug: string
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {

  private questionRepository: QuestionRepository

  constructor(questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository
  }

  async execute({ slug }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)
    if (!question) {
      throw new Error('Question not found')
    }
    return { question }
  }
}