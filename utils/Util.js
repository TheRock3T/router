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
