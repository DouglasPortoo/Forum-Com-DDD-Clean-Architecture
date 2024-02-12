import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/question-repository";

interface FetchRecentQuestionsUseCaseResponse{
  page: number;
}

interface FetchRecentQuestionsUseCaseRequest{
questions: Question[];
}

export class FetchRecentQuestionsUseCase{
  private questionRepository: QuestionRepository;

  constructor(questionRepository: QuestionRepository){
    this.questionRepository = questionRepository;
  } 

  async execute({page}:FetchRecentQuestionsUseCaseResponse): Promise<FetchRecentQuestionsUseCaseRequest>{
    const questions = await this.questionRepository.findManyRecent({page});

    return {questions};
  }
}