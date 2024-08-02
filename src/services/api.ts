// fetch utils
export const postRequest = (url: string, body: any) => {
    return fetch(url, {
        body,
        method: 'post',
        headers: {'Content-Type': 'application/json'}
    })
}

export const getRequest = (url: string) => {
    return fetch(url, {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
    })
}