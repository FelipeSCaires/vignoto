/**
 * @name * JetPagination
 * @file * jetpagination.js
 * @author * Paper Plane Design Studio® <http://www.paperplane.com.br>
 * @description * pagination javascript module
 * @version * 1.0
 * @license * Todos os direitos reservados - Paper Plane Design Studio®
 */



class JetPagination {

    /**
	 * create a jetpagination
	 * @param {object} options - optional settings object
	 */
    constructor(options) {
        this.config = JetPagination.extend(options)
        this.container = this.config.container ? typeof this.config.container === 'string' ? document.querySelector(this.config.container) : this.config.container : ''
        this.previous = this.config.previous ? typeof this.config.previous === 'string' ? document.querySelector(this.config.previous) : this.config.previous : ''
        this.next = this.config.next ? typeof this.config.next === 'string' ? document.querySelector(this.config.next) : this.config.next : ''
        this.first = this.config.first ? typeof this.config.first === 'string' ? document.querySelector(this.config.first) : this.config.first : ''
        this.last = this.config.last ? typeof this.config.last === 'string' ? document.querySelector(this.config.last) : this.config.last : ''
        this.active = this.config.active ? Number(this.config.active) : 1
        this.total = Number(this.config.total)
        this.baseClass = 'jetpagination__'
        this.itemClass = `${this.baseClass}item`
        this.buttonClass = `${this.baseClass}btn`
        
        this.init()
        this.config.onInit()
	}
	
	/**
	 * overrides default settings with custom ones
	 * @param {object} options - optional settings object
	 * @returns {object} - custom jetpagination settings
	 */
	static extend(options) {
		const settings = {
			container: '',
			previous: '',
			next: '',
			first: '',
			last: '',
			active: 1,
			start: 0,
			left: 4,
			right: 4,
			end: 0,
			gap: [],
            total: '',
            link: true,
            linkTarget: '',
            baseUrl: `${location.pathname}${location.search}`,
            parameter: 'pagina',
            parameterType: 'normal',
            concatenateWith: '-',
            joinWith: '-',
			onInit: () => {},
            onChange: (page) => {},
            onComplete: () => {}
		}

		for (const key in options) {
			settings[key] = options[key]
		}

		return settings
	}

	/**
	 * private function to create the list of visible pages
     * @param {number} currentPage - current page
     * @param {number} total - total of pages
     * @returns {object} - array of visible pages
	 */
	createPagesArray(currentPage, total) {
        return this.range(total).reduce((pagination, index) => {
            const page = index + 1
            const isStart = page <= this.start
			let isMiddle = page >= currentPage - this.left && page <= currentPage + this.right
			const isEnding = page >= total - this.end + 1
			const noGap = pagination[pagination.length - 1] !== this.gap
			let valueToAdd

			if (currentPage <= this.left + 1) {
           		isMiddle = page >= 1 && page <= 1 + this.left + this.right
			} else if (currentPage >= total - this.right) {
           		isMiddle = page >= total - (this.left + this.right) && page <= total
			}

            if (isStart || isMiddle || isEnding) {
				valueToAdd = page
			} else {
				if (noGap) {
					valueToAdd = this.gap
				} else {
					valueToAdd = []
				}
			}
            
            return pagination.concat(valueToAdd)
        }, [])
    }

    /**
	 * private function to create the range of pages
     * @param {number} total - total of pages
     * @returns {object} - array with the range
	 */
	range(total) {
        return Array.apply(null, Array(total)).map((_, index) => {
			return index
		})
	}

    /**
	 * private function to create html elements
     * @param {string} type - type of the element
     * @param {htmlelement} target - element to append it
     * @param {string} className - class name of the element
     * @param {string} text - text of the element
     * @returns {object} - array with the range
	 */
	createElement(type, target, className, label) {
        const element = document.createElement(type)
		element.className = className
		
		if (label) {
			element.innerHTML = label
		}

		target.appendChild(element)
		return element
	}

