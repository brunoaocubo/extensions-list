const btnFocus = document.querySelectorAll('.btn-status-extensions')
const toggle = document.querySelectorAll('.toggle')
const extensionsCard = document.querySelectorAll('.card')

document.addEventListener('DOMContentLoaded', function(){
    for(let i = 0; i < extensionsCard.length; i++){
        if(!extensionsCard[i].classList.contains('inactive') || !extensionsCard[i].classList.contains('active')){
            extensionsCard[i].classList.add('inactive')
        }
    }
})

for(let i = 0; i < toggle.length; i++){
    toggle[i].addEventListener('mousedown', function(){
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
    btnFocus[b].addEventListener('click', function(){
        clearBtnSelect()
        btnFocus[b].classList.replace('btn-status-normal', 'btn-status-select')

        for(let i = 0; i < extensionsCard.length; i++){
            if(btnFocus[b].id === 'btn_inactive')
            {
                if(extensionsCard[i].classList.contains('active')){
                    extensionsCard[i].style.display = 'none'
                }
                else{
                    extensionsCard[i].style.display = 'block'
                }
            }  
            else if(btnFocus[b].id === 'btn_active')
            {
                if(extensionsCard[i].classList.contains('inactive')){
                    extensionsCard[i].style.display = 'none'
                }      
                else{
                    extensionsCard[i].style.display = 'block'
                }
            }
            else
            {
                extensionsCard[i].style.display = 'block'
            }
        }
    })
}

let clearBtnSelect = function(){
    for(let i = 0; i < btnFocus.length; i++){
        btnFocus[i].classList.replace('btn-status-select', 'btn-status-normal')
    }
}