import { PaginationParams } from "../../src/core/pagination-params"
import { AnswerRepository } from "../../src/domain/forum/application/repositories/answer-repository"
import { Answer } from "../../src/domain/forum/enterprise/entities/answer"


export class InMemoryAnswersRepository implements AnswerRepository {



  public items: Answer[] = []

  async findByManyQuestionId(questionId:string,{ page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.QuestionId === questionId )
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer) {
  this.items.push(answer)
}

  async findById(id: string) {
  const answer = this.items.find(answer => answer.Id === id)

  if (!answer) {
    return null
  }

  return answer
}

  async delete (answer: Answer) {
  const itemIndex = this.items.findIndex(item => item.Id === answer.Id)

  this.items.splice(itemIndex, 1)
}

  async save(answer: Answer) {
  const itemIndex = this.items.findIndex((item) => item.Id === answer.Id)

  this.items[itemIndex] = answer
}
}