class Router {

    constructor() {
        this.Util = new Util()
        this.controller = this.Util.controller
        this.method = this.Util.method
    }

    handler = () => {

        if (this.Util.regulars.slashWord.test(this.controller) === false
            && this.Util.regulars.word.test(this.controller) === false) {
            window.location.hash = "/error404"
            alert("CONTROLLER NOT FOUND")
        }

        if (this.Util.regulars.slashWord.test(this.method) === false
            && this.Util.regulars.word.test(this.method) === false) {
            window.location.hash = "/error404"
            alert("METHOD NOT FOUND")
        }

        if (typeof this.controller !== "undefined"
            && typeof this.method !== "undefined") {

            if (this.Util.checks.method.includes(this.method) === false) {
                window.location.hash = "/error404"
            }
        }
        window.location.reload()
    }
}
