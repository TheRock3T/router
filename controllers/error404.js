class Error404 {

    constructor() {
        this.autoHTML()
    }

    autoHTML() {
        const contentUrl = `./views/${controller}.html`
        fetch(contentUrl)
            .then(r => r.text())
            .then(content => {
                util.updateSlot(content)
            })
            .catch(e => alert(e))
    }
}
