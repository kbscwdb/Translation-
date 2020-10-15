import {Module, register, SagaIterator, call} from "core-fe";
import MainComponent from "./component/Home";
import {RootState} from "type/state";
import {Location} from "history";
import {ProductAJAXWebService} from "service/ProductAJAXWebService";
import {LanguageCode, GoogleTranslateResponse} from "./type";
import {message} from "antd";

export interface HomeState {
    languageList: any[];
    mergeLanguageList: any[];
    columns: string[];
}

const homeInitState: HomeState = {
    languageList: [],
    mergeLanguageList: [],
    columns: [],
};

const ACCESS_TOKEN = "24.b460e5979c8895986dc02908477730a2.2592000.1605349345.282335-22827257";

class HomeModule extends Module<RootState, "home"> {
    _translate(image: string): Promise<GoogleTranslateResponse> {
        return new Promise((resolve, reject) => {
            fetch(`https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=${ACCESS_TOKEN}`, {
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "mode": "no-cors",
                },
                body: `image=${image}`,
            })
                .then(res => {
                    resolve(res.json());
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    *translate(image: string): SagaIterator {
        const response = yield* call(() => this._translate(image));
        console.log("translate", response);
    }
}

const module = register(new HomeModule("home", homeInitState));
export const actions = module.getActions();
export const Home = module.attachLifecycle(MainComponent);
