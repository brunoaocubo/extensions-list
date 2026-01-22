const btnFocus = document.querySelectorAll('.btn-status-extensions')
const toggle = document.querySelectorAll('.toggle')
const extensionsCard = document.querySelectorAll('.card')
const remove =  document.querySelectorAll('.btn-remove')
const extensionToAdd = []
const containerListCards = document.querySelector('#container-list-cards')
const add = document.querySelectorAll('.btn-add')

class ExtensionAtributes{
    constructor(img_path, card_title, card_description)
    {
        this.img_path = img_path;
        this.card_title = card_title;
        this.card_description = card_description;
    }
}

document.addEventListener('DOMContentLoaded', function(){
    for(let i = 0; i < extensionsCard.length; i++){
        if(!extensionsCard[i].classList.contains('inactive') || !extensionsCard[i].classList.contains('active')){
            extensionsCard[i].classList.add('inactive')
        }
    }
})

for(let i = 0; i < add.length; i++){
    add[i].addEventListener('mousedown', function(){
        const card = add[i].closest(".card")
        saveAtributesExtension(card)
    })
}

let saveAtributesExtension = function(card){
    const img_path = card.querySelector('img').getAttribute("src")
    const card_title = card.querySelector('.content-card > .card-title').textContent
    const card_description = card.querySelector('.card-description').textContent
    const extension = new ExtensionAtributes(img_path, card_title, card_description)
    extensionToAdd.push(extension)

    //Irá salvar um objeto de objetos
    localStorage.setItem("extensions", JSON.stringify(extensionToAdd))
}

if(window.location.pathname.includes("index")){
    const refresh = document.querySelector('#refresh')
    refresh.addEventListener('mousedown', function(){
        const card = document.createElement("article")
        card.classList.add('card')
        console.log(localStorage.extension)
        containerListCards.appendChild(card)

        //Irá retornar um objeto de objetos.
        const list_extensions = JSON.parse(localStorage.getItem("extensions"))
        for(let i = 0; i < list_extensions.length; i++){
            list_extensions[i].card_title  
        }
    })
}

for(let i = 0; i < remove.length; i++){
    remove[i].addEventListener('mousedown', function(){
        const card = toggle[i].closest(".card")
        card.remove()
    })
}

for(let i = 0; i < toggle.length; i++){
    toggle[i].addEventListener('mousedown', function(){
        //Relacionando o card com o botão clicado. O fluxo vai checar as informações de acordo com o que foi clciado.
        const card = toggle[i].closest(".card")
        let toggleChild = toggle[i].firstElementChild.classList

        if(card.classList.contains('inactive')){
            toggleChild.replace('toggle-inactive', 'toggle-active')
            card.classList.replace('inactive', 'active')
            toggle[i].classList.replace('bg-toggle-inactive', 'bg-toggle-active')
        }
        else{
            toggleChild.replace('toggle-active', 'toggle-inactive')
            card.classList.replace('active', 'inactive')
            toggle[i].classList.replace('bg-toggle-active', 'bg-toggle-inactive')
        }
    })
}

for(let b = 0; b < btnFocus.length; b++){
    btnFocus[b].addEventListener('mousedown', function(){
        clearBtnSelect()
        btnFocus[b].classList.replace('btn-status-normal', 'btn-status-select')

        for(let i = 0; i < extensionsCard.length; i++){
            let card = extensionsCard[i] //Pegando todos os cards com a classe 'btn-status-extensions'

            if(btnFocus[b].id === 'btn_inactive')
            {
                if(card.classList.contains('active')){
                    card.style.display = 'none'
                }
                else{
                    card.style.display = 'block'
                }
            }  
            else if(btnFocus[b].id === 'btn_active')
            {
                if(card.classList.contains('inactive')){
                    card.style.display = 'none'
                }      
                else{
                    card.style.display = 'block'
                }
            }
            else
            {
                card.style.display = 'block'
            }
        }
    })
}

let clearBtnSelect = function(){
    for(let i = 0; i < btnFocus.length; i++){
        btnFocus[i].classList.replace('btn-status-select', 'btn-status-normal')
    }
}