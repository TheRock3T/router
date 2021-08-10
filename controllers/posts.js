import {sortId, updateSlot} from "../utils/functions.js"
import {parseLocalPosts} from "../utils/constants.js"

class Posts extends MethodControl {
    constructor() {
        super()
        this.controller = "posts"
        this.autoHTML()
    }

    autoHTML() {
        const contentUrl = `./views/${this.controller}.html`
        fetch(contentUrl)
            .then(r => r.text())
            .then(content => {
                updateSlot(content)
                this.useMethod()
            })
            .catch(e => alert(e))
    }

    async index() {
        const response = await fetch("./data/posts.json")
        const content = await response.text()
        const parsePosts = JSON.parse(content)
        const view = document.querySelector("#data")
        let newPosts = ""
        let posts = ""

        if (parseLocalPosts !== null) {
            parseLocalPosts.forEach(item => {
                newPosts += `
                <div class="block">
                    <h1>Заголовок: ${item.title}</h1> 
                    <h1>Текст: ${item.text}</h1>  
                </div>
                `
            })
        }

        parsePosts.forEach(item => {
            posts += `
            <div class="block">
                <h1>Номер: ${item.postNum}</h1>
                <h1>Заголовок: ${item.title}</h1> 
                <h1>Текст: ${item.text}</h1>   
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
        sortId(parseJsonPosts)

        if (parseLocalPosts !== null) {
            parseLocalPosts.forEach(item => {
                newPosts += `
                <div class="block">
                    <h1>Заголовок: ${item.title}</h1> 
                    <h1>Текст: ${item.text}</h1>  
                </div>
                `
            })
        }

        parseJsonPosts.forEach(item => {
            users += `
        <div class="block">
            <h1>Номер: ${item.postNum}</h1>
            <h1>Заголовок: ${item.title}</h1> 
            <h1>Текст: ${item.text}</h1>  
        </div>
        `
            view.innerHTML = users + newPosts
        })
    }

    add() {
        document.querySelector("#data").innerHTML = `
                <div class="block">
                    <form>
                        <input type="text" id="titlePost" name="title" placeholder="TITLE POST">
                        <input type="text" id="textPost" name="text" placeholder="TEXT POST">
                        <button type="button" id="clickBtn">ADD POST IN DATABASE</button>
                    </form>  
                </div>
                `
        let clickBtn = document.getElementById("clickBtn")
        let inputTitlePost = document.getElementById("titlePost");
        let inputTextPost = document.getElementById("textPost");
        clickBtn.addEventListener("click", () => {

            if (inputTextPost.value !== "" && inputTitlePost.value !== "") {

                if (JSON.parse(localStorage.getItem("posts")) === null) {
                    localStorage.setItem("posts", "[]")
                }

                const parseLocalPosts = JSON.parse(localStorage.getItem("posts"))
                parseLocalPosts.push({title: inputTitlePost.value, text: inputTextPost.value})
                localStorage.setItem("posts", JSON.stringify(parseLocalPosts));
                alert(`Добавлен новый пост:  TITLE: ${inputTitlePost.value},  TEXT: ${inputTextPost.value}`)

            } else {
                alert("Вы не ввели данные, попробуйте хотя бы вписать что-то или придет ОНО!")
            }

            document.getElementById("titlePost").value = ""
            document.getElementById("textPost").value = ""
        })
    }
}

new Posts()
