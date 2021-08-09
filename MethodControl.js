class MethodControl {

    useMethod() {
        let [controller, method, ...params] = window.location.hash.substring(2).split("/")
        this.controller = controller
        this.method = method
        this.params = params

        if (this.method === "index") {
            this.index()
        }

        if (this.method === "sorting") {
            this.sorting()
        }

        if (this.method === "add") {
            this.add()
        }
    }
}

