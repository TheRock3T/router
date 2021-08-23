const [controller, method, ...params] = window.location.hash.substring(2).split("/")

let util = new Util()
let autoLoader = new AutoLoader()
let router = new Router()
let connectMethod = new ConnectMethod()

addEventListener("load", autoLoader.handler)
addEventListener("hashchange", router.handler)
