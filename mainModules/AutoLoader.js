class AutoLoader {
    handler = () => {

        if (typeof controller !== "undefined"
            && controller !== ""
            && window.location.hash !== "#/") {
            let statusController = util.checks.controller.includes(controller)

            if (statusController === true
                && typeof document.getElementsByTagName("body")[0] !== "undefined") {
                this.className = util.upperWord(controller)
                let script = document.createElement("script")
                script.src = `/controllers/${controller}.js`
                script.async = false
                document.body.append(script)

                let connect = document.createElement("script")
                connect.src = "./utils/connectClass/connectClass.js"
                connect.async = false
                document.body.append(connect)
            } else {
                util.defaultValue.statusError = true
                router.handler()
            }
        }
    }
}
