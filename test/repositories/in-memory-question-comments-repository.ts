import { QuestionCommentsRepository } from "../../src/domain/forum/application/repositories/question-comments-repository";
import { Question } from "../../src/domain/forum/enterprise/entities/question";
import { QuestionComment } from "../../src/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository{


  items: QuestionComment[] = []

  async findById(id: string) {
    const questionComment = this.items.find((question) => question.QuestionId === id)
    console.log(questionComment)
    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async create(questionComment: QuestionComment){
    this.items.push(questionComment)
  }

  async delete(question: QuestionComment) {
    const itemIndex = this.items.findIndex((item) => item.QuestionId === question.QuestionId)

    this.items.splice(itemIndex, 1)

  }

}