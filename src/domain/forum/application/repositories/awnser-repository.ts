import { Awnser } from "../../../entities/awnser";

export interface AwnserRepository {
  create(awnser: Awnser): Promise<void>
}