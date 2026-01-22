const btnFocus = document.querySelectorAll('.btn-status-extensions')
const toggles = document.querySelectorAll('.toggle')
const extensionsCard = document.querySelectorAll('.card')
const remove =  document.querySelectorAll('.btn-remove')
const extensionToAdd = []
const containerListCards = document.querySelector('#container-list-cards')
const add = document.querySelectorAll('.btn-add')

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
        SaveAtributesExtension(card)
    })
}

class ExtensionAttributes{
    constructor(img_path, card_title, card_description)
    {
        this.img_path = img_path;
        this.card_title = card_title;
        this.card_description = card_description;
    }
}

let SaveAtributesExtension = function(card){
    const img_path = card.querySelector('img').getAttribute("src")
    const card_title = card.querySelector('.content-card > .card-title').textContent
    const card_description = card.querySelector('.card-description').textContent
    const extension = new ExtensionAttributes(img_path, card_title, card_description)
    extensionToAdd.push(extension)

    //Irá salvar um objeto de objetos
    localStorage.setItem("extensions", JSON.stringify(extensionToAdd))
}

if(window.location.pathname.includes("index")){
    const refresh = document.querySelector('#refresh')
    refresh.addEventListener('mousedown', function(){
        
        //Irá retornar um objeto de objetos.
        const list_extensions = JSON.parse(localStorage.getItem("extensions"))
        const item = list_extensions[0]
        console.log(item)
        CreateCard(item.img_path, item.card_title, item.card_description)
    })
}

let CreateCard = function(img_path, card_title, card_description){
    const card = document.createElement("article")
    card.classList.add('card')
    card.classList.add('inactive')
    CreateLogo(card, img_path, card_title)
    CreateContentCard(card, card_title, card_description)
    CreateCliackables(card)
    containerListCards.appendChild(card)
}

let CreateLogo = function(card, img_path, card_title){
    const logo = document.createElement("img")
    logo.setAttribute("src", img_path)
    logo.setAttribute("alt", card_title)
    logo.classList.add('logo-extension')
    card.appendChild(logo)
}

let CreateContentCard = function(card, card_title, card_description){
    const content_card = document.createElement("div")
    const title = document.createElement("h3")
    const description = document.createElement("p")
    content_card.classList.add("content-card")
    title.classList.add("card-title")
    description.classList.add("card-description")
    title.textContent = card_title
    description.textContent = card_description
    content_card.appendChild(title)
    content_card.appendChild(description)
    card.appendChild(content_card)
}

let CreateCliackables = function(card){
    const container_clickables = document.createElement("div") 
    const btn_remove = document.createElement("button")
    const div_bg_toggle = document.createElement("div")
    const toggle = document.createElement("div")
    container_clickables.classList.add("clickables")
    btn_remove.classList.add("btn-remove")
    div_bg_toggle.classList.add("bg-toggle-inactive")
    div_bg_toggle.classList.add("toggle")
    toggle.classList.add("toggle-inactive")
    btn_remove.textContent = "Remove"
    container_clickables.appendChild(btn_remove)
    container_clickables.appendChild(div_bg_toggle)
    div_bg_toggle.appendChild(toggle)
    card.appendChild(container_clickables)
}

for(let i = 0; i < remove.length; i++){
    remove[i].addEventListener('mousedown', function(){
        const card = toggles[i].closest(".card")
        card.remove()
    })
}

toggles.forEach((toggle) => {
    toggle.addEventListener('mousedown', () =>{
    //Relacionando o card com o botão clicado. O fluxo vai checar as informações de acordo com o que foi clciado.
    const card = toggle.closest(".card")
    let toggleChild = toggle.firstElementChild.classList

    if(card.classList.contains('inactive')){
        toggleChild.replace('toggle-inactive', 'toggle-active')
        card.classList.replace('inactive', 'active')
        toggle.classList.replace('bg-toggle-inactive', 'bg-toggle-active')
    }
    else{
        toggleChild.replace('toggle-active', 'toggle-inactive')
        card.classList.replace('active', 'inactive')
        toggle.classList.replace('bg-toggle-active', 'bg-toggle-inactive')
    }
    })
})




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