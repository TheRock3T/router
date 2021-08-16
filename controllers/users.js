const methods = ["index", "sorting", "add"]

class Users {

    constructor() {
        this.Util = new Util()
        this.autoHTML()
    }

    autoHTML() {
        const contentUrl = `./views/${this.Util.controller}.html`
        fetch(contentUrl)
            .then(r => r.text())
            .then(content => {
                this.Util.updateSlot(content)
                this.useMethod()
            })
            .catch(e => alert(e))
    }

    useMethod() {

        if (this.Util.method === "index") {
            this.index()
        }

        if (this.Util.method === "sorting") {
            this.sorting()
        }

        if (this.Util.method === "add") {
            this.add()
        }
    }

    async index() {
        const view = document.querySelector("#data")
        const response = await fetch("./data/users.json")
        const content = await response.text()
        const parseJsonUsers = JSON.parse(content)
        let newUsers = ""
        let users = ""

        if (this.Util.locals.parseUsers !== null) {
            this.Util.locals.parseUsers.forEach(item => {
                newUsers += `
                <div class="block">
                    <h1>ID:      ${item.userId}</h1> 
                    <h1>Имя:     ${item.name}</h1>
                    <h1>Фамилия: ${item.surName}</h1>
                    <h1>Возраст: ${item.age}</h1>  
                </div>
                `
            })
        }

        parseJsonUsers.forEach(item => {
            users += `
        <div class="block">
            <h1>ID:      ${item.userId}</h1>
            <h1>Имя:     ${item.name}</h1> 
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

        this.Util.filterParams(this.Util.params)
        this.Util.sortAge(parseJsonUsers)

        const newJsonUser = parseJsonUsers.filter((item) => {
            let sortKey = this.Util.sortKey
            let sortParam = this.Util.sortParam

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
                <h1>ID:      ${item.userId}</h1>
                <h1>Имя:     ${item.name}</h1> 
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
                <h1>ID:      ${item.userId}</h1>
                <h1>Имя:     ${item.name}</h1> 
                <h1>Фамилия: ${item.surName}</h1>
                <h1>Возраст: ${item.age}</h1>   
            </div>
        `
                view.innerHTML = users + newUsers
            })

            if (typeof this.Util.sortParam !== "undefined" && this.Util.checks.params.includes(this.Util.sortParam) === false) {
                alert("Данный параметр не найден, будут выведены все пользователи")
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
                && typeof inputName.value !== "undefined"
                && typeof inputSurname.value !== "undefined"
                && typeof inputId.value !== "undefined"
                && typeof inputAge.value !== "undefined"
                && this.Util.regulars.name.test(inputName.value) === true
                && this.Util.regulars.surname.test(inputSurname.value) === true
                && this.Util.regulars.age.test(inputAge.value) === true
                && this.Util.regulars.id.test(inputId.value) === true) {

                if (JSON.parse(localStorage.getItem("users")) === null) {
                    localStorage.setItem("users", "[]")
                }

                const parseUsers = JSON.parse(localStorage.getItem("users"))
                parseUsers.push({
                    userId: inputId.value,
                    name: inputName.value,
                    surName: inputSurname.value,
                    age: inputAge.value
                })
                localStorage.setItem("users", JSON.stringify(parseUsers));

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
}
