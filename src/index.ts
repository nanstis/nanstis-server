import {CoreModule} from './Modules/Core'
import {modelController} from './Controllers/ModelController'

module IndexModule {

    export const bootstrap = () => {
        CoreModule.load('/models', modelController)
    }

}

IndexModule.bootstrap()