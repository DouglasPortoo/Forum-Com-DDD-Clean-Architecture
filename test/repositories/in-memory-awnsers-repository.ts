import { AwnserRepository } from "../../src/domain/forum/application/repositories/awnser-repository";
import { Awnser } from "../../src/domain/forum/enterprise/entities/awnser";

export class InMemoryAwnsersRepository implements AwnserRepository {

  public items:Awnser[] = []

  async create(awnser: Awnser){
    this.items.push(awnser)
  }

}