const methods = ["index", "sorting", "add"]
const classController = "users"
const classParams = ["userId", "name", "surName", "age"]

class Users {
    constructor() {
        util.autoHTML(this)
    }

    async index() {
        const view = document.querySelector("#data")
        let newUsers = ""
        let users = ""

        await util.parse()

        if (util.locals.parseUsers !== null) {
            util.locals.parseUsers.forEach(item => {
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

        util.parseData.forEach(item => {
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
        let newUsers = ""
        let users = ""

        await util.parse()
        util.filterParams(params)
        util.sortAge(util.parseData)

        const newJsonUser = util.parseData.filter((item) => {
            let sortKey = util.sortKey
            let sortParam = util.sortParam

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
            util.parseData.forEach(item => {
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

            if (typeof util.sortParam !== "undefined" && classParams.includes(util.sortParam) === false) {
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
                && util.regulars.name.test(inputName.value) === true
                && util.regulars.surname.test(inputSurname.value) === true
                && util.regulars.age.test(inputAge.value) === true
                && util.regulars.id.test(inputId.value) === true) {

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
