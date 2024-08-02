// localstorage utilties
export const saveLocalStorageItem = (name: string, value: string) => {
    localStorage.setItem(name, value)
}

export const getLocalStorageItem = (name: string) => {
    return localStorage.getItem(name);
}

export const clearLocalStorage = () => {
    localStorage.clear()
}