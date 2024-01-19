import {dumpText, load} from "ion-js";
import init, {decode_session_as_array, generate_session} from "../../pkg-web";

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

export async function encodeSession(params) {

    console.log("during encode, env: is " + params.env + "query is " + params.query)

    const res = await init()
        .then(() => {
            return generate_session("", params.query, params.env)
        })

    console.log("res is " + res)

    return res
}


export async function decodeSession(session) {

    const res = await init()
        .then(() => {
            return decode_session_as_array(session)
        })

    return res
}