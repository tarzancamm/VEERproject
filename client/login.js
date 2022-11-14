// Select Forms
const regForm = document.querySelector('#register-form')
const loginForm = document.querySelector('#login-form')


// Registration functions
const register = (body) => axios.post('/register', body)
    .then(res => {
        alert("Registration successful")
        regForm.reset()
    })
    .catch(err => {
        alert('Registration unsuccessful')
    })

const registerUser = (e) => {
    e.preventDefault()

    const regEmail = document.querySelector('#register-email')
    const regFirstName = document.querySelector('#register-firstName')
    const regLastName = document.querySelector('#register-lastName')
    const regPassword = document.querySelector('#register-password')
    const regConfirmPassword = document.querySelector('#register-password-2')

    // Check for invalid password inputs using REGEX
    let errors = []
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    switch(true) {
      case (regPassword.value !== regConfirmPassword.value):
        errors.push({message: "Your passwords need to match."});
        break;
      case (regPassword.value.length < 10):
        errors.push({message: "Password must contain at least 10 characters."});
        break;
      case (!/[0-9]+/g.test(regPassword.value)): 
        errors.push({message: "Password must contain at least one number."});
        break;
      case (!/[a-z]+/g.test(regPassword.value)):
        errors.push({message: "Password must contain at least one lowercase letter."});
        break;
      case (!/[A-Z]+/g.test(regPassword.value)):
        errors.push({message: "Password must contain at least one uppercase letter."});
        break;
      case (!specialChars.test(regPassword.value)):
        errors.push({message: "Password must contain at least one special character."});
        break;
      default:
        true;
        break;
    };

    if (errors.length > 0) {
      alert(`${errors[0].message}`);
      return errors;
    } else if (errors.length == 0) {
      console.log("Password accepted.");
    } else {
      alert("Please choose another password.");
    };
  
    let bodyObj = {
      first_name: regFirstName.value,
      last_name: regLastName.value,
      email: regEmail.value,
      is_tech: 0,
      password: regPassword.value
    };
  
    register(bodyObj);
}


// Sign In Functions

const login = (body) => axios.post('/login', body)
    .then(res => {
        alert("Login successful")
        userDashboard()
    })
    .catch(err => {
        alert("Invalid login credentials")
    })

const loginUser = (e) => {
    e.preventDefault()

    const email = document.querySelector('#login-email')
    const password = document.querySelector('#login-password')

    let bodyObj = {
        email: email.value,
        password: password.value
    }

    login(bodyObj)
}


// User Dashboard

const userDashboard = () => {
    
}



// Event Listeners
regForm.addEventListener('submit', registerUser)
loginForm.addEventListener('submit', loginUser)

