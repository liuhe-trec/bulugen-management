const iTools = {
    Router: {

    },
    Store: {

    },
    LocalStorage: {
        setItem(key: string, value: any){
            localStorage.setItem(key, JSON.stringify(value))
        },
        getItem(key: string){
            const value = localStorage.getItem(key)
            try{
                return JSON.parse(value as string)
            } catch (e){
                return value
            }
        }
    },
    Cookie: {

    },
    Time: {

    },
    Dom: {

    }
}

export default iTools