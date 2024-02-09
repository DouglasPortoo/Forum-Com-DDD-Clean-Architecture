import { Awnser } from "../../enterprise/entities/awnser";
import { AwnserRepository } from "../repositories/awnser-repository";

interface editAwnserRequest {
  authorId: string
  awnserId: string
  content: string
}

interface editAwnserResponse { 
  awnser:Awnser
}

export class EditAwnserUseCase {

  private awnserRepository: AwnserRepository

  constructor(awnserRepository: AwnserRepository) {
    this.awnserRepository = awnserRepository
  }

  async execute({ authorId, content, awnserId }: editAwnserRequest): Promise<editAwnserResponse> {

    const awnser = await this.awnserRepository.findById(awnserId)

    if (!awnser) {
      throw new Error('Awnser not found')
    }

    if (awnser.AuthorId !== authorId) {
      throw new Error('You are not the author of this awnser')
    }

    awnser.Content = content

    await this.awnserRepository.save(awnser)
    

    return {
      awnser
    }
  }
}