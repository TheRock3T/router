class AutoLoader {

    constructor() {
        this.Util = new Util()
        this.className = this.Util.upperWord(this.Util.controller)
    }

    handler = async () => {
        if (typeof this.Util.controller !== "undefined"
            && this.Util.controller !== ""
            && window.location.hash !== "#/") {
            let statusController = this.Util.checks.controller.includes(this.Util.controller)

            if (statusController === true
                && typeof document.getElementsByTagName("body")[0] !== "undefined") {
                let jsScripts = `./controllers/${this.Util.controller}.js`
                let htmlHead = document.getElementsByTagName("body")[0];
                let scriptElement = document.createElement("script");
                scriptElement.src = jsScripts;
                htmlHead.appendChild(scriptElement)

                const checkcontroller = await fetch(`./controllers/${this.Util.controller}.js`)
                    .then(() => {
                        this.connectClass()
                    })
            } else {
                alert(`CONTROLLER      ---> ${this.Util.controller} <---      NOT FOUND`)
            }
        }
    }

    connectClass() {
        eval("new " + this.className)
    }
}
