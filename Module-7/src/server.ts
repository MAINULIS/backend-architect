import app from "./app";
import config from "./config";
import { initDB } from "./db";

const main = async () => {
    initDB();
    app.listen(config.port, () => {
        console.log(`Our express app is running on port ${config.port}`);
    });
};

main();

