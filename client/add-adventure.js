// Base URL
const baseURL = 'http://localhost:6996/'

// Grab items add adventure page
const form = document.querySelector('form')
const countrySelect = document.querySelector('#country-select')
const adventureName = document.querySelector('#adventure-name')
const adventureCost = document.getElementById('adventure-cost')
const adventureDescription = document.querySelector('#adventure-desc')

// Requests
const submitHandler = (e) => {
    e.preventDefault()

    if (adventureName.value < 1 ) {
        alert ('You must enter an Adventure Name!')
        return
    }

    if (adventureDescription.value < 1) {
        alert ('You must enter an Adventure Description!')
        return
    }

    let body = {
        countryId: +countrySelect.value,
        adventureName: adventureName.value,
        adventureCost: adventureCost.value,
        adventureDescription: adventureDescription.value
    }

    axios.post('/adventures', body)
        .then(() => {
            alert ('Your adventure has successfully been added.')
        })

    countrySelect.value = 1
    adventureName.value = ''
    adventureCost.value = ''
    adventureDescription.value = ''
}

const getCountries = () => {
    axios.get('/countries')
    .then((res) => {
        res.data.forEach(country => {
            const option = document.createElement('option')
            option.setAttribute('value', country['country_id'])
            option.textContent = country.country_name
            countrySelect.appendChild(option)
        })
    })
}




// Functions running constantly
// Creates country dropdown menu on Add My Adventure page
getCountries()

// Event listeners
form.addEventListener('submit', submitHandler)