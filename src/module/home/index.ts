import {Module, register, SagaIterator, call} from "core-fe";
import MainComponent from "./component/Home";
import {RootState} from "type/state";
import {Location} from "history";
import {ProductAJAXWebService} from "service/ProductAJAXWebService";
import {LanguageCode, GoogleTranslateResponse} from "./type";

export interface HomeState {
    languageList: any[];
    mergeLanguageList: any[];
}

const homeInitState: HomeState = {
    languageList: [],
    mergeLanguageList: [],
};

function abstractKeys(obj: Object) {
    const splitMarker = "####";
    const ALL_KEYS: Array<{key: string; value: string}> = [];

    function loop(subObj: Object, preKey = "") {
        if (typeof obj !== "object") {
            return;
        }
        const keys = Object.keys(subObj);
        if (!keys.length) {
            return;
        }
        keys.forEach(key => {
            if (typeof subObj[key] === "string") {
                ALL_KEYS.push({key: `${preKey}${preKey ? splitMarker : ""}${key}`, value: subObj[key]});
            } else if (typeof subObj[key] === "object") {
                loop(subObj[key], `${preKey}${preKey ? splitMarker : ""}${key}`);
            } else {
                console.error(`${preKey}${preKey ? splitMarker : ""}${key} error`);
            }
        });
    }

    loop(obj);

    return ALL_KEYS;
}

class HomeModule extends Module<RootState, "home"> {
    _translate(query: string, target: LanguageCode, source: LanguageCode | "" = ""): Promise<GoogleTranslateResponse> {
        return new Promise((resolve, reject) => {
            fetch("https://google-translate1.p.rapidapi.com/language/translate/v2", {
                method: "POST",
                headers: {
                    "x-rapidapi-host": "google-translate1.p.rapidapi.com",
                    "x-rapidapi-key": "cc992288bbmsh8a52e14579c3b7bp1a03b0jsn7aaf534f3eb4",
                    "accept-encoding": "application/gzip",
                    "content-type": "application/x-www-form-urlencoded",
                },
                body: `source=${source}&q=${query}&target=${target}`,
            })
                .then(res => {
                    resolve(res.json());
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    *translate(query: string, target: LanguageCode, source: LanguageCode | "" = ""): SagaIterator {
        const response = yield* call(() => this._translate(query, target, source));
        console.log("translate", response);
    }

    *importJSON(file?: File, colName?: string): SagaIterator {
        if (!file) {
            return;
        }
        // yield* this.translate("translate", "zh");
        // eslint-disable-next-line no-console
        console.log(file, "file");
        const name = colName || file.name;
        const reader = new FileReader();
        const {languageList, mergeLanguageList} = this.state;

        reader.onload = result => {
            // eslint-disable-next-line no-console
            console.log(result);
            try {
                const jsonStr = (result.target?.result || "{}") as string;
                const obj = JSON.parse(jsonStr);
                languageList.push(obj);
                const flatObj = abstractKeys(obj);
                flatObj.forEach(item => {
                    const filterItem = mergeLanguageList.filter(lang => lang.title ===item.key)[0];
                    // if(filterItem){
                    //     filterItem[name] =
                    // }
                })
                this.setState({languageList});
                // eslint-disable-next-line no-console
                console.log(languageList, "languageList");
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error(err);
            }
        };

        reader.readAsText(file);
    }
}

const module = register(new HomeModule("home", homeInitState));
export const actions = module.getActions();
export const Home = module.attachLifecycle(MainComponent);
