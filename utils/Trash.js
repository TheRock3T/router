class Trash {

    constructor() {
        this.regulars = {
            regName: /[a-zA-Zа-яёА-ЯЁ]{4,8}/,
            regSurname: /[a-zA-Zа-яёА-ЯЁ]{2,15}/,
            regId: /[0-9]+/,
            regAge: /[0-9]{1,3}/,
            regParams: /[A-Za-zа-яёА-ЯЁ0-9]{1,10}/,
            regSlashWord: /\b[A-Za-z]+(?:-+[A-Za-z]+)+\b/,
            regWord: /^[A-Za-z]*$/
        }

        this.checks = {
            checkMethod: ["index", "sorting", "add", "add-user"],
            checkParams: ["userId", "name", "surName", "age"]
        }

        this.locals = {
            parseLocalPosts: JSON.parse(localStorage.getItem("posts")),
            parseLocalUsers: JSON.parse(localStorage.getItem("users"))
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