    /**
	 * private function to create pages & their events
     * @param {htmlelement} element - pagination container
	 */
	createPages(element) {
        const pages = this.createPagesArray(this.active, this.total)
		const customBaseClass = this.config.container.slice(1)
		const customItemClass = `${customBaseClass}-item`
        const customButtonClass = `${customBaseClass}-btn`
        let button
        let item
		
		element.innerHTML = ''

		pages.forEach(page => {
			if (page !== this.gap) {
				item = this.createElement('li', element, `${this.itemClass} ${customItemClass}`)
				button = this.createElement('a', item, `${this.buttonClass} ${customButtonClass}`, page)

				if (page === this.active) {
                    item.classList.add(`${this.itemClass}--active`, `${customItemClass}--active`)
                    button.classList.add(`${this.buttonClass}--active`, `${customButtonClass}--active`)
				} else {
                    if (this.config.link) {
                        this.setLink(button, page)
                    } else {
                        button.addEventListener('click', this.gotoPage.bind(this, page))
                    }
				}
			} else {
				item = this.createElement('li', element, `${this.baseClass}gap ${customBaseClass}-gap`, this.gap)
			}
        })
        
        this.config.onComplete()
	}
	
	/**
	 * public function to go to a specific page
     * @param {number} index - number of the page to go
	 */
	gotoPage(index) {
		this.active = Number(index)
		
		if (this.container) {
			this.checkBreakpoints()
		}
		
		this.checkButton()
		this.config.onChange(index)
	}
	
	/**
	 * function to go to
	 * the previous page
     * @param {htmlelement} button - button element
	 */
	prevPage(button) {
        this.active--
        
        if (this.config.link) {
            this.setLink(button, this.active)
        } else {
            this.gotoPage(this.active)
        }
	}

	/**
	 * public function to go to
	 * the next page
     * @param {htmlelement} button - button element
	 */
	nextPage(button) {
        this.active++
        
        if (this.config.link) {          
            this.setLink(button, this.active + 1)
        } else {
            this.gotoPage(this.active)
        }
	}

	/**
	 * public function to go to
	 * the first page
     * @param {htmlelement} button - button element
	 */
	firstPage(button) {
        if (this.config.link) {
            this.setLink(button, 1)
        } else {
            this.active = 1

            this.gotoPage(this.active)
        }
	}

	/**
	 * public function to go to
	 * the last page
     * @param {htmlelement} button - button element
	 */
	lastPage(button) {
        if (this.config.link) {
            this.setLink(button, this.total)      
        } else {
            this.active = this.total

            this.gotoPage(this.active)
        }
    }

    /**
	 * remove page parameter
     * of the base url
	 */
	cleanBaseUrl() {
        const parameter = this.config.parameter
        const concatenateWith = this.config.concatenateWith
        let baseUrl = this.config.baseUrl

        if (baseUrl.includes(parameter)) {
            const page = baseUrl.split(`${concatenateWith}${parameter}`)[0]
            
            if (baseUrl.includes('?')) {
                const pathArray = baseUrl.split('?')
                const path = pathArray[0]
                const query = pathArray[1]

                if (this.config.parameterType === 'query') {
                    if (query.includes(concatenateWith)) {
                        baseUrl = page
                    } else {
                        baseUrl = path
                    }
                } else {
                    baseUrl = `${page}?${query}`
                }
            } else {
                baseUrl = page
            }
        }

        return baseUrl
    }
    
    /**
	 * private function to set
     * link buttons
     * @param {htmlelement} button - button element
     * @param {number} active - active page index
	 */
	setLink(button, active) {
        const baseUrl = this.cleanBaseUrl()

        if (active > 1) {
            const pageQuery = `${this.config.parameter}${this.config.joinWith}${active}`
            const page = `${this.config.concatenateWith}${pageQuery}`
            
            if (baseUrl.includes('?')) {
                if (this.config.parameterType === 'query') {
                    button.href = `${baseUrl}${page}`
                } else {
                    const arrayPath = baseUrl.split('?')

                    button.href = `${arrayPath[0]}${page}?${arrayPath[1]}`
                }
            } else {
                if (this.config.parameterType === 'query') {
                    button.href = `${baseUrl}?${pageQuery}`
                } else {
                    button.href = `${baseUrl}${page}`
                }
            }
        } else {
            button.href = baseUrl
        }

        if (this.config.linkTarget) {
            button.target = this.config.linkTarget
        }
    }

