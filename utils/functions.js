export function sortAge(arr, param) {
    arr.sort((a, b) => a.age > b.age ? 1 : -1);
}

export function sortId(arr) {
    arr.sort((a, b) => a.postNum > b.postNum ? 1 : -1);
}

export function camelCase(method) {
    if (method !== undefined) {
        method = method.replace(/(-.)/g, function (x) {
            return x[1].toUpperCase()
        })
        return method
    }
}

export function updateSlot(content) {
    document.querySelector("#slot").innerHTML = content
}
