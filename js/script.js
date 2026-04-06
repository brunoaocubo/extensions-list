const btnFocus = document.querySelectorAll('.btn-status-extensions')
const containerListCards = document.querySelector('#container-list-cards')
const darkMode = document.querySelector('#btn-darkmode')
let extensionToAdd = []

document.addEventListener('DOMContentLoaded', (event) => {
    event = document.querySelectorAll('.card')

    event.forEach((element) => {
        if(!element.classList.contains('inactive') || element.classList.contains('active'))
        {
            element.classList.add('inactive')
        }
    })
})

darkMode.addEventListener('click', (() => {
    const img = darkMode.querySelector('img')
    const sun_path = 'imagens/icon-sun.svg'
    const moon_path = 'imagens/icon-moon.svg'
    
    if(document.body.classList.contains('dark')){
        document.body.classList.remove('dark')
        if(document.location.pathname.includes("extensions-list") || window.location.pathname.includes("index")){
            img.src = sun_path
        }
        else{
            img.src = '../' + sun_path
        }
    }
    else{
        document.body.classList.add('dark') 
        if(document.location.pathname.includes("extensions-list") || window.location.pathname.includes("index")){
            img.src = moon_path
        }
        else{
            img.src = '../' + moon_path
        } 
    }
}))

containerListCards.addEventListener('click', (event) =>{
    const remove = event.target.closest(".btn-remove")
    const toggle = event.target.closest(".toggle")
    const card = event.target.closest(".card")

    if(toggle){
        //Relacionando o card com o botão clicado. O fluxo vai checar as informações de acordo com o que foi clciado.
        const toggleChild = toggle.firstElementChild
        const active = card.classList.contains('active')

        card.classList.toggle('inactive', active)
        card.classList.toggle('active', !active)

        toggleChild.classList.toggle('toggle-inactive', active)
        toggleChild.classList.toggle('toggle-active', !active)

        toggle.classList.toggle('bg-toggle-inactive', active)
        toggle.classList.toggle('bg-toggle-active', !active)

    }
    else if(remove){
        card.remove()
    }
})

btnFocus.forEach((btn_status) => {
    if(btn_status.id === 'btn_all'){
        btn_status.classList.replace('btn-status-normal', 'btn-status-select')
    }
    btn_status.addEventListener('click', () => {
        clearBtnSelect(btn_status)
        statusFilter(btn_status)
    })
})

let clearBtnSelect = function(element){
    for(let i = 0; i < btnFocus.length; i++){
        btnFocus[i].classList.replace('btn-status-select', 'btn-status-normal')
    }
    element.classList.replace('btn-status-normal', 'btn-status-select')
}

let statusFilter = function(btn_status){
    document.querySelectorAll('.card').forEach((card) => {
        switch (btn_status.id) {
            case 'btn_inactive':
                card.classList.contains('active')?
                card.style.display = 'none': 
                card.style.display = 'flex'
                break;
            case 'btn_active':
                card.classList.contains('inactive')?
                card.style.display = 'none':
                card.style.display = 'flex'
                break;
            default:
                card.style.display = 'flex'
            break;
        }
        /*
        if(btn_status.id === 'btn_inactive'){
            card.classList.contains('active')?
            card.style.display = 'none': 
            card.style.display = 'flex'
        }
        else if(btn_status.id === 'btn_active'){
            card.classList.contains('inactive')?
            card.style.display = 'none':
            card.style.display = 'flex'
        }
        else{
            card.style.display = 'flex'
        }*/
    })
}

try{
    const refresh = document.querySelector('#refresh')
    refresh.addEventListener('click', function(){
        //Irá retornar um objeto de objetos.
        const list_extensions = JSON.parse(localStorage.getItem("extensions"))
        localStorage.clear()

        if(list_extensions != null){
            list_extensions.forEach((item) => {
                CreateCard(item.img_path, item.card_title, item.card_description)   
            })
        }
        else{
            window.alert('Nenhuma extensão do Store para adicionar')
        }       
    })
}
catch(error){
    console.log(error)
}

let CreateCard = function(img_path, card_title, card_description){
    const card = `
        <article class="card inactive">
                <img src="${img_path}" alt="${card_title}" class="logo-extension" />
                <div class="content-card">
                    <h3 class='card-title'>${card_title}</h3>
                    <p class='card-description'>${card_description}</p>
                </div class="content-card">
                <div class="clickables">
                    <button class="btn-remove">Remove</button>
                    <div class="bg-toggle-inactive toggle">
                        <div class="toggle-inactive"></div>
                    </div>
                </div>
            </article>
    `
    try {
        containerListCards.lastElementChild.scrollIntoView()
    } catch (error) {
        console.log(error)
    }

    setTimeout(() => {
        try {
            containerListCards.insertAdjacentHTML('beforeend', card)
            containerListCards.lastElementChild.scrollIntoView()
        } catch (error) {
            console.log(error)
        }

    }, 1000)
}