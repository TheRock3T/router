class Error404 extends AutoLoader {
    constructor() {
        super()
        this.useMethod()
    }

    useMethod() {
        const contentUrl = `./views/error404.html`
        fetch(contentUrl)
            .then(r => r.text())
            .then(content => this.updateSlot(content))
    }

    updateSlot(content) {
        document.querySelector('#slot').innerHTML = content
    }

}

new Error404()
