class AutoLoader {
    handler = async () => {

        if (typeof controller !== "undefined"
            && controller !== ""
            && window.location.hash !== "#/") {
            const response = await fetch(`../controllers/${controller}.js`)

            if (response.status === 200 && typeof document.getElementsByTagName("body")[0] !== "undefined") {
                this.className = util.upperWord(controller)
                let script = document.createElement("script")
                script.src = `/controllers/${controller}.js`
                script.async = false
                document.body.append(script)

                let connect = document.createElement("script")
                connect.src = "./utils/connectClasss/connectClasss.js"
                connect.async = false
                document.body.append(connect)
            } else {
                util.defaultValue.statusError = true
                router.handler()
            }
        }
    }
}
