const DefaultHeaders = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
}

const makeRequest = (uploadData = undefined, method, path, headers = DefaultHeaders) => {
    return fetch(path, {
        method: method,
        headers: headers,
        credentials: 'include',
        body: JSON.stringify(uploadData),
    })
}

const loginUser = (userCreds) => {
    return makeRequest(userCreds, 'POST', '/api/login').then(response => {
        return response.json()
    }).catch(error => {
        return error
    })
}

const registerUser = (newUser) => {
    const uploadData = {
        ...newUser
    }
    let data = cleanupData(uploadData)

    makeRequest(data, 'POST', '/api/user').then(response => {
        if (response.status == 422) {
            window.alert('Email ID already exist. Try Login')
            return response
        }
        else {
            window.alert('Successfully signed up')
            window.location.href = '/login'
            return response
        }
    }).catch(error => {
        window.alert('Error signing up')
        return error
    })
}

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        return makeRequest(undefined, 'GET', `/api/user/${id}`).then(response => {
            return resolve(response.json())
        }).catch(error => {
            window.alert('Error retrieving user')
            console.log(error)
            return reject(error)
        })
    }) 
}

const cleanupData = (uploadData) => {
    delete uploadData.checkboxInterests
    delete uploadData.retypePassphrase
    delete uploadData.skillsInput
    return { ...uploadData }
}

const updateUser = (newUser) => {
    const uploadData = {
        ...newUser
    }
    let data = cleanupData(uploadData)
    return makeRequest(data, 'PUT', '/api/user').then(response => {
        return response.json()
    }).catch(error => {
        console.log(error)
        return console.log(error)
    })
}

export {
    loginUser,
    registerUser,
    getUser,
    updateUser,
}
