
const GET_URL = "http://localhost:3000/monsters/?_limit=50&_page=" // ${page}
const POST_URL = "http://localhost:3000/monsters"

let page = 1

function createMonsterForm () {
    const createMonster = document.querySelector("#create-monster")
    
    const monsterForm = document.createElement("form")
        monsterForm.id = "monster-form"
    
    const nameInput = document.createElement("input")
        nameInput.id = "name"
        nameInput.placeholder = "name..."

    const ageInput = document.createElement("input")
        ageInput.id = "age"
        ageInput.placeholder = "age..."

    const descriptionInput = document.createElement("input")
        descriptionInput.id = "description"
        descriptionInput.placeholder = "description..."

    const submitBttn = document.createElement("button")
        submitBttn.textContent = "Create"

    monsterForm.append(nameInput, ageInput, descriptionInput, submitBttn)
    
    console.log(monsterForm)
    
    console.log(createMonster)
    
    createMonster.append(monsterForm)

    submitMonster(createMonster, monsterForm) 

}

function submitMonster (createMonster, monsterForm) {
    createMonster.addEventListener("submit", e=>{e.preventDefault(), postMonster(grabFormData(monsterForm)), clearForm()})
    function clearForm () {
        monsterForm.reset()
    }
    console.log(clearForm)
}

function grabFormData (monsterForm) {
    const name = monsterForm.querySelector("#name")
    const age = monsterForm.querySelector("#age")
    const description = monsterForm.querySelector("#description")
    return {name: name.value, age: age.value, description: description.value}
}

function postMonster(monster) {
    console.log(monster)
    const POST = {  //memorize
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(monster)
    }

    fetch(POST_URL, POST)
        .then(res => res.json())
        .then(res =>(console.log("new monster",res)))

}

function getMonsters () {
    fetch(GET_URL + page)
    .then(res => res.json())
    .then(monsters => createCards(monsters))
}

function createCards(monsters) {
    const monsterContainer = document.querySelector('#monster-container')
    monsterContainer.innerHTML = ""
    monsters.forEach(monster => {
        const monsterCard = document.createElement("div")
        
        const monsterName = document.createElement("h2")
            monsterName.textContent = `${monster.name}`
        
        const monsterAge = document.createElement("h4")
            monsterAge.textContent = `Age: ${monster.age}`
        
        const monsterBio = document.createElement("p")
            monsterBio.textContent = `Bio: ${monster.description}`

        monsterCard.append(monsterName, monsterAge, monsterBio)

        monsterContainer.append(monsterCard)
    })
}

function pageSelectors () {
    const forward = document.querySelector("#forward")
    const back = document.querySelector("#back")

    forward.addEventListener("click", () => pageForward())
    
    back.addEventListener("click", () => pageBack())

}

function pageForward () {
    ++page
    getMonsters()

}

function pageBack () {
    console.log(page)
    page>1 ? (--page, getMonsters()) : alert("Can't move back anymore")
}

const init = () => {console.log("Initiated"), createMonsterForm(), getMonsters(), pageSelectors()}

document.addEventListener("DOMContentLoaded", init)


//update JSON "monsters" object 

//get function GET_URL with h1.name, h2.age, p.description

//2 x addEventListener one that --page and ++page on click 
//
