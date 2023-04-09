import e = require('express');

module RouterModule {
    export abstract class Controller {
        protected readonly router: e.Router = e()

        protected constructor() {
            this.initializeRoutes()
        }

        public getRouter(): e.Router {
            return this.router
        }

        protected abstract initializeRoutes(): void;
    }
}

export {RouterModule}
