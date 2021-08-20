class Router {
    handler = () => {

        if (util.defaultValue.statusError === true) {
            window.location.hash = "/error404"
        }

        if (util.regulars.slashWord.test(controller) === false
            && util.regulars.word.test(controller) === false) {
            window.location.hash = "/error404"
        }

        if (util.regulars.slashWord.test(method) === false
            && util.regulars.word.test(method) === false) {
            window.location.hash = "/error404"
        }
        window.location.reload(true)
    }
}
