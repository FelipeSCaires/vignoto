/**
 * @name * JetLoader
 * @file * jetloader.js
 * @author * Paper Plane Design Studio® <http://www.paperplane.com.br>
 * @description * javascript ajax, css & script loader module
 * @license * Todos os direitos reservados - Paper Plane Design Studio®
 * @version * 1.0
 */



class JetLoader {

    /**
	 * create a jetloader
	 * @param {object} options - optional settings object
	 */
    constructor(options) {
        this.config = JetLoader.extend(options)
        this.controller = new AbortController()
        this.signal = this.controller.signal

        this.init()
	}
	
	/**
	 * overrides default settings with custom ones
	 * @param {object} options - optional settings object
	 * @return {object} - custom jetloader settings
	 */
	static extend(options) {
		const settings = {
            url: '',
            // type: 'auto',
            method: undefined,
            referrer: undefined,
            mode: undefined,
            redirect: undefined,
            credentials: undefined,
            integrity: undefined,
            header: {},
            cache: undefined,
            body: undefined,
            onInit: () => {},
            onProgress: (percent) => {},
            onSuccess: (data) => {},
            onError: (status) => {},
            onAbort: () => {}
		}

		for (const key in options) {
			settings[key] = options[key]
		}

		return settings
    }

    /**
	 * function to load the url
     * @param {string} url - the url to load
	 */
    load(url) {
        const signal = this.controller.signal

        fetch(url, {
            method: this.config.method,
            referrer: this.config.referrer,
            redirect: this.config.redirect,
            headers: new Headers(this.config.header),
            mode: this.config.mode,
            credentials: this.config.credentials,
            integrity: this.config.integrity,
            cache: this.config.cache,
            body: this.config.body,
            signal: signal,
        })
        .then(this.handleErrors.bind(this))
        .catch(error => this.config.onError(error.status))
    }

    /**
	 * handle response errors
     * on load
     * @param {object} response - the loaded data
	 */
    handleErrors(response) {
        if (response.ok) {
            return this.getResponse(response)
        } else {
            return Promise.reject(response)
        }
    }

    /**
	 * get the response of the
     * loaded data
     * @param {object} response - the loaded data
	 */
    getResponse(response) {
        let contentType = response.headers.get('content-type')

        if (contentType.includes('application/json')) {
            this.getJson(response)
        } else if (contentType.includes('text/html')) {
            this.getText(response)
        } else if (contentType.includes('application/octet-stream') || contentType.includes('application/pdf')) {
            this.getBlob(response)
        } else {
            throw new Error(`JetLoader Error 😭 - Sorry, content-type ${contentType} not supported`)
        }
    }

    /**
	 * parse the json response of the
     * loaded data
     * @param {object} response - the loaded data
	 */
    getJson(response) {
        return response.json()
        .then(json => {
            if (response.ok) {
                this.config.onSuccess(json)
            }
        })
    }

    /**
	 * parse the text response of the
     * loaded data
     * @param {object} response - the loaded data
	 */
    getText(response) {
        return response.text()
        .then(text => {
            if (response.ok) {
                this.config.onSuccess(text)
            }
        })
    }

    /**
	 * parse the text response of the
     * loaded data
     * @param {object} response - the loaded data
	 */
    getBlob(response) {
        return response.blob()
        .then(blob => {
            if (response.ok) {
                this.config.onSuccess(blob)
            }
        })
    }

    /**
	 * function to abort the load
     * request
	 */
    abort() {
        this.controller.abort()
        this.config.onAbort()
    }

    /**
	 * initialize instance
	 */
    init() {
        this.config.onInit()
        this.load(this.config.url)
	}

}