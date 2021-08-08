export function addUserok() {
    console.log('FUNCTION WORK')
}
export function sortAge(arr) {
    arr.sort((a, b) => a.age > b.age ? 1 : -1);
}

export function sortId(arr) {
    arr.sort((a, b) => a.postNum > b.postNum ? 1 : -1);
}
