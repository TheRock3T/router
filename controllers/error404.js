class Error404 {
    constructor() {
        util.autoHTML(this)
        this.hideNavs()
    }

    hideNavs() {
        const hide = document.getElementById('navs')
        hide.style.display = "none"
    }
}
