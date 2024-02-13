import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";

interface FetchQuestionAnswersUseCaseResponse {
  page: number;
  questionId: string;
}

interface FetchQuestionAnswersUseCaseRequest {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
  private answerRepository: AnswerRepository;

  constructor(answerRepository: AnswerRepository) {
    this.answerRepository = answerRepository;
  }

  async execute({ page, questionId }: FetchQuestionAnswersUseCaseResponse): Promise<FetchQuestionAnswersUseCaseRequest> {
    const answers = await this.answerRepository.findByManyQuestionId(questionId, { page });
    return { answers }
  }
}