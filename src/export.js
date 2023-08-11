
import * as components from './components';

const componentsList = components?.default;

const IncoreComponents = {
    install(Vue) {

      
        Object.keys(componentsList).forEach(name => {
            Vue.component(name, componentsList[name]);
        })
    }
}

export default IncoreComponents;
