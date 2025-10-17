import global_setup from "./global-setup"
import * as dotenv from 'dotenv';
dotenv.config();


(async () => {
    await global_setup();
})()