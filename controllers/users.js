const classMethods = ["index", "search", "add"]
const classController = "users"
const classParams = ["id", "name", "surName", "age"]
const classRegulars = {
    name: /[a-zA-Zа-яёА-ЯЁ]{2,64}/,
    surname: /[a-zA-Zа-яёА-ЯЁ]{2,64}/,
    id: /[0-9]+/,
    age: /[0-9]{1,4}/
}

class Users extends Base {
    constructor() {
        super()
        this.autoHTML(this)
    }

    async index() {
        await this.parse()

        if (util.locals.parse !== null) {
            util.locals.parse.forEach(item => {
                util.divUsers(item)
            })
            this.view.innerHTML = util.newUsers
        }
    }

    async search() {
        await this.parse()

        util.filterParams(params)

        const newJsonUser = util.locals.parse.filter((item) => {
            let sortKey = util.sortKey
            let sortParam = util.sortParam

            if (classParams.includes(sortParam) === true ) {

                if (typeof item[sortParam] === "string") {
                    return item[sortParam] === sortKey
                }

                if (typeof item[sortParam] === "number") {
                    return item[sortParam] === Number(sortKey)
                }
            }
        })

        if (newJsonUser.length !== 0) {
            newJsonUser.forEach(item => {
                util.divUsers(item)
            })
        } else {
            util.locals.parse.forEach(item => {
                util.divUsers(item)
            })

            if (typeof util.sortParam !== "undefined" && classParams.includes(util.sortParam) === false) {
                alert("Данный параметр не найден, будут выведены все пользователи")
            }
        }
        this.view.innerHTML = util.newUsers
    }

    async add() {
        await this.parse()

        this.view.innerHTML = `
            <div class="block">
                <form id="myForm">
                    <input type="text" pattern="[a-zA-Zа-яёА-ЯЁ]{2,64}" name="name" id="name" placeholder="NAME">
                    <input type="text" pattern="[a-zA-Zа-яёА-ЯЁ]{2,64}" name="surname" id="surname" placeholder="SURNAME">
                    <input type="text" pattern="[0-9]{1,4}" name="age" id="age" placeholder="AGE">
                    <input type="text" pattern="[0-9]{1,128000}" name="id" id="id" placeholder="ID">
                    <button type="button" id="clickBtn">ADD POST IN DATABASE</button>
                </form>  
            </div>
        `

        let clickBtn = document.getElementById("clickBtn")

        clickBtn.addEventListener("click", () => {
            let name = document.getElementById("name")
            let surname = document.getElementById("surname")
            let age = document.getElementById("age")
            let id = document.getElementById("id")

            if (util.validChecker(name, surname, age, id) === 1
                && util.validId(Number(id.value)) === false) {
                const parseUsers = JSON.parse(localStorage.getItem("users"))

                parseUsers.push({
                    id: Number(id.value),
                    name: name.value,
                    surName: surname.value,
                    age: Number(age.value)
                })

                localStorage.setItem("users", JSON.stringify(parseUsers))

                alert(`Добавлен новый пользователь:  
                   NAME: ${name.value},  
                SURNAME: ${surname.value}, 
                    AGE: ${age.value}, 
                     ID: ${id.value}`)
            } else {
                alert("Поздравляю ты промазал по клаве и не попал по нужным клавишам, попробуй еще раз!")
            }
            document.getElementById('myForm').reset()
        })
    }
}
