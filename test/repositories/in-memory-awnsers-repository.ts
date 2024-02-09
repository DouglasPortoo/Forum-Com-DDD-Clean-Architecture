import { AwnserRepository } from "../../src/domain/forum/application/repositories/awnser-repository";
import { Awnser } from "../../src/domain/forum/enterprise/entities/awnser";

export class InMemoryAwnsersRepository implements AwnserRepository {
  

  public items:Awnser[] = []

  async create(awnser: Awnser){
    this.items.push(awnser)
  }

  async findById(id: string){
    const awnser = this.items.find(awnser => awnser.Id === id)

    if(!awnser){
      return null
    }

    return awnser
  }

  async delete(awnser: Awnser){
    const itemIndex = this.items.findIndex(item => item.Id === awnser.Id)

    this.items.splice(itemIndex,1)
  }

}