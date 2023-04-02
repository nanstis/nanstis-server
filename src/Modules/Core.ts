import * as express from "express";
import {Application, Express, RequestHandler} from "express";
import {ConfigModule} from "./Config";

module CoreModule {
    import config = ConfigModule.config;

    class Core {
        private readonly serverInstance: Express;

        constructor(port: string) {
            this.serverInstance = express();
            this.serverInstance.listen(port);
        }

        public getInstance(): Application {
            return this.serverInstance;
        }
    }

    const core: Core = new Core(config.get().PORT);

    export const load = (path: string, requestHandler: RequestHandler) =>
        core.getInstance().use(path, requestHandler);
}

export {CoreModule};
