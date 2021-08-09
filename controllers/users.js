import {sortAge, camelCase, updateSlot} from "../utils/functions.js"
import {
    regName,
    regSurname,
    regAge,
    regId,
    parseLocalUsers,
    checkParams
} from "../utils/constants.js"

class Users extends MethodControl {
    constructor() {
        super()
        this.controller = "users"
        this.autoHTML()
        camelCase(this.method)
    }

    autoHTML() {
        const contentUrl = `./views/${this.controller}.html`
        fetch(contentUrl)
            .then(r => r.text())
            .then(content => {
                updateSlot(content)
                this.useMethod()
            })
            .catch(e => alert(e))
    }

    async index() {
        const view = document.querySelector("#data")
        const response = await fetch("./data/users.json")
        const content = await response.text()
        const parseJsonUsers = JSON.parse(content)
        let newUsers = ""
        let users = ""

        if (parseLocalUsers !== null) {
            parseLocalUsers.forEach(item => {
                newUsers += `
                <div class="block">
                    <h1>ID: ${item.userId}</h1> 
                    <h1>Имя: ${item.name}</h1>
                    <h1>Фамилия: ${item.surName}</h1>
                    <h1>Возраст: ${item.age}</h1>  
                </div>
                `
            })
        }

        parseJsonUsers.forEach(item => {
            users += `
        <div class="block">
            <h1>ID: ${item.userId}</h1>
            <h1>Имя: ${item.name}</h1> 
            <h1>Фамилия: ${item.surName}</h1>   
            <h1>Возраст: ${item.age}</h1> 
        </div>
        `
            view.innerHTML = users + newUsers
        })
    }

    async sorting() {
        const view = document.querySelector("#data")
        const response = await fetch("./data/users.json")
        const content = await response.text()
        const parseJsonUsers = JSON.parse(content)
        let newUsers = ""
        let users = ""

        this.filterParams(this.params)
        sortAge(parseJsonUsers)

        const newJsonUser = parseJsonUsers.filter((item) => {
            let sortKey = this.sortKey
            let sortParam = this.sortParam

            if (sortParam === "userId") {
                return item.userId == sortKey;
            }

            if (sortParam === "name") {
                return item.name === sortKey;
            }

            if (sortParam === "surName") {
                return item.surName === sortKey;
            }

            if (sortParam === "age") {
                return item.age == sortKey;
            }
        })

        if (newJsonUser.length !== 0) {
            newJsonUser.forEach(item => {
                users += `
            <div class="block">
                <h1>ID: ${item.userId}</h1>
                <h1>Имя: ${item.name}</h1> 
                <h1>Фамилия: ${item.surName}</h1>
                <h1>Возраст: ${item.age}</h1>   
            </div>
                `
                view.innerHTML = users + newUsers
            })
        } else {
            parseJsonUsers.forEach(item => {
                users += `
            <div class="block">
                <h1>ID: ${item.userId}</h1>
                <h1>Имя: ${item.name}</h1> 
                <h1>Фамилия: ${item.surName}</h1>
                <h1>Возраст: ${item.age}</h1>   
            </div>
        `
                view.innerHTML = users + newUsers
            })

            if (this.sortParam !== undefined && checkParams.includes(this.sortParam) === false) {
                alert("Данный параметр не найден, буду выведены все пользователи")
            }
        }
    }

    add() {
        document.querySelector("#data").innerHTML = `
            <div class="block">
                <form>
                    <input type="text" pattern="[a-zA-Zа-яёА-ЯЁ]{4,8}" name="nameUser" id="name" placeholder="NAME">
                    <input type="text" pattern="[a-zA-Zа-яёА-ЯЁ]{2,15}" name="surName" id="surname" placeholder="SURNAME">
                    <input type="text" pattern="[0-9]{1,3}" name="age" id="age" placeholder="AGE">
                    <input type="text" pattern="[0-9]{1,9999999}" name="id" id="id" placeholder="ID">
                    <button type="button" id="clickBtn">ADD POST IN DATABASE</button>
                </form>  
            </div>
        `
        let clickBtn = document.getElementById("clickBtn")
        clickBtn.addEventListener("click", () => {
            let inputName = document.getElementById("name");
            let inputSurname = document.getElementById("surname");
            let inputAge = document.getElementById("age");
            let inputId = document.getElementById("id");

            if (inputName.value !== ""
                && inputSurname.value !== ""
                && inputId.value !== ""
                && inputAge.value !== ""
                && inputName.value !== undefined
                && inputSurname.value !== undefined
                && inputId.value !== undefined
                && inputAge.value !== undefined
                && regName.test(inputName.value) === true
                && regSurname.test(inputSurname.value) === true
                && regAge.test(inputAge.value) === true
                && regId.test(inputId.value) === true) {

                if (JSON.parse(localStorage.getItem("users")) === null) {
                    localStorage.setItem("users", "[]")
                }

                const parseLocalUsers = JSON.parse(localStorage.getItem("users"))
                parseLocalUsers.push({
                    userId: inputId.value,
                    name: inputName.value,
                    surName: inputSurname.value,
                    age: inputAge.value
                })
                localStorage.setItem("users", JSON.stringify(parseLocalUsers));

                alert(`Добавлен новый пользователь:  
                NAME: ${inputName.value},  
                SURNAME: ${inputSurname.value}, 
                AGE: ${inputAge.value}, 
                ID: ${inputId.value}`)
            } else {
                alert("Поздравляю ты промазал по клаве и не попал по нужным клавишам, попробуй еще раз!")
            }

            document.getElementById("name").value = ""
            document.getElementById("surname").value = ""
            document.getElementById("age").value = ""
            document.getElementById("id").value = ""

        })
    }

    filterParams(params) {
        params.forEach((item, index) => {
            if (index % 2 === 0) {
                this.sortParam = item
            } else {
                this.sortKey = item
            }
        })
    }
}

new Users()
