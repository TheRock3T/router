const validSlashWord = /\b[A-Za-z]+(?:-+[A-Za-z]+)+\b/
const validWord = /^[A-Za-z]*$/
const checkMethodUsers = ['index-users', 'sorting-users', 'add-user']
const checkMethodPosts = ['index-posts', 'sorting-posts', 'add-post']

class Router {

    handler() {
        let [controller, method, ...params] = window.location.hash.substring(2).split('/')

        if (validSlashWord.test(controller) === false && validWord.test(controller) === false) {
            window.location.hash = '/error404'
            alert('CONTROLLER NOT FOUND')
        }

        if (validSlashWord.test(method) === false && validWord.test(method) === false) {
            window.location.hash = '/error404'
            alert('METHOD NOT FOUND')
        }

        if (controller !== undefined && method !== undefined) {

            if (controller === 'users') {

                if (checkMethodUsers.includes(method) === false) {
                    window.location.hash = '/error404'
                }
            }

            if (controller === 'posts') {

                if (checkMethodPosts.includes(method) === false) {
                    window.location.hash = '/error404'
                }
            }
        }
        window.location.reload()
    }
}
