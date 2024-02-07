
import { Awnser } from "../../enterprise/entities/awnser";
import { AwnserRepository } from "../repositories/awnser-repository";

interface AwnserQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string
}

export class AwnserQuestionUseCase {
  private awnserRepository: AwnserRepository

  constructor(awnserRepository: AwnserRepository) {
    this.awnserRepository = awnserRepository
  }

  execute({ instructorId, questionId, content }: AwnserQuestionUseCaseRequest) {
    const awnser = new Awnser({
      content,
      authorId: instructorId,
      questionId,
      createdAt: new Date(),
    })

    this.awnserRepository.create(awnser)

    return awnser
  }
}