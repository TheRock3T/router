const classController = "error404"

class Error404 extends MainController {
    constructor() {
        super()
        this.autoHTML(this)
        this.hideNavs()
    }

    hideNavs() {
        const hide = document.getElementById('navs')
        hide.style.display = "none"
    }
}
