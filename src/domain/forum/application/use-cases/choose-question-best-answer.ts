import { Question } from "../../enterprise/entities/question"
import { AnswerRepository } from "../repositories/answer-repository"
import { QuestionRepository } from "../repositories/question-repository"


interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {

  private questionsRepository: QuestionRepository
  private answersRepository: AnswerRepository

  constructor(questionsRepository: QuestionRepository, answersRepository: AnswerRepository) {
    this.questionsRepository = questionsRepository
    this.answersRepository = answersRepository
  }


  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionsRepository.findById(
      answer.QuestionId,
    )

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.AuthorId) {
      throw new Error('Not allowed.')
    }

    question.BestAnswerId = answer.Id

    await this.questionsRepository.save(question)

    return {
      question,
    }
  }
}