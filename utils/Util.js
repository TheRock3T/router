class Util {
    constructor() {
        this.regulars = {
            slashWord: /\b[A-Za-z]+(?:-+[A-Za-z]+)+\b/,
            word: /^[A-Za-z]*$/
        }

        this.locals = {
            parse: JSON.parse(localStorage.getItem(`${controller}`))
        }

        this.defaultValue = {
            statusFile: "NO_CONNECT",
            statusError: false
        }

        this.newUsers = ""
        this.newPosts = ""
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

    sortNums(arr) {
        arr.sort((a, b) => a.id > b.id ? 1 : -1)
    }

    validChecker(...checkItem) {
        let result = true

        checkItem.forEach((item) => {

            if (item.value !== ""
                && typeof item.value !== "undefined"
                && classRegulars[item.name].test(item.value) === true) {
                result &= true
            } else {
                result &= false
            }
        })
        return result
    }

    validId(itemId) {
        let checkId = []

        this.locals.parse.forEach((item) => checkId.push(item.id))
            return checkId.includes(itemId)
    }

    divUsers(item) {
        this.newUsers += `
                <div class="block">
                    <h1>ID:      ${item.id}</h1> 
                    <h1>Имя:     ${item.name}</h1>
                    <h1>Фамилия: ${item.surName}</h1>
                    <h1>Возраст: ${item.age}</h1>  
                </div>
                `
    }

    divPosts(item) {
        this.newPosts += `
                <div class="block">
                    <h1>Номер: ${item.id}</h1>
                    <h1>Заголовок: ${item.title}</h1> 
                    <h1>Текст: ${item.text}</h1>  
                </div>
                `
    }
}
