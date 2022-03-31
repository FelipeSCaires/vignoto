/**
 * @name * JetRouter
 * @file * jetrouter.js
 * @author * Paper Plane Design Studio® <http://www.paperplane.com.br>
 * @description * javascript module to route urls
 * @license * Todos os direitos reservados - Paper Plane Design Studio®
 * @version * 1.0
 */



class JetRouter {

    /**
	 * create a jetrouter
	 * @param {object} options - optional settings object
	 */
    constructor(options) {
        this.config = JetRouter.extend(options)
        this.decode = decodeURIComponent
        this.routes = {}

        this.init()
        this.config.onInit()
	}
	
	/**
	 * overrides default settings with custom ones
	 * @param {object} options - optional settings object
	 * @return {object} - custom jetrouter settings
	 */
	static extend(options) {
		const settings = {
            link: 'a[href]',
            routes: {},
            notFound: () => {},
            onInit: () => {},
            onClick: (button, link) => {},
            onHash: (hash) => {}
		}

		for (const key in options) {
			settings[key] = options[key]
		}

		return settings
    }
    
    /**
	 * private function to clean up the url
     * @param {string} url - url string
	 * @return {string} - cleaned url
	 */
    cleanUp(url) {
        ~url.indexOf('/?') && (url = url.replace('/?', '?'))
        url[0] == '/' && (url = url.slice(1))
        url[url.length - 1] == '/' && (url = url.slice(0, -1))

        return url
    }
    
    /**
	 * private function to recursively searches
     * the route tree for a matching route
     * @param {array} pieces - an array of url parts
     * @param {function} esc - the function used to url escape values
     * @param {number} i - the index of the piece being processed
     * @param {object} rules - the route tree
     * @param {array} params - the computed route parameters
	 * @return {string} - the matched route
	 */
    recurseUrl(pieces, esc, i, rules, params) {
        if (!rules) {
            return
        }

        if (i >= pieces.length) {
            const cb = rules['@']

            return cb && {
                cb: cb,
                params: params.reduce((h, kv) => {
                    h[kv[0]] = kv[1]
                    return h
                }, {}),
            }
        }

        const piece = esc(pieces[i])
        const paramLen = params.length

        return this.recurseUrl(pieces, esc, i + 1, rules[piece.toLowerCase()], params)
            || this.recurseNamedUrl(pieces, esc, i + 1, rules, ':', piece, params, paramLen)
            || this.recurseNamedUrl(pieces, esc, pieces.length, rules, '*', pieces.slice(i).join('/'), params, paramLen)
    }

     /**
	 * private function to recurses for a named route,
     * where the name is looked up via key
     * and associated
     * @param {array} pieces - an array of url parts
     * @param {function} esc - the function used to url escape values
     * @param {number} i - the index of the piece being processed
     * @param {object} rules - the route tree
     * @param {string} key - the url key for parameters, query or wildcard
     * @param {string} value - the value
     * @param {array} params - the computed route parameters
     * @param {array} params - the computed route parameters length
	 * @return {string} - the matched route
	 */
    recurseNamedUrl(pieces, esc, i, rules, key, val, params, paramLen) {
        params.length = paramLen
        const subRules = rules[key]
        subRules && params.push([subRules['~'], val])

        return this.recurseUrl(pieces, esc, i, subRules, params)
    }

    /**
	 * private function to process
     * the url query
     * @param {string} url - the url query
     * @param {object} ctx - ?
     * @param {function} esc - the function used to url escape values
     * @return {object} - the matched route
	 */
    processQuery(url, ctx, esc) {
        if (url && ctx.cb) {
            const hash = url.indexOf('#')
            const query = (hash < 0 ? url : url.slice(0, hash)).split('&')

            for (let i = 0; i < query.length; ++i) {
                const nameValue = query[i].split('=')

                ctx.params[nameValue[0]] = esc(nameValue[1])
            }
        }

        return ctx
    }

