class Util {
    constructor() {
        this.regulars = {
            slashWord: /\b[A-Za-z]+(?:-+[A-Za-z]+)+\b/,
            word: /^[A-Za-z]*$/
        }

        this.locals = {
            parse: JSON.parse(localStorage.getItem(`${controller}`)),
        }

        this.defaultValue = {
            statusFile: "NO_CONNECT",
            statusError: false
        }
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
        this.parseData = await response.text()

        if (JSON.parse(localStorage.getItem(`${controller}`)) === null) {
            console.log(util.parseData)
            localStorage.setItem(`${controller}`, `${util.parseData}`)
        }
    }
}
