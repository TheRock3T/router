class AutoLoader {

    handler = () => {
        if (typeof util.controller !== "undefined"
            && util.controller !== ""
            && window.location.hash !== "#/") {
            let statusController = util.checks.controller.includes(util.controller)

            if (statusController === true
                && typeof document.getElementsByTagName("body")[0] !== "undefined") {
                this.className = util.upperWord(util.controller)
                let script = document.createElement('script');
                script.src = `/controllers/${util.controller}.js`;
                script.async = false;
                document.body.append(script);
                let connect = document.createElement('script');
                connect.src = "./utils/connectClass/connectClass.js";
                connect.async = false;
                document.body.append(connect);
            } else {
                alert(`CONTROLLER      ---> ${util.controller} <---      NOT FOUND`)
            }
        }
    }
}
