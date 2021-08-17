class Router {

    handler = () => {

        if (util.regulars.slashWord.test(util.controller) === false
            && util.regulars.word.test(util.controller) === false) {
            window.location.hash = "/error404"
            alert("CONTROLLER NOT FOUND")
        }

        if (util.regulars.slashWord.test(util.method) === false
            && util.regulars.word.test(util.method) === false) {
            window.location.hash = "/error404"
            alert("METHOD NOT FOUND")
        }

        if (typeof util.controller !== "undefined"
            && typeof util.method !== "undefined") {

            if (util.checks.method.includes(util.method) === false) {
                window.location.hash = "/error404"
            }
        }
        window.location.reload()
    }
}
