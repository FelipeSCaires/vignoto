/**
 * @name * JetSearch
 * @file * jetsearch.js
 * @author * Paper Plane Design Studio® <http://www.paperplane.com.br>
 * @description * search javascript module
 * @license * Todos os direitos reservados - Paper Plane Design Studio®
 * @version * 1.0
 */



class JetSearch {

    /**
	 * create a jetsearch
	 * @param {object} options - optional settings object
	 */
    constructor(options) {
        this.config = JetSearch.extend(options)
        this.parameters = this.config.parameters
        this.query = this.config.query
        this.alternative = this.config.alternative
        this.ignoreStorages = typeof this.config.ignoreStorages === 'string' ? [this.config.ignoreStorages] : this.config.ignoreStorages
        this.joinWith = this.config.joinWith
		this.windowStorage
		this.storage
		this.url

        this.init()
        this.config.onInit()
	}
	
	/**
	 * overrides default settings with custom ones
	 * @param {object} options - optional settings object
	 * @return {object} - custom jetsearch settings
	 */
	static extend(options) {
		const settings = {
			mode: '',
			button: '',
			baseUrl: '',
            parameters: [],
            alternative: {},
			endUrl: '',
            ignoreStorages: '',
			storagePrefix: '',
			joinWith: '',
			concatenateWith: '',
			lowerCase: true,
			regex: [],
			checkStorage: 'session',
			onInit: () => {},
			onClick: (url, button) => {},
            onComplete: (url) => {}
		}

		for (const key in options) {
			settings[key] = options[key]
		}

		return settings
	}

	/**
	 * private function to define the
     * type of storage
	 */
    storageType() {
		if (this.config.checkStorage === 'local'){
			this.storage = localStorage
			this.windowStorage = window.localStorage
		} else {
			this.storage = sessionStorage
			this.windowStorage = window.sessionStorage
		} 
	}

	/**
	 * private function to remove array
     * @param {value} array - array to remove item
     * @param {string} value - value to remove
     * @return {array} - array without removed itens
	 */
	arrayRemove(array, value) {
		return array.filter(element => {
			return element != value
		})
    }
    
    /**
	 * private function to get the
     * parameters
     * @return {array} - parameters
	 */
    getParameters() {
        let parameters = []

        if (this.parameters) {
			this.parameters.forEach(parameter => {
				if (typeof parameter === 'object') {
					if (Array.isArray(parameter)) {
						if (!parameter.toString().includes('null') && !parameter.includes(null) && !parameter.includes('')) {
							parameter.forEach(value => {
								parameters.push(value)
							})
						}
					} else {
						for (const key in parameter) {
							const value = parameter[key]
							
							if (key && value) {
								parameters.push(`${key}${this.joinWith}${value}`)
							}
						}
					}
				} else {
					if (parameter) {
						parameters.push(parameter)
					}
				}
			})
        }
        
        return parameters
    }

    /**
	 * private function to get the
     * auto parameters
     * @return {array} - parameters
	 */
    getParametersAuto() {
        let parameters = []

        if (this.config.mode === 'auto') {
			for (const key in this.windowStorage) {
				const value = this.storage.getItem(key)

                if (value && !key.indexOf(this.config.storagePrefix)) {
                    if (this.ignoreStorages) {
                        this.ignoreStorages.forEach(ignored => {
                            if (key !== ignored) {
                                parameters.push(`${key}${this.joinWith}${value}`)
                            }
                        })
                    } else {
                        parameters.push(`${key}${this.joinWith}${value}`)
                    }
                }
            }
        }
        
        return parameters
    }

    /**
	 * private function to get the
     * query strings
     * @return {string} - query strings
	 */
    getQueries() {
        const queries = new URLSearchParams()

        if (this.query) {
            for (const [key, val] of Object.entries(this.query)) {
                if (val) {
                    queries.append(key, val)
                }
            }
        }

        return queries.toString() ? `?${queries}` : ''
    }

