import {dumpText, load} from "ion-js";
import init, {generate_session} from "../../pkg-web";

export function encodeSearchParams(params) {
    const searchParam = {}

    for (let [name, value] of Object.entries(params)) {
        searchParam[`${name}`] = encodeURIComponent(value)
    }

    let ionData = load(JSON.stringify(searchParam))

    return btoa(dumpText(ionData))
}

export function decodeSearchParams(params) {
    const rawIon = atob(params)
    const struct = load(rawIon)
    const searchParam = {}

    for (let [name, value] of struct) {
        searchParam[`${name}`] = decodeURIComponent(value.stringValue())
    }
    return searchParam
}

export async function encodeSession() {
    const env = () => {
        if (props.env === undefined)
            return ""
        else
            return props.env
    }

    const query = () => {
        if (props.query === undefined)
            return ""
        else
            return props.query
    }

    const res = await init()
        .then(() => {
            generate_session("", query(), env())
        })
    console.log(res)

    return res
}


export async function decodeSession() {

    const res = await init()
        .then(() => {
            generate_session("", query(), env())
        })
    console.log(res)

    return res
}