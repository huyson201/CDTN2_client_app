import axios from "axios"
import { AUTO_COMPLETE_API, AUTO_COMPLETE_API2, AUTO_COMPLETE_API3 } from "../values/constants"

const API_URL = "https://rsapi.goong.io/Place/AutoComplete"
let apiKey = AUTO_COMPLETE_API;

export const searchPlace = (input) => {
    if (!input) return

    let url = `${API_URL}?api_key=${AUTO_COMPLETE_API}&input=${input}`
    let request = axios.get(url)

    return request.then(response => response.data)
        .then(data => data.predictions)
        .catch(err => {
            switch (apiKey) {
                case AUTO_COMPLETE_API:
                    apiKey = AUTO_COMPLETE_API2
                    break;
                case AUTO_COMPLETE_API2:
                    apiKey = AUTO_COMPLETE_API3
                    break;
                default:
                    return err
            }
            return err;
        })

}

