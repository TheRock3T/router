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
            controller: ["users", "posts", "error404"],
            method: ["index", "sorting", "add"],
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
        method = method.replace(/(-.)/g, function (x) {
            return x[1].toUpperCase()
        })
        return method
    }

    upperWord(word) {
        word = word.replace(/[a-z]/, function (x) {
            return x.toUpperCase()
        })
        return word
    }

    updateSlot(content) {
        document.querySelector("#slot").innerHTML = content
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
