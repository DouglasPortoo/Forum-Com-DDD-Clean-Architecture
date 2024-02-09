import { AnswerRepository } from "../../src/domain/forum/application/repositories/awnser-repository"
import { Answer } from "../../src/domain/forum/enterprise/entities/awnser"


export class InMemoryAnswersRepository implements AnswerRepository {


  public items: Answer[] = []

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

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex(item => item.Id === answer.Id)

    this.items.splice(itemIndex, 1)
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.Id === answer.Id)

    this.items[itemIndex] = answer
  }
}