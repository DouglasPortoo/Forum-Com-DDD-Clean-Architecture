import { P } from "vitest/dist/reporters-1evA5lom";
import { QuestionRepository } from "../repositories/question-repository";

interface editQuestionRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface editQuestionResponse { }

export class EditQuestionUseCase {

  private questionRepository: QuestionRepository

  constructor(questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository
  }

  async execute({ authorId, content, questionId, title }: editQuestionRequest): Promise<editQuestionResponse> {

    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (question.AuthorId !== authorId) {
      throw new Error('You are not the author of this question')
    }

    question.Title = title
    question.Content = content

    await this.questionRepository.save(question)
    

    return {}
  }
}