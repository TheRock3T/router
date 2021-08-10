class Util {

    constructor() {
        this.regulars = {
            name: /[a-zA-Zа-яёА-ЯЁ]{4,8}/,
            surname: /[a-zA-Zа-яёА-ЯЁ]{2,15}/,
            id: /[0-9]+/,
            age: /[0-9]{1,3}/,
            params: /[A-Za-zа-яёА-ЯЁ0-9]{1,10}/,
            slashWord: /\b[A-Za-z]+(?:-+[A-Za-z]+)+\b/,
            word: /^[A-Za-z]*$/
        }

        this.checks = {
            method: ["index", "sorting", "add", "add-user"],
            params: ["userId", "name", "surName", "age"]
        }

        this.locals = {
            parsePosts: JSON.parse(localStorage.getItem("posts")),
            parseUsers: JSON.parse(localStorage.getItem("users"))
        }

        const [controller, method, ...params] = window.location.hash.substring(2).split("/")

        this.controller = controller
        this.method = method
        this.params = params
    }

    sortAge(arr, param) {
        arr.sort((a, b) => a.age > b.age ? 1 : -1);
    }

    sortId(arr) {
        arr.sort((a, b) => a.postNum > b.postNum ? 1 : -1);
    }

    camelCase(method) {
        if (typeof method !== "undefined") {
            method = method.replace(/(-.)/g, function (x) {
                return x[1].toUpperCase()
            })
            return method
        }
    }

    updateSlot(content) {
        document.querySelector("#slot").innerHTML = content
    }
}