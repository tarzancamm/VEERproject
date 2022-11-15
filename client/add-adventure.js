// Error callback
const errCallback = err => console.log(err)

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
        Swal.fire({
            text:'Include an adventure name!',
            color: '#00171F',
            padding: '1.2rem 0 3.7rem 0',
            confirmButtonColor: '#1282A2',
            icon: 'error',
            iconColor: '#E5625E',
        })
        return
    }

    if (adventureDescription.value < 1) {
        Swal.fire({
            text:'Include an adventure description!',
            color: '#00171F',
            padding: '1.2rem 0 3.7rem 0',
            confirmButtonColor: '#1282A2',
            icon: 'error',
            iconColor: '#E5625E',
        })
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
            Swal.fire({
                text:'Successfully added!',
                color: '#00171F',
                padding: '1.2rem 0 3.7rem 0',
                showConfirmButton: false,
                icon: 'success',
                iconColor: '#1282A2',
                timer: '2300',
                timerProgressBar: 'true'
            })
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