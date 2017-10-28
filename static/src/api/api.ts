import axios from 'axios'
//multipart/form-data
//application/json
//application/x-www-form-urlencoded
const defaultHeaders = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'    
    }
}
    
const postToBackend = (url: string, data: any = '', headers = defaultHeaders): Promise<any> => {
    return axios.post(url, data, headers).then(function (response) {
        return response

    }).catch(function (error) {
        console.log(error)
        return error
    })
}

const getFromBackend = (url: string, data: any = '', headers = defaultHeaders): Promise<any> => {
    return axios.get(url, headers).then(function (response) {
        return response

    }).catch(function (error) {
        console.log(error)
        return error
    })
}

export {
    postToBackend,
    getFromBackend
}
