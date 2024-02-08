import { QuestionRepository } from "../../src/domain/forum/application/repositories/question-repository";
import { Question } from "../../src/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionRepository {

  public items: Question[] = []

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

}