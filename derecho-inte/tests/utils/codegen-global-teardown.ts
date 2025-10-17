import global_teardown from "./global-setup"
import * as dotenv from 'dotenv';
dotenv.config();


(async () => {
    await global_teardown();
})()