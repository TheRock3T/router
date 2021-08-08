class App {
    constructor() {
        this.Router = new Router()
        this.AutoLoader = new AutoLoader()
        this.init()
    }

    init() {
        addEventListener("load", this.AutoLoader.handler)
        addEventListener('hashchange', this.Router.handler)
    }
}

new App()
