import { Awnser } from "../../enterprise/entities/awnser";


export interface AwnserRepository {
  create(awnser: Awnser): Promise<void>
}