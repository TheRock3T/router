const classMethods = ["index", "sorting", "add"]
const classController = "users"
const classParams = ["userId", "name", "surName", "age"]
const classRegulars = {
    name: /[a-zA-Zа-яёА-ЯЁ]{4,8}/,
    surname: /[a-zA-Zа-яёА-ЯЁ]{2,15}/,
    id: /[0-9]+/,
    age: /[0-9]{1,3}/
}

class Users {
    constructor() {
        util.autoHTML(this)
    }

    async index() {
        const view = document.querySelector("#data")
        let newUsers = ""

        await util.parse()

        if (util.locals.parse !== null) {
            util.locals.parse.forEach(item => {
                newUsers += `
                <div class="block">
                    <h1>ID:      ${item.userId}</h1> 
                    <h1>Имя:     ${item.name}</h1>
                    <h1>Фамилия: ${item.surName}</h1>
                    <h1>Возраст: ${item.age}</h1>  
                </div>
                `
                view.innerHTML = newUsers
            })
        }
    }

    async sorting() {
        const view = document.querySelector("#data")
        let newUsers = ""


        await util.parse()
        util.filterParams(params)

        const newJsonUser = util.locals.parse.filter((item) => {
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
                newUsers += `
            <div class="block">
                <h1>ID:      ${item.userId}</h1>
                <h1>Имя:     ${item.name}</h1> 
                <h1>Фамилия: ${item.surName}</h1>
                <h1>Возраст: ${item.age}</h1>   
            </div>
                `
                view.innerHTML = newUsers
            })
        } else {
            util.locals.parse.forEach(item => {
                newUsers += `
            <div class="block">
                <h1>ID:      ${item.userId}</h1>
                <h1>Имя:     ${item.name}</h1> 
                <h1>Фамилия: ${item.surName}</h1>
                <h1>Возраст: ${item.age}</h1>   
            </div>
        `
                view.innerHTML = newUsers
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

        clickBtn.addEventListener("click", async () => {
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
                && classRegulars.name.test(inputName.value) === true
                && classRegulars.surname.test(inputSurname.value) === true
                && classRegulars.age.test(inputAge.value) === true
                && classRegulars.id.test(inputId.value) === true) {

                await util.parse()

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

            document.getElementById('myForm').reset()
        })
    }
}
