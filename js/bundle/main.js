class Main {

    /**
     * create a main
     * @param {string} url - loaded url
     * @param {string} state - current state
     */
    constructor(url, state) {
        this.init(url, state)
    }

    /**
     * set storage
     * @param {object} parameters - search parameters
     */
    setStorage(parameters) {
        sessionStorage.setItem('maximo', config.imoveisPagina)

        if (!sessionStorage.getItem('filtro.tipodivulgacao')) {
            sessionStorage.setItem('filtro.tipodivulgacao', config.imovelpara)
        }

        for (const parameter in parameters) {
            if (parameters[parameter]) {
                const value = parameters[parameter]
                
                sessionStorage.setItem(parameter, value)
            } else {
                sessionStorage.removeItem(parameter)
            }
        }
    }

    /**
     * set classes
     * @param {string} url - current url
     * @param {string} state - current state
     */
    setClasses(url) {
        if (global.root) {
            url = url.split(global.root)[1]
        }
        
        url = url === '/' ? 'index' : url.split('/').join('-').substring(1).split('.')[0]
        document.body.className = `body__${url}`
    }

    asideAnimation() {
        const html = document.querySelector('html')

        if (html.classList.contains('jetbrowser__desktop')) {
            const layers = document.querySelectorAll('[data-depth]')
            
            layers.forEach(layer => {
                window.addEventListener('mousemove', this.mouseMoveHandler.bind(this, layer), {passive: true})
            })
        }
    }

    mouseMoveHandler(layer) {
        const depth = layer.dataset.depth
        const posX = - (event.clientX - window.innerWidth / 2)
        const hRatio = posX / depth

        layer.style.transform = `translateX(${hRatio}%)`
    }

    visited() {
        const links = document.querySelectorAll('.ui__card-link')
        const host = window.location.host
        const path = window.location.pathname

        localStorage.setItem(`visited-${path}`, true)

        links.forEach(link => {
            const storage = localStorage.getItem(`visited-${link.pathname}`)
            
            if (link.host === host && storage) {
                link.dataset.visited = true
            }
        })
    }

    /**
     * lgpd
     */
    lgpd() {
        const input = document.querySelector('.lgpd__input')
        const close = document.querySelector('.lgpd__close')
        const lgpd = localStorage.getItem('lgpd')

        close.addEventListener('click', () => localStorage.setItem('lgpd', true))

        input.checked = !lgpd ? true : false
    }

    /**
     * initialize instance
     */
    init(url, state) {
        this.setStorage(parameters)
        this.setClasses(url)
        this.asideAnimation()
        this.visited()
        this.lgpd()
        
        new Navigation(state)
        new Favorite()
        new Form()
    }

}