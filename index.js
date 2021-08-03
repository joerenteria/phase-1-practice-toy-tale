const toyCollection = document.getElementById(`toy-collection`)
const toyForm = document.querySelector(`.add-toy-form`)

function init(){
    getToys()
    toyForm.addEventListener(`submit`,postToy)
}

init()


function getToys(){
fetch(`http://localhost:3000/toys`)
.then(resp => resp.json())
.then(function(resp){
    resp.forEach(renderCard)
})
}

function renderCard(resp){
    const toyCard = document.createElement(`div`)
    toyCard.className = `card`

    const toyImage = document.createElement(`img`)
    toyImage.src = resp.image
    toyImage.style.width = `250px`
    toyImage.className =`toy-avatar`

    const toyName = document.createElement(`h2`)
    toyName.textContent = resp.name

    const toyLikesDisplay = document.createElement(`p`)
    toyLikesDisplay.innerText = resp.likes
    toyLikesDisplay.id = `likes${resp.id}`

    const likeButton = document.createElement(`button`)
    likeButton.textContent = `Like`
    likeButton.className = `like-btn`
    likeButton.id = `toy_id`
    likeButton.addEventListener(`click`,function(){patchLike(resp)})

    toyCard.append(toyImage,toyName,toyLikesDisplay,likeButton)
    toyCollection.append(toyCard)
}

function postToy(e){
    e.preventDefault();
    const newImage = toyForm.imageInput.value
    const newName = toyForm.nameInput.value
    const newToy = {
        image:  newImage,
        name: newName,
        likes: 0
    }

    fetch(`http://localhost:3000/toys`,{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(newToy)
    })
    .then(resp => resp.json())
    .then(renderCard)
}

function patchLike(resp){
    const likeCounter = document.getElementById(`likes${resp.id}`)
    const likeNumber = ++resp.likes

    fetch(`http://localhost:3000/toys/${resp.id}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            likes: likeNumber
        })
    })

    .then(resp => resp.json())
    .then(likeCounter.textContent = resp.likes)

}