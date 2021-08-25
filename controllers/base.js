class Base {
    constructor() {

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
}
