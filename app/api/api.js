let loginUser = (userCreds) => {
    return fetch('/loginUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCreds),
    }).then(response => {
        return response.json()
    }).catch(error => {
        console.log(error)
        return error
    })   
}

let registerUser = (newUser) => {
     const uploadData = {
          ...newUser
      }
      delete uploadData.checkboxInterests
      fetch('/user', {
          method: 'POST',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(uploadData),
      }).then(response => {
        if(response.status == 422) {
          window.alert('Email ID already exist. Try Login')
          return console.log(response);
        } else {
          window.alert('Successfully signed up')
          window.location.href = '/login';
          return console.log(response);
        }
      }).catch(error => {
          window.alert('Error signing up')
          return console.log(error)
      })
}

let getUser = (id) => {
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
}

let updateUser = (newUser) => {
      const uploadData = {
          ...newUser
      }
      delete uploadData.checkboxInterests
      fetch('/user', {
          method: 'PUT',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(uploadData),
      }).then(response => {
          window.location.href = '/login';
          return console.log(response);
      }).catch(error => {
          return console.log(error);
      })   
}
export {
    loginUser,
    registerUser,
    getUser,
    updateUser
};
