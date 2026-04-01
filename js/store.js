const add = document.querySelectorAll('.btn-add')

class ExtensionAttributes{
    constructor(img_path, card_title, card_description)
    {
        this.img_path = img_path;
        this.card_title = card_title;
        this.card_description = card_description;
    }
}

let SaveAtributesExtension = function(card){
    const img_path_complete = card.querySelector('img').getAttribute("src")
    const img_path = img_path_complete.split("../").join("")
    const card_title = card.querySelector('.content-card > .card-title').textContent
    const card_description = card.querySelector('.card-description').textContent 
    const list_extensions = JSON.parse(localStorage.getItem("extensions"))
    
    if(list_extensions == null){
        extensionToAdd = []
    }

    const extension = new ExtensionAttributes(img_path, card_title, card_description)
    extensionToAdd.push(extension)
    localStorage.setItem("extensions", JSON.stringify(extensionToAdd))
    //console.log(JSON.parse(localStorage.getItem("extensions")));
        
    //Irá salvar um objeto de objetos
    if(localStorage.getItem("extensions") != null){
        window.alert(`Extensão: ${card_title} adicionada na sua lista de extensões!`)
    }
}

add.forEach((element) => {
    element.addEventListener('click', () => {
        const card = element.closest(".card")
        SaveAtributesExtension(card)
    })
})