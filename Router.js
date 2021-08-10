class Router {

    constructor() {
        this.Trash =      new Trash()
        this.controller = this.Trash.controller
        this.method =     this.Trash.method
    }

    handler = () => {

        if (this.Trash.regulars.regSlashWord.test(this.controller) === false && this.Trash.regulars.regWord.test(this.controller) === false) {
            window.location.hash = "/error404"
            alert("CONTROLLER NOT FOUND")
        }

        if (this.Trash.regulars.regSlashWord.test(this.method) === false && this.Trash.regulars.regWord.test(this.method) === false) {
            window.location.hash = "/error404"
            alert("METHOD NOT FOUND")
        }

        if (this.controller !== undefined && this.method !== undefined) {

            if (this.Trash.checks.checkMethod.includes(this.method) === false) {
                window.location.hash = "/error404"
            }
        }
        window.location.reload()
    }
}