    /**
	 * private function to get the
     * alternative paremeters
     * @return {array} - parameters
	 */
    getAlternative() {
        let parameters = []

        for (const name in this.alternative) {
			const parameter = this.alternative[name]

			for (const key in parameter) {
				const values = parameter[key]
				
				if (typeof values === 'object') {
					if (Array.isArray(values)) {
                        values.forEach(value => {
                            if (!values.toString().includes('null') && !values.includes(null) && !values.includes('')) {
                                parameters.push(value)
                            } else {
                                parameters = this.arrayRemove(parameters, value)
                            }
                        })
					} else {
						for (const key in values) {
                            const value = values[key]
                            const remove = `${key}${this.config.joinWith}${value}`
							
							if (key && value) {
								parameters.push(`${key}${this.joinWith}${value}`)
							} else {
								parameters = this.arrayRemove(parameters, remove)
							}
						}
					}
				} else {
					if (values) {
						parameters.push(values)
					} else {
                        parameters = this.arrayRemove(parameters, values)
					}
				}
			}
        }
        
        return parameters
    }

	/**
	 * private function to create
     * the url
	 */
	createUrl() {
        let parametersObj = []
        let parametersValues = this.getParameters()
        let parametersAlternative = this.getAlternative()
        let queries = this.getQueries()
        
        this.getParametersAuto()

		if (parametersAlternative.length) {
			parametersValues = parametersAlternative
		}

		parametersValues.forEach(value => {
			parametersObj.push(value)
		})

		let value = parametersObj.join(this.config.concatenateWith)

		if (this.config.regex) {
			value = this.doRegex(value)
		}

		this.url = `${this.config.baseUrl}${value}${this.config.endUrl}${queries}`

		if (this.config.lowerCase) {
			this.url = this.url.toLowerCase()
		}
	}

	/** 
	 * private function to make regex
     * @param {string} value - value to regex
     * @return {string} - changed value
	 */
	doRegex(value) {
        if (Array.isArray(this.config.regex[0])) {
            this.config.regex.forEach(reg => {
                value = value.replace(reg[0], reg[1])
            })
        } else {
            value = value.replace(this.config.regex[0], this.config.regex[1])
        }

		return value
	}

	/** 
	 * private function to get the url
     * @return {url} - url string
	 */
	getUrl() {
		this.createUrl()

		return this.url
	}
    
    /** 
	 * private function to button click
     * @param {htmlelement} button - button html element
	 */
	btnClick(button) {
		this.getUrl()
		this.config.onClick(this.url, button)
	}

	/**
	 * private function to create
     * button event
	 */
	createBtnEvent() {
        if (this.config.button) {
            const buttons = document.querySelectorAll(this.config.button)

            buttons.forEach(btn => {
                if (btn.tagName === 'A') {
                    btn.href = this.getUrl()
                } else {
                    btn.addEventListener('click', e => {
                        e.preventDefault()
                        e.stopImmediatePropagation()
                        e.stopPropagation()
                        
                        this.btnClick(e.target)
                    }, true)
                }
            })
        }
    }

	/**
	 * public function to remove storages
     * @param {string} type - storage type
     * @param {object/array} storages - storages to remove
     * @param {array} exceptions - exceptions array
	 */
	removeStorage(type, storages, exceptions) {
        let storage = sessionStorage
        let windowStorage = window.sessionStorage

        if (type === 'local') {
            storage = localStorage
            windowStorage = window.localStorage
		}
		
		if (typeof exceptions === 'string') {
			exceptions = [exceptions]
		}

		if (typeof storages === 'object') {
			storages.forEach(key => {
                if (!exceptions || (exceptions && exceptions.indexOf(key) === -1)) {
                    storage.removeItem(key)
                }
			})
		} else {
			for (const key in windowStorage) {
                const hasStorage = key.indexOf(storages) !== -1
                const noException = exceptions ? exceptions.indexOf(key) === -1 : ''

                if ((hasStorage && !exceptions) || (hasStorage && exceptions && noException)) {
                    storage.removeItem(key)
                }
			}
		}
    }
    
    /**
	 * initialize instance
	 */
	init() {
		this.storageType()
        this.createUrl()
        this.createBtnEvent()
        this.config.onComplete(this.url)
	}
	
}