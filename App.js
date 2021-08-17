let util = new Util()
let router = new Router()
let autoLoader = new AutoLoader()

addEventListener("load", autoLoader.handler)
addEventListener("hashchange", router.handler)




