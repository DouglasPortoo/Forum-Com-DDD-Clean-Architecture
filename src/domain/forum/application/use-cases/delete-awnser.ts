import { AwnserRepository } from "../repositories/awnser-repository";

interface DeleteAwnserUseCaseRequest {
  authorId: string
  awnserId: string
  questionId: string
}

interface DeleteAwnserUseCaseResponse {}

export class DeleteAwnserUseCase{

  private awnserRepository:AwnserRepository

  constructor(awnserRepository:AwnserRepository){
    this.awnserRepository = awnserRepository
  }

  async execute({authorId,awnserId,questionId}:DeleteAwnserUseCaseRequest):Promise<DeleteAwnserUseCaseResponse>{
    const awnser = await this.awnserRepository.findById(awnserId)

    if(!awnser){
      throw new Error('Awnser not found')
    }

    if(awnser.AuthorId !== authorId){
      throw new Error('You are not the author of this awnser')
    }

    if(awnser.QuestionId !== questionId){
      throw new Error('Awnser is not from this question')
    }

    await this.awnserRepository.delete(awnser)

    return {}
  }
}