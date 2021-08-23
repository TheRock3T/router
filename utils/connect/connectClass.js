function connectClass() {
    eval("new " + autoLoader.className)
    util.statusFile = "CONNECTED"

    if (typeof method !== "undefined"
        && classMethods.includes(method) === false
        && classController.includes(controller)) {
        util.defaultValue.statusError = true
        router.handler()
    }
}

connectClass()
