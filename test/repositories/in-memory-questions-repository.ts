import { PaginationParams } from "../../src/core/pagination-params";
import { QuestionRepository } from "../../src/domain/forum/application/repositories/questions-repository";
import { Question } from "../../src/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionRepository {


  public items: Question[] = []

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.CreatedAt.getTime() - a.CreatedAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async findById(id: string) {
    const question = this.items.find((question) => question.Id === id)

    if (!question) {
      return null
    }

    return question
  }

  async create(question: Question) {
    this.items.push(question)
  }

  async findBySlug(slug: string) {
    const question = this.items.find((question) => question.Slug.Value === slug)

    if (!question) {
      return null
    }

    return question
  }


  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.Id === question.Id)

    this.items.splice(itemIndex, 1)

  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.Id === question.Id)

    this.items[itemIndex] = question
  }
}