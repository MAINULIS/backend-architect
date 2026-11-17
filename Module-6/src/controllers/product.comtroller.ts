import type { IncomingMessage, ServerResponse } from "http";

// * controllers folder for controller handle
// * service folder for Database

export const productController = (req: IncomingMessage, res:ServerResponse) => {
    res.end(JSON.stringify({message: "this is products route"}));
}