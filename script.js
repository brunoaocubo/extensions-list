const btnFocus = document.querySelectorAll('.btn-status-extensions')
const toggle = document.querySelectorAll('.toggle')
const extensionsCard = document.querySelectorAll('.card')
const remove =  document.querySelectorAll('.btn-remove')


document.addEventListener('DOMContentLoaded', function(){
    for(let i = 0; i < extensionsCard.length; i++){
        if(!extensionsCard[i].classList.contains('inactive') || !extensionsCard[i].classList.contains('active')){
            extensionsCard[i].classList.add('inactive')
        }
    }
})

for(let i = 0; i < remove.length; i++){
    remove[i].addEventListener('mousedown', function(){
        const card = extensionsCard[i]
        card.remove()
    })
}

for(let i = 0; i < toggle.length; i++){
    toggle[i].addEventListener('mousedown', function(){
        //Relacionando o card com o botão clicado. O fluxo vai checar as informações de acordo com o que foi clciado.
        const card = extensionsCard[i] 
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