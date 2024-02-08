import { QuestionRepository } from "../repositories/question-repository";

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase{

  private questionRepository:QuestionRepository

  constructor(questionRepository:QuestionRepository){
    this.questionRepository = questionRepository
  }

  async execute({authorId,questionId}:DeleteQuestionUseCaseRequest):Promise<DeleteQuestionUseCaseResponse>{
    const question = await this.questionRepository.findById(questionId)

    if(!question){
      throw new Error('Question not found')
    }

    if(question.AuthorId !== authorId){
      throw new Error('You are not the author of this question')
    }

    await this.questionRepository.delete(question)

    return {}
  }
}