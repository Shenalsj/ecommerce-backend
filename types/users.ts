import { z } from "zod";

import { userSchema } from "../schemas/userSchema";

type UserDTO = z.infer<typeof userSchema>;

export type User = UserDTO & { id: number };
