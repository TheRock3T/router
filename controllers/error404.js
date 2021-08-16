class Error404 {

    constructor() {
        this.Util = new Util()
        this.useMethod()
    }

    useMethod() {
        const contentUrl = `./views/error404.html`
        fetch(contentUrl)
            .then(r => r.text())
            .then(content => this.Util.updateSlot(content))
    }
}
