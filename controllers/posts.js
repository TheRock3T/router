const classMethods = ["index", "sorting", "add"]
const classController = "posts"
const classRegulars = {
    number: /[0-9]+/,
    title: /[a-zA-Zа-яёА-ЯЁ]{1,25}/,
    text: /[a-zA-Zа-яёА-ЯЁ]+/,
}

class Posts extends mainController {
    constructor() {
        super()
        this.autoHTML(this)
    }

    async index() {
        await this.parse()

        if (util.locals.parse !== null) {
            util.locals.parse.forEach(item => {
                this.newPosts += `
                <div class="block">
                    <h1>Номер: ${item.postNum}</h1>
                    <h1>Заголовок: ${item.title}</h1> 
                    <h1>Текст: ${item.text}</h1>  
                </div>
                `
                this.view.innerHTML = this.newPosts
            })
        }
    }

    async sorting() {
        await this.parse()

        if (util.locals.parse !== null) {
            util.locals.parse.forEach(item => {
                this.newPosts += `
                <div class="block">
                    <h1>Номер: ${item.postNum}</h1>
                    <h1>Заголовок: ${item.title}</h1> 
                    <h1>Текст: ${item.text}</h1>  
                </div>
                `
                this.view.innerHTML = this.newPosts
            })
        }
    }

    async add() {
        await this.parse()

        this.view.innerHTML = ` 
                <div class="block">
                    <form id="myForm">
                        <input type="text" pattern="[0-9]+"   id="numPost" name="title" placeholder="POST NUMBER">
                        <input type="text" pattern="[a-zA-Zа-яёА-ЯЁ]{1,25}"  id="titlePost" name="title" placeholder="TITLE POST">
                        <input type="text" pattern="[a-zA-Zа-яёА-ЯЁ]+"  id="textPost" name="text" placeholder="TEXT POST">
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
                && inputNumPost.value !== ""
                && typeof inputNumPost.value !== "undefined"
                && typeof inputTitlePost.value !== "undefined"
                && typeof inputTextPost.value !== "undefined"
                && classRegulars.number.test(inputNumPost.value) === true
                && classRegulars.title.test(inputTitlePost.value) === true
                && classRegulars.text.test(inputTextPost.value) === true) {

                const parsePosts = JSON.parse(localStorage.getItem("posts"))
                parsePosts.push({postNum: inputNumPost.value, title: inputTitlePost.value, text: inputTextPost.value})
                localStorage.setItem("posts", JSON.stringify(parsePosts));
                alert(`Добавлен новый пост:  
                    NUMBER POST: ${inputNumPost.value},
                    TITLE: ${inputTitlePost.value},
                    TEXT: ${inputTextPost.value}`)
            } else {
                alert("Вы не ввели данные, попробуйте ввести данные еще раз!")
            }

            document.getElementById('myForm').reset()
        })
    }
}
