import { z } from "zod"

import { orderSchema } from "../schemas/orderSchema"

type OrderDTO = z.infer<typeof orderSchema>

export type Order = OrderDTO & {id: number}