let loginUser = (userCreds) => {

}

let registerUser = (newUser) => {
     var uploadData = {
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
          return console.log(response);
        }
      }).catch(error => {
          window.alert('Error signing up')
          return console.log(error)
      })
}

export {
    loginUser,
    registerUser
}
