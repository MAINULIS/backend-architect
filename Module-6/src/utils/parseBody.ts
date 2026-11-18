// import type { IncomingMessage } from "http";

// export const bodyParser = (req: IncomingMessage): Promise<any> => {
//     // to define or to create a class we use new
//     let body = "";
//     return new Promise((resolve, reject) => {
//         req.on("data", (chunk) => {
//             body += chunk;
//         });
//         req.on("end", () => {
//             try {
//                 resolve(JSON.parse(body));
//             } catch (error) {
//                 reject(error);
//             }
//         });

//     });
// }


import type { IncomingMessage } from "http";

export const bodyParser = (req: IncomingMessage): Promise<any> => {
    let body = "";

    return new Promise((resolve, reject) => {
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                if (body.trim() === "") {
                    resolve({});
                } else {
                    resolve(JSON.parse(body));
                }
            } catch (error) {
                reject(error);
            }
        });

        req.on("error", (error) => {
            reject(error);
        });
    });
};
