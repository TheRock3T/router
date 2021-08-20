class Util {
    constructor() {
        this.regulars = {
            name: /[a-zA-Zа-яёА-ЯЁ]{4,8}/,
            surname: /[a-zA-Zа-яёА-ЯЁ]{2,15}/,
            id: /[0-9]+/,
            age: /[0-9]{1,3}/,
            slashWord: /\b[A-Za-z]+(?:-+[A-Za-z]+)+\b/,
            word: /^[A-Za-z]*$/
        }

        this.checks = {
            params: ["userId", "name", "surName", "age"]
        }

        this.locals = {
            parsePosts: JSON.parse(localStorage.getItem("posts")),
            parseUsers: JSON.parse(localStorage.getItem("users"))
        }

        this.defaultValue = {
            statusFile: "NO_CONNECT",
            statusError: false
        }
    }

    sortAge(arr) {
        arr.sort((a, b) => a.age > b.age ? 1 : -1);
    }

    sortId(arr) {
        arr.sort((a, b) => a.postNum > b.postNum ? 1 : -1);
    }

    upperWord(word) {
        return word.replace(/[a-z]/, function (x) {
            return x.toUpperCase()
        })
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

    autoHTML(classMethod) {
        const contentUrl = `./views/${controller}.html`
        fetch(contentUrl)
            .then(r => r.text())
            .then(content => {
                this.updateSlot(content)
                this.useMethod(classMethod)
            })
            .catch(e => alert(e))
    }

    useMethod(classMethod) {
        if (method === "index") {
            classMethod.index()
        }

        if (method === "sorting") {
            classMethod.sorting()
        }

        if (method === "add") {
            classMethod.add()
        }
    }

    async parse() {
        const response = await fetch(`./data/${controller}.json`)
        const content = await response.text()
        this.parseData = JSON.parse(content)
    }
}
