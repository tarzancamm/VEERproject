// Error callback
const errCallback = err => console.log(err)

// Grab items home page
const openModalButtons = document.querySelectorAll('[data-modal-target]') //attribute selector uses brackets
const closeModalButtons = document.querySelectorAll('[data-close-button]') //attribute selector uses brackets
const overlay = document.getElementById('overlay')
const modalContainer = document.getElementById('modalContainer')


// Requests
openModalButtons.forEach(button => {
    button.addEventListener('click', (event) => {

        modalContainer.innerHTML = ''

        let countryid = event.target.getAttribute('countryid')

        axios.get(`/adventures/${countryid}`)
        .then((res) => {
            res.data.forEach(elem => {
                let adventureCard = 
                    `<div class="modal" id="modal">
                         <div class="modal-header">
                            <div class="modal-title">${elem.country}</div>
                        </div>
                        <div class="modal-body">
                            <p class="adventure-name">${elem.adventure}</p>
                            <p class="cost-heading">Cost</p>
                            <p class="adventure-cost">${elem.adventure_cost}</p>
                            <p class="description-heading">What You Need To Know</p>
                            <p class="adventure-description">${elem.description}</p>
                            <button class="delete-btn" onclick="deleteAdventure(${elem.adventure_id})">DELETE</button>
                        </div>
                    </div>`
    
                modalContainer.innerHTML += adventureCard    
            })

            const modal = document.querySelector(button.dataset.modalTarget)
            openModal(modal)

        })
    })
})

const deleteAdventure = (adventureid) => {
    axios.delete(`/countries/${adventureid}`)
    .then(() => {
        Swal.fire({
            text:'Successfully deleted',
            color: '#00171F',
            padding: '1.2rem 0 4rem 0',
            showConfirmButton: false,
            icon: 'success',
            iconColor: '#1282A2',
            timer: '2000',
            timerProgressBar: 'true'
        })

    const modal = document.querySelectorAll('.modal.active')
    modal.forEach(modal => {
        closeModal(modal)
    })
    })
}


// Other functions
overlay.addEventListener('click', () => {
    const modal = document.querySelectorAll('.modal.active')
    modal.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

// Close modal button, if implemented: <button data-close-button class="close-btn">&times;</button>