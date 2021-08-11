class AutoLoader {
    constructor() {
        this.Util = new Util()
        this.controller = this.Util.controller
        this.className = this.Util.upperWord(this.controller)
    }

    handler = async () => {
        if (typeof this.controller !== "undefined" && this.controller !== "" && window.location.hash !== "#/") {
            const response = await fetch(`./controllers/${this.controller}.js`)
            let statusLoad = response.status

            if (statusLoad === 200
                && typeof document.getElementsByTagName("body")[0] !== "undefined") {
                let jsScripts = `./controllers/${this.controller}.js`
                let htmlHead = document.getElementsByTagName("body")[0];
                let scriptElement = document.createElement("script");
                scriptElement.type = "";
                scriptElement.src = jsScripts;
                scriptElement.async = false;
                htmlHead.appendChild(scriptElement);
            } else {
                alert(`CONTROLLER      ---> ${this.controller} <---      NOT FOUND`)
            }
        }
    }
}

