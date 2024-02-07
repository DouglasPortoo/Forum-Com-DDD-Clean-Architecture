import { Question } from "../../enterprise/entities/question"
import { Slug } from "../../enterprise/entities/value-objects/slug"
import { QuestionRepository } from "../repositories/question-repository"

interface CreatQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreatQuestionUseCaseResponse {
  question: Question
}

export class CreatQuestionUseCase {
  private questionRepository: QuestionRepository

  constructor(questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository
  }

  async execute({ authorId, content, title }: CreatQuestionUseCaseRequest): Promise<CreatQuestionUseCaseResponse> {
    const question = new Question({authorId,content,title,createdAt: new Date(),slug: Slug.createFromText(title)})
    await this.questionRepository.create(question)
    return { question }
  }
}