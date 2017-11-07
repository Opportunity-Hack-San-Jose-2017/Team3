let DefaultHeaders = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
} 

let makeRequest = (uploadData = {}, method, path, headers = DefaultHeaders) => {
    return fetch(path, {
        method: method,
        headers: headers,
        body: JSON.stringify(uploadData),
    })
}

let loginUser = (userCreds) => {
    return makeRequest(userCreds, 'POST', '/loginUser').then(response => {
        return response.json()
    }).catch(error => {
        return error
    })
}

let registerUser = (newUser) => {
    const uploadData = {
          ...newUser
    }
    let data = cleanupData(uploadData)

    makeRequest(data,'POST', '/user').then(response => {
        if(response.status == 422) {
            window.alert('Email ID already exist. Try Login')
            return response
        } 
        else {
            window.alert('Successfully signed up')
            window.location.href = '/login';
            return response
        }
    }).catch(error => {
        window.alert('Error signing up')
        return error
    })
}

let getUser = (id) => {
    //TODO:001: By default fetch returns a promise, should it be just return fetch(...
    /*
    return new Promise((resolve, reject) => {
        fetch(`/user/${id}`, {
            method: 'GET'
        }).then(response => {
            return resolve(response.json());
        }).catch(error => {
            window.alert('Error retrieving user');
            console.log(error);
            return reject(error);
        });
    });
    */
    makeRequest({}, 'GET', `/user/${id}`).then(response => {
            return response.json()
        }).catch(error => {
            window.alert('Error retrieving user')
            console.log(error)
            return error
    })
}

let cleanupData = (uploadData) => {
    delete uploadData.checkboxInterests
    delete uploadData.retypePassphrase
    delete uploadData.skillsInput
    return { ...uploadData }
}

let updateUser = (newUser) => {
    const uploadData = {
        ...newUser
    }
    let data = cleanupData(uploadData)
    return makeRequest(data, 'PUT', '/user').then(response => {
        return response.json()
    }).catch(error => {
        console.log(error)
        return console.log(error);
    })

}

export {
    loginUser,
    registerUser,
    getUser,
    updateUser
};
