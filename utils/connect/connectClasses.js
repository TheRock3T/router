function connectClasses() {
    eval("new " + autoLoader.className)
    util.statusFile = "CONNECTED"

    if (typeof method !== "undefined"
        && methods.includes(method) === false
        && classController.includes(controller)) {
        util.defaultValue.statusError = true
        router.handler()
    }
}

connectClasses()