	/**
	 * private function to create
	 * the buttons events
	 */
	buttonEvents() {
		const buttons = [this.previous, this.next, this.first, this.last]
		const functions = [this.prevPage, this.nextPage, this.firstPage, this.lastPage]

        buttons.forEach((button, index) => {
            if (button) {
                if (this.config.link) {
                    functions[index].call(this, button)
                } else {
                    button.addEventListener('click', functions[index].bind(this))
                }
            }
        }) 
	}
	
	/**
	 * private function to check the button state
     * @param {string} status - if is disabled or not
     * @param {htmlelement} button - button element
     * @param {string} name - button class name
	 */
	buttonState(status, button, customName, name) {
		if (button) {
            const baseClass = `${this.baseClass}${name}--disabled`
			const customClass = `${customName.slice(1)}--disabled`

			if (status) {
				button.classList.remove(baseClass, customClass)
			} else {
                button.classList.add(baseClass, customClass)
                
                if (this.config.link) {
                    button.removeAttribute('href')
                }
			}
		}
	}
	
	/**
	 * private function to check the button state
     * @param {number} index - the button index
	 */
	checkButton() {
        const firstStatus = this.active === 1 ? false : true
		const previousStatus = this.active === 1 ? false : true
		const nextStatus = this.active === this.total ? false : true
        const lastStatus = this.active === this.total ? false : true

        this.buttonState(firstStatus, this.first, this.config.first, 'first')
        this.buttonState(previousStatus, this.previous, this.config.previous, 'previous')
        this.buttonState(nextStatus, this.next, this.config.next, 'next')
        this.buttonState(lastStatus, this.last, this.config.last, 'last')
	}

	/**
	 * private function to check breakpoints
     * & set their configurations
	 */
	checkBreakpoints() {
        this.start = this.config.start
        this.left = this.config.left
        this.right = this.config.right
        this.end = this.config.end
        this.gap = this.config.gap

        const parameters = [this.start, this.end, this.left, this.right, this.gap]
        const screenWidth = window.innerWidth

        parameters.forEach(parameter => {
            for (const breakpoint in parameter) {
                if (screenWidth >= Number(breakpoint)) {
                    if (parameter === this.config.start) {
                        this.start = this.config.start[breakpoint]
                    } else if (parameter === this.config.end) {
                        this.end = this.config.end[breakpoint]
                    } else if (parameter === this.config.left) {
                        this.left = this.config.left[breakpoint]
                    } else if (parameter === this.config.right) {
                        this.right = this.config.right[breakpoint]
                    } else if (typeof this.config.gap === 'object') {
                        this.gap = this.config.gap[breakpoint]
                    }
                }
            }
        })

        this.createPages(this.container)
    }

    /**
	 * private function to add classes
     * to elements
	 */
    addClasses() {
        const elements = [this.container, this.previous, this.next, this.first, this.last]
        const names = ['list', 'previous', 'next', 'first', 'last']

        elements.forEach((element, index) => {
            if (element) {
                element.classList.add(`${this.baseClass}${names[index]}`)
            }
        })
    }
    
    /**
	 * public function to destroy the
     * pagination
	 */
	destroy() {
		const buttons = [this.previous, this.next, this.first, this.last]

		this.container.innerHTML = ''

        buttons.forEach(button => {
            const clone = button.cloneNode(true)
            const parent = button.parentNode

            parent.replaceChild(clone, button)
        })
	}
    
	/**
	 * initialize instance
	 */
	init() {
		if (this.container) {
            window.addEventListener('resize', this.checkBreakpoints.bind(this))
            this.checkBreakpoints()
        }

        this.buttonEvents()
        this.checkButton()
        this.addClasses()
	}
	
}