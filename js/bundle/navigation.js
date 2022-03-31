class Navigation {

    /**
     * create navigation
     */
    constructor(state) {
        this.init(state)
    }

    /**
     * select button
     * @param {string} links - clicked link url
     */
    selectButton(url) {
        url = url.replace(/(\?.*)/g, '')
        const paths = this.getPath(url)

        this.deselectButton()
        
        paths.forEach((path, index) => {
            if (path === global.root && paths.length === 1) {
                path = `${path}/`
            }

            let buttons = document.querySelectorAll(`nav [href="${path}"]`)

            if (index === 0 && path !== `${global.root}/`) {
                const page = path.substring(path.lastIndexOf('/') + 1).split('-')[0]
                path = path.substring(0, path.lastIndexOf('/'))
                path = `${path}/${page}`
                buttons = document.querySelectorAll(`nav [href^="${path}"]`)
            }

            buttons.forEach(button => button.classList.add('active'))
        })

        this.closeNav()
    }

    /**
     * close nav
     */
    getPath(url) {
        let path = url.split('/').reduce((a, b) => { 
            if (b !== '' && a) { 
                a.push(b)
            }

            return a 
        }, []).reduce((a, b, index, array) => {
            a.push(`/${array.slice(0, array.length - index).join('/')}`)

            return a
        }, [])

        if (url === '/') {
            path = ['/']
        }

        return path
    }

    /**
     * close nav
     */
    deselectButton() {
        const buttons = document.querySelectorAll('.nav__btn, .footer__btn')

        buttons.forEach(button => {
            button.classList.remove('active')
        })
    }

    /**
     * close nav
     */
    closeNav() {
        var input = document.querySelector('#jetwindow-nav')

        input.checked = false
    }

    /**
	 * initialize instance
	 */
    init(state) {
        this.selectButton(state)
    }

}