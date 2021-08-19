let util = new Util()
let autoLoader = new AutoLoader()
let router = new Router()

const [controller, method, ...params] = window.location.hash.substring(2).split("/")

addEventListener("load", autoLoader.handler)
addEventListener("hashchange", router.handler)
