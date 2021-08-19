function connectClass() {
    eval("new " + autoLoader.className)
    util.statusFile = "CONNECTED"
    if (typeof method !== "undefined" && methods.includes(method) === false) {
        util.defaultValue.statusError = true
        router.handler()
    }
}

connectClass()
