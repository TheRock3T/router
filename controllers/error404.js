class Error404 {

    constructor() {
        util = new Util()
        this.useMethod()
    }

    useMethod() {
        const contentUrl = `./views/error404.html`
        fetch(contentUrl)
            .then(r => r.text())
            .then(content => util.updateSlot(content))
    }
}
