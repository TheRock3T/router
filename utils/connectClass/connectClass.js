function connectClass() {
    console.log(this.className)
    eval("new " + autoLoader.className)
}

connectClass()
