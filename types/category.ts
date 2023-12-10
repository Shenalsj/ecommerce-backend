

import { z } from "zod"

import { categorySchema } from "../schemas/categorySchema"

// to get the type FROM the ZOD validation
type CategoryDTO = z.infer<typeof categorySchema>

// we are adding an ID because, when we validate the data we don't care about the id. why?? because IDs are handled by the database
export type Category = CategoryDTO & { id: number }
