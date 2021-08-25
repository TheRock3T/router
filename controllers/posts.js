const classMethods = ["index", "sorting", "add"]
const classController = "posts"
const classRegulars = {
    postNum: /[0-9]+/,
    title: /[a-zA-Zа-яёА-ЯЁ]{1,25}/,
    text: /[a-zA-Zа-яёА-ЯЁ]+/
}

class Posts extends Base {
    constructor() {
        super()
        this.autoHTML(this)
    }

    async index() {
        await this.parse()

        if (util.locals.parse !== null) {
            util.locals.parse.forEach(item => {
                this.divPosts(item)
            })
            this.view.innerHTML = this.newPosts
        }
    }

    async sorting() {
        await this.parse()
        util.sortNums(util.locals.parse)

        if (util.locals.parse !== null) {
            util.locals.parse.forEach(item => {
                this.divPosts(item)
            })
            this.view.innerHTML = this.newPosts
        }
    }

    async add() {
        await this.parse()

        this.view.innerHTML = ` 
                <div class="block">
                    <form id="myForm">
                        <input type="text" pattern="[0-9]+"   id="postNum" name="postNum" placeholder="POST NUMBER">
                        <input type="text" pattern="[a-zA-Zа-яёА-ЯЁ]{1,25}"  id="title" name="title" placeholder="TITLE POST">
                        <input type="text" pattern="[a-zA-Zа-яёА-ЯЁ]+"  id="text" name="text" placeholder="TEXT POST">
                        <button type="button" id="clickBtn">ADD POST IN DATABASE</button>
                    </form>  
                </div>
                `

        let clickBtn = document.getElementById("clickBtn")
        let postNum = document.getElementById("postNum")
        let title = document.getElementById("title")
        let text = document.getElementById("text")

        clickBtn.addEventListener("click", () => {

            if (util.validChecker(postNum, title, text) === 1) {

                const parsePosts = JSON.parse(localStorage.getItem("posts"))

                parsePosts.push({
                    postNum: Number(postNum.value),
                    title: title.value,
                    text: text.value
                })

                localStorage.setItem("posts", JSON.stringify(parsePosts))

                alert(`Добавлен новый пост:  
                    NUMBER POST: ${postNum.value},
                    TITLE: ${title.value},
                    TEXT: ${text.value}`)
            } else {
                alert("Вы не ввели данные, попробуйте ввести данные еще раз!")
            }
            document.getElementById('myForm').reset()
        })
    }
}
