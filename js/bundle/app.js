let router

class App {

    /**
     * create app
     */
    constructor() {
        this.init()
    }

    /**
     * create router
     */
    createRouter() {
        router = new JetRouter({
            routes: {
                [global.root]: state => {
                    this.page.load(`${global.root}/`, state, () => new Index)
                }
            },
            notFound: state => {
                this.page.load(`${global.root}/pagina-nao-encontrada.php`, state)
            },
            onInit: () => this.popState(),
            onHash: hash => {
                const target = document.querySelector(hash)
    
                if (target) {
                    setTimeout(() => {
                        target.scrollIntoView({behavior: 'smooth'})
                    }, 300)
                }
            }
        })
    }

    /**
     * pop state
     */
    popState() {
        window.addEventListener('popstate', () => {
            this.page.pop = true
            
            this.runRouter()
        })
    }

    /**
     * add routes
     */
    addRoutes() {
        config.pages.forEach(page => {
            const routes = [
                `${global.root}/${page[0]}`,
                `${global.root}/${page[0]}/*parameters`
            ]

            routes.forEach((route, index) => {
                router.add(route, state => {
                    let file = route

                    if (global.root) {
                        file = routes[index].split(global.root)[1]
                    }
                    
                    if (routes[index].includes('*') || routes[index].includes(':')) {
                        file = file.split('/')
                        file = file.slice(0, file.length - 1).join('/')
                    }

                    file = file.replace(/\//g, '-')
                    
                    if (file.startsWith('-')) {
                        file = file.substr(1)
                    }
                    
                    this.page.load(`${global.root}/${file}.php`, state, () => {
                        if (page[1]) {
                            const pageClass = new Function(`new ${page[1]}`)

                            pageClass()
                        }
                    })
                })
            })
        })
    }

    /**
     * run router
     */
    runRouter() {
        const url = `${location.pathname}${location.search}`

        router.listen(url)
    }

    /**
	 * initialize instance
	 */
    init() {
        window.onload = () => {
            this.page = new Page

            new JetBrowser()
            this.createRouter()
            this.addRoutes()
            this.runRouter()
        }
    }
    
}

new App