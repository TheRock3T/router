import {sort} from '../utils/functions.js'
import {regName, regSurname, regAge, regId, parseLocalUsers} from '../utils/constants.js'
class Users {
    constructor() {
        this.autoHTML()
    }

    autoHTML() {
        const contentUrl = `./views/users.html`
            fetch(contentUrl)
                .then(r => r.text())
                .then(content => {
                    this.updateSlot(content)
                    this.useMethod()
                })
    }

    updateSlot(content) {
        document.querySelector('#slot').innerHTML = content
    }

    useMethod() {
        let [controller, method, ...params] = window.location.hash.substring(2).split('/')
        this.method = method

        if (this.method !== undefined) {
            this.camelCase()
        }

        if (this.method === 'indexUsers') {
            this.indexUsers()
        }

        if (this.method === 'sortingUsers') {
            this.sortingUsers()
        }

        if (this.method === 'addUser') {
            this.addUser()
        }

    }

    async indexUsers() {
        const view = document.querySelector('#data')
        const response = await fetch('./data/users.json')
        const content = await response.text()
        const parseJsonUsers = JSON.parse(content)
        let newUsers = ''
        let users = ''
        // const newJsonUser = parseJsonUsers.filter(function(item){
        //     return item.userId == 6;
        // })

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
                console.log(newUsers)
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

    filterParams(params) {
        params.forEach((item, index) => {
            if (index % 2 === 0) {
                return this.sortParam = item
            } else {
                return this.sortKey = item
            }
        })
    }

    async sortingUsers() {
        const view = document.querySelector('#data')
        const response = await fetch('./data/users.json')
        const content = await response.text()
        const parseJsonUsers = JSON.parse(content)
        let newUsers = ''
        let users = ''
        sort(parseJsonUsers)

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

    addUser() {
        document.querySelector('#data').innerHTML = `
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
        this.newUserData()
    }

    newUserData() {
        let inputName = document.getElementById("name");
        let inputSurname = document.getElementById("surname");
        let inputAge = document.getElementById("age");
        let inputId = document.getElementById("id");
        let clickBtn = document.getElementById("clickBtn")
        clickBtn.addEventListener('click', added)

        function added() {

            if (inputName.value !== ""
                && inputSurname.value !== ''
                && inputId.value !== ''
                && inputAge.value !== ''
                && regName.test(inputName.value) === true
                && regSurname.test(inputSurname.value) === true
                && regAge.test(inputAge.value) === true
                && regId.test(inputId.value) === true) {

                if (JSON.parse(localStorage.getItem("users")) === null) {
                    localStorage.setItem("users", "[]")
                }

                parseLocalUsers.push({userId:inputId.value, name:inputName.value, surName:inputSurname.value, age: inputAge.value})
                localStorage.setItem("users", JSON.stringify(parseLocalUsers));

                alert(`Добавлен новый пользователь:  
                NAME: ${inputName.value},  
                SURNAME: ${inputSurname.value}, 
                AGE: ${inputAge.value}, 
                ID: ${inputId.value}`)
            } else {
                alert('Поздравляю ты промазал по клаве и не попал по нужным клавишам, попробуй еще раз!')
            }

            document.getElementById("name").value = ""
            document.getElementById("surname").value = ""
            document.getElementById("age").value = ""
            document.getElementById("id").value = ""
        }
    }

    camelCase() {
        this.method = this.method.replace(/(-.)/g, function (x) {
            return x[1].toUpperCase()
        })
    }
}

new Users()
