import { Awnser } from "../../enterprise/entities/awnser";


export interface AwnserRepository {
  create(awnser: Awnser): Promise<void>
  findById(id: string): Promise<Awnser | null>
  delete(awnser: Awnser): Promise<void>
}