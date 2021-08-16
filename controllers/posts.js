const methods = ["index", "sorting", "add"]

class Posts {

    constructor() {
        this.Util = new Util()
        this.autoHTML()
    }

    autoHTML() {
        const contentUrl = `./views/${this.Util.controller}.html`
        fetch(contentUrl)
            .then(r => r.text())
            .then(content => {
                this.Util.updateSlot(content)
                this.useMethod()
            })
            .catch(e => alert(e))
    }

    useMethod() {

        if (this.Util.method === "index") {
            this.index()
        }

        if (this.Util.method === "sorting") {
            this.sorting()
        }

        if (this.Util.method === "add") {
            this.add()
        }
    }

    async index() {
        const response = await fetch("./data/posts.json")
        const content = await response.text()
        const parsePosts = JSON.parse(content)
        const view = document.querySelector("#data")
        let newPosts = ""
        let posts = ""

        if (this.Util.locals.parsePosts !== null) {
            this.Util.locals.parsePosts.forEach(item => {
                newPosts += `
                <div class="block">
                    <h1>Номер:     ${item.postNum}</h1>
                    <h1>Заголовок: ${item.title}</h1> 
                    <h1>Текст: ${item.text}</h1>  
                </div>
                `
            })
        }

        parsePosts.forEach(item => {
            posts += `
            <div class="block">
                <h1>Номер:     ${item.postNum}</h1>
                <h1>Заголовок: ${item.title}</h1> 
                <h1>Текст:     ${item.text}</h1>   
            </div>
            `
            view.innerHTML = posts + newPosts
        })
    }

    async sorting() {
        const view = document.querySelector("#data")
        const response = await fetch("./data/posts.json")
        const content = await response.text()
        const parseJsonPosts = JSON.parse(content)
        let newPosts = ""
        let users = ""

        this.Util.sortId(parseJsonPosts)

        if (this.Util.locals.parsePosts !== null) {
            this.Util.locals.parsePosts.forEach(item => {
                newPosts += `
                <div class="block">
                    <h1>Номер:     ${item.postNum}</h1>
                    <h1>Заголовок: ${item.title}</h1> 
                    <h1>Текст:     ${item.text}</h1>  
                </div>
                `
            })
        }

        parseJsonPosts.forEach(item => {
            users += `
        <div class="block">
            <h1>Номер:     ${item.postNum}</h1>
            <h1>Заголовок: ${item.title}</h1> 
            <h1>Текст:     ${item.text}</h1>  
        </div>
        `
            view.innerHTML = users + newPosts
        })
    }

    add() {
        document.querySelector("#data").innerHTML = `
                <div class="block">
                    <form>
                        <input type="text" id="numPost" name="title" placeholder="POST NUMBER">
                        <input type="text" id="titlePost" name="title" placeholder="TITLE POST">
                        <input type="text" id="textPost" name="text" placeholder="TEXT POST">
                        <button type="button" id="clickBtn">ADD POST IN DATABASE</button>
                    </form>  
                </div>
                `
        let clickBtn = document.getElementById("clickBtn")
        let inputNumPost = document.getElementById("numPost")
        let inputTitlePost = document.getElementById("titlePost")
        let inputTextPost = document.getElementById("textPost")

        clickBtn.addEventListener("click", () => {

            if (inputTextPost.value !== ""
                && inputTitlePost.value !== ""
                && inputNumPost.value !== "") {

                if (JSON.parse(localStorage.getItem("posts")) === null) {
                    localStorage.setItem("posts", `[]`)
                }

                const parsePosts = JSON.parse(localStorage.getItem("posts"))
                parsePosts.push({postNum: inputNumPost.value, title: inputTitlePost.value, text: inputTextPost.value})
                localStorage.setItem("posts", JSON.stringify(parsePosts));
                alert(`Добавлен новый пост:  
                    NUMBER POST: ${inputNumPost.value},
                    TITLE: ${inputTitlePost.value},
                    TEXT: ${inputTextPost.value}`)
            } else {
                alert("Вы не ввели данные, попробуйте хотя бы вписать что-то или придет ОНО!")
            }

            document.getElementById("numPost").value = ""
            document.getElementById("titlePost").value = ""
            document.getElementById("textPost").value = ""
        })
    }
}
