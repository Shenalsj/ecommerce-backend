import { z } from "zod";

import { orderDetailSchema } from "../schemas/orderDetailSchema";

type OrderDetailDTO = z.infer<typeof orderDetailSchema>;

export type OrderDetail = OrderDetailDTO & { id: string };
