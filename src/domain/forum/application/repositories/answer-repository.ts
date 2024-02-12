import { PaginationParams } from "../../../../core/pagination-params"
import { Answer } from "../../enterprise/entities/answer"



export interface AnswerRepository {
  findByManyQuestionId(questionId:string,params:PaginationParams): Promise<Answer[]>
  create(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
}