    /**
	 * private function to return
     * negative result
     * @param {string} s - value
     * @return {string} - nothing
	 */
    noResult(s) {
        return s
    }

    /**
	 * private function to match
     * url with route
     * @param {string} url - the url
     * @return {string} - the matched router
	 */
    lookup(url) {
        let querySplit = this.cleanUp(url).split('?')
        const esc = ~url.indexOf('%') ? this.decode : this.noResult

        if (querySplit[0].includes('#')) {
            querySplit = querySplit[0].split('#')[0]

            if (querySplit.slice(-1) === '/') {
                querySplit = querySplit.slice(0, -1)
            }
            
            querySplit = [querySplit]
        }

        return this.processQuery(querySplit[1], this.recurseUrl(querySplit[0].split('/'), esc, 0, this.routes, []) || {}, esc)
    }

    /**
	 * public function to add
     * new route
     * @param {string} route - the route url
     * @param {function} callback - the router function
	 */
    add(route, callback) {
        let pieces = route.split('/')
        let rules = this.routes

        for (let i = +(route[0] === '/'); i < pieces.length; ++i) {
            let piece = pieces[i]
            const name = piece[0] == ':' ? ':' : piece[0] == '*' ? '*' : piece.toLowerCase()

            rules = rules[name] || (rules[name] = {});
            (name == ':' || name == '*') && (rules['~'] = piece.slice(1))
        }

        rules['@'] = callback
    }

    /**
	 * public function to start
     * listening url
     * @param {string} url - the url
     * @param {string} arg - the argument
     * @return {string} - the matched router
	 */
    listen(url, arg) {
        const result = this.lookup(url)
        
        return (result.cb || this.config.notFound)(url, arg, result.params)
    }

    /**
     * public function to select all
     * router buttons
     * @return {array} - a array with all the links
     */
    findLinks() {
        return document.querySelectorAll(this.config.link)
    }

    /**
     * public function to add click event
     * to the router buttons
     */
    updateLinks() {
        if (typeof document === 'undefined') return

        this.findLinks().forEach(link => {
            const noTarget = !link.target
            const noDisabled = !link.hasAttribute('data-jetrouter-disabled')
            const noDownload = !link.hasAttribute('download')
            const noType = link.href.includes(':') && !link.href.includes('http')
            // const notHash = link.href.slice(0, 1) !== '#'

            if (!link.hasListener && noTarget && noDisabled && noDownload && !noType/* && notHash*/) {
                link.addEventListener('click', event => {
                    event.preventDefault()
                    event.stopImmediatePropagation()
                    
                    const url = link.getAttribute('href')
                    
                    if (event.ctrlKey) {
                        window.open(link, '_blank')
                    } else {
                        this.config.onClick(this, url)
                        this.listen(url)
                    }
                })

                link.hasListener = true
            }
        })
    }

    /**
     * create hash event
     */
    hash() {
        history.pushState = (method => function pushState(){
            const result = method.apply(this, arguments)

            window.dispatchEvent(new Event('pushState'))
            window.dispatchEvent(new Event('locationchange'))

            return result
        })(history.pushState)
        
        history.replaceState = (method => function replaceState(){
            const result = method.apply(this, arguments)

            window.dispatchEvent(new Event('replaceState'))
            window.dispatchEvent(new Event('locationchange'))

            return result
        })(history.replaceState)

        this.hashEvent()
    }

    /**
     * call hash event
     */
    hashEvent() {
        window.addEventListener('locationchange', () => {
            const hash = location.hash
    
            if (hash) {
                setTimeout(() => this.config.onHash(hash), 250)
            }
        })

        window.dispatchEvent(new Event('locationchange'))
    }

    /**
	 * initialize instance
	 */
    init() {
        for (const key in this.config.routes) {
            this.add(key, this.config.routes[key])
        }

        this.updateLinks()
        this.hash()
	}

}