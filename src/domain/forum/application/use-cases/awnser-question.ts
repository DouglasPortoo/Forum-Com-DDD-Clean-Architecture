
import { Awnser } from "../../enterprise/entities/awnser";
import { AwnserRepository } from "../repositories/awnser-repository";

interface AwnserQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string
}

interface awnserQuestionUseCaseResponse {
  awnser: Awnser
}

export class AwnserQuestionUseCase {
  private awnserRepository: AwnserRepository

  constructor(awnserRepository: AwnserRepository) {
    this.awnserRepository = awnserRepository
  }

  async execute({ instructorId, questionId, content }: AwnserQuestionUseCaseRequest): Promise<awnserQuestionUseCaseResponse> {
    const awnser = new Awnser({
      content,
      authorId: instructorId,
      questionId,
      createdAt: new Date(),
    })

   await  this.awnserRepository.create(awnser)

    return {awnser}
  }
}