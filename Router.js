const validSlashWord = /\b[A-Za-z]+(?:-+[A-Za-z]+)+\b/
const validWord = /^[A-Za-z]*$/
const checkMethod = ["index", "sorting", "add", "add-user"]

class Router extends MethodControl {

    handler() {

        if (validSlashWord.test(this.controller) === false && validWord.test(this.controller) === false) {
            window.location.hash = "/error404"
            alert("CONTROLLER NOT FOUND")
        }

        if (validSlashWord.test(this.method) === false && validWord.test(this.method) === false) {
            window.location.hash = "/error404"
            alert("METHOD NOT FOUND")
        }

        if (this.controller !== undefined && this.method !== undefined) {

            if (checkMethod.includes(this.method) === false) {
                window.location.hash = "/error404"
            }
        }
        window.location.reload()
    }
}
