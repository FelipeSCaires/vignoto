class Page {

    /**
     * set metatags
     * @param {object} data - data for metatags
     */
    setMetas(data) {
        const titles = document.querySelectorAll('meta[name*="title"]')
        const descriptions = document.querySelectorAll('meta[name*="description"], meta[itemprop*="description"]')
        const keywords = document.querySelectorAll('meta[name*="keywords"]')
        const images = document.querySelectorAll('meta[name*="image"], meta[itemprop*="image"]')
        const robots = document.querySelectorAll('meta[name="robots"]')
        const urls = document.querySelectorAll('meta[name*="url"]')
        const canonical = document.querySelector('[rel="canonical"]')
        const metas = [[titles, data.title], [descriptions, data.description], [keywords, data.keywords], [images, data.image], [robots, data.robots], [urls, data.url]]

        document.title = data.title
        canonical.setAttribute('href', data.url)

        metas.forEach(meta => {
            meta[0].forEach(name => {
                name.setAttribute('content', meta[1])
            })
        })
    }

    addPreloader(callback) {
        const preloader = document.querySelector('.ui__preloader')
        this.finishAnimation = false
    
        preloader.classList.add('ui__preloader--in')
        callback()

        setTimeout(() => {
            this.finishAnimation = true
        }, 700)
    }

    removePreloader(callback) {
        const preloader = document.querySelector('.ui__preloader')

        const interval = setInterval(() => {
            if (this.finishAnimation) {
                this.finishAnimation = false

                preloader.classList.add('ui__preloader--out')
                clearInterval(interval)
                callback()

                setTimeout(() => {
                    preloader.classList.remove('ui__preloader--in', 'ui__preloader--out')
                }, 700)
            }
        }, 10)
    }

    /**
     * page loader manager
     * @param {string} url - url to load
     * @param {string} state - state to set
     * @param {function} callback - callback function
     */
    load(url, state, callback) {
        if (this.lastPage) {
            this.addPreloader(this.ajaxLoad.bind(this, url, state, callback))
        } else {
            this.init(url, state, callback)
        }
    }

    /**
     * ajax page loader
     * @param {string} url - url to load
     * @param {string} state - state to set
     * @param {function} callback - callback function
     */
    ajaxLoad(url, state, callback) {
        const body = new FormData()
            
        body.append('url', state)

        const loader = new JetLoader({
            url: url,
            method: 'post',
            header: {'X-Requested-With': 'XMLHttpRequest'},
            body: body,
            onSuccess: data => {
                data = JSON.parse(data)
                config = data.config
                parameters = data.parameters

                this.setMetas(data.seo)
                this.removePreloader(this.render.bind(this, url, state, data.content, callback))
            }
        })
    }

    /**
     * page render manager
     * @param {string} url - loaded url
     * @param {string} state - current state
     * @param {string} data - page data to render
     * @param {function} callback - callback function
     */
    render(url, state, data, callback) {
        if (url !== this.lastPage) {
            this.pageRender(data)
        } else {
            this.templateRender(data)
        }
        
        this.setState(state)
        this.goToTop()
        this.init(url, state, callback)
    }

    /**
     * page render
     * @param {string} data - page data to render
     */
    pageRender(data) {
        const container = document.querySelector('.container')
        
        container.innerHTML = data
    }

    /**
     * template render
     * @param {string} data - page data to render
     */
    templateRender(data) {
        const fragment = document.createDocumentFragment()
        const node = document.createElement('div')

        node.innerHTML = data
        fragment.appendChild(node)

        const templates = fragment.querySelectorAll('[data-template]')
        const containers = document.querySelectorAll('[data-template]')

        templates.forEach((template, index) => {
            containers[index].innerHTML = template.innerHTML
        })
    }

    /**
     * push state
     * @param {string} url - path to set history state
     * @param {string} title - title for the history state
     */
    setState(url, title) {
        if (history.state !== url && !this.pop) {
            history.pushState({
                url: url,
                title: title
            }, title, url)
        }
    }

    /**
     * window go to top
     */
    goToTop() {
        if (!this.pop) {
            window.scrollTo(0, 0)
        }
    }

    /**
     * page render
     * @param {string} url - loaded url
     * @param {string} state - current state
     * @param {function} callback - callback function
     */
    init(url, state, callback) {
        new Main(url, state)

        if (callback) {
            callback()
        }

        this.pop = false
        this.lastPage = url
        router.updateLinks()
    }

}