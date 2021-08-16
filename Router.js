class Router {

    constructor() {
        this.Util = new Util()
    }

    handler = () => {

        if (this.Util.regulars.slashWord.test(this.Util.controller) === false
            && this.Util.regulars.word.test(this.Util.controller) === false) {
            window.location.hash = "/error404"
            alert("CONTROLLER NOT FOUND")
        }

        if (this.Util.regulars.slashWord.test(this.Util.method) === false
            && this.Util.regulars.word.test(this.Util.method) === false) {
            window.location.hash = "/error404"
            alert("METHOD NOT FOUND")
        }

        if (typeof this.Util.controller !== "undefined"
            && typeof this.Util.method !== "undefined") {

            if (this.Util.checks.method.includes(this.Util.method) === false) {
                window.location.hash = "/error404"
            }
        }
        window.location.reload()
    }
}
