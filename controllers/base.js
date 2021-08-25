class Base {
    constructor() {
        this.newUsers = ""
        this.newPosts = ""
    }

    autoHTML(classMethod) {
        const contentUrl = `./views/${controller}.html`
        fetch(contentUrl)
            .then(res => res.text())
            .then(content => {
                this.updateSlot(content)
                connectMethod.useMethod(classMethod)
                this.view = document.getElementById("data")
            })
            .catch(err => console.error(err))
    }

    async parse() {
        const response = await fetch(`./data/${controller}.json`)
        this.parseData = await response.text()

        if (JSON.parse(localStorage.getItem(`${controller}`)) === null) {
            localStorage.setItem(`${controller}`, `${this.parseData}`)
            window.location.reload()
        }
    }

    updateSlot(content) {
        document.querySelector("#slot").innerHTML = content
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
