import { expect, test } from "vitest"
import { Slug } from "./slug"

test("it should be able to create a new slug from text", () => {
  const slug = Slug.createFromText('Example question title')

  console.log(slug)

  expect(slug.Value).toBe('example-question-title')
})