class AutoLoader extends MethodControl {

    async handler() {

        const controller = window.location.hash.substring(2).split("/")[0]

        if (controller !== undefined & controller !== "" && window.location.hash !== "#/") {
            const response = await fetch(`./controllers/${controller}.js`)
            let statusLoad = response.status

            if (statusLoad === 200 && document.getElementsByTagName("body")[0] !== undefined) {
                let jsScripts = `./controllers/${controller}.js`
                let htmlHead = document.getElementsByTagName("body")[0];
                let scriptElement = document.createElement("script");
                scriptElement.type = "module";
                scriptElement.src = jsScripts;
                scriptElement.async = false;
                htmlHead.appendChild(scriptElement);
                console.log(statusLoad)
            } else {
                alert(`CONTROLLER      ---> ${controller} <---      NOT FOUND`)
            }
        }
    }
}
