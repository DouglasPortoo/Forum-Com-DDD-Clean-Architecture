import { Awnser, AwnserProps } from "../../src/domain/forum/enterprise/entities/awnser";

export function makeAwnser(override: Partial<AwnserProps> = {},id?: string) {
  const awnser = new Awnser({
    authorId: "123",
    questionId: "123",
    content: "content",
    createdAt: new Date(),
    ...override
  },id)

  return awnser
}

