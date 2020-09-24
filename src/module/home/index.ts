import {Module, register, SagaIterator, call} from "core-fe";
import MainComponent from "./component/Home";
import {RootState} from "type/state";
import {Location} from "history";
import {ProductAJAXWebService} from "service/ProductAJAXWebService";

export interface HomeState {
    languageList: any[];
}

const homeInitState: HomeState = {
    languageList: []
}

class HomeModule extends Module<RootState, "home"> {

    // *loadCreateProductConfig(): SagaIterator {
    //     const response = yield* call(ProductAJAXWebService.createConfig);
    //     const types = response.types.map(type => {
    //         return {name: type.name, value: type.value};
    //     });
    //     this.setState({
    //         createProductUI: {types, now: response.now},
    //     });
    // }

    *importJSON(file?: File): SagaIterator {
        if(!file){
            return;
        }
        // eslint-disable-next-line no-console
        console.log(file, "file")
        const reader = new FileReader();
        const {languageList} = this.state;
        
        reader.onload = result => {
            // eslint-disable-next-line no-console
            console.log(result);
            try {
                const jsonStr = (result.target?.result || "{}") as string;
                const obj = JSON.parse(jsonStr);
                languageList.push(obj);
                this.setState({languageList});
                // eslint-disable-next-line no-console
                console.log(languageList, "languageList")
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error(err);
            }
        }

        reader.readAsText(file);
    }
}

const module = register(new HomeModule("home", homeInitState));
export const actions = module.getActions();
export const Home = module.attachLifecycle(MainComponent);
