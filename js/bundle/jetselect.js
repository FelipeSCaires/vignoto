/**
 * @name * JetSelect
 * @file * jetselect.js
 * @author * Paper Plane Design Studio® <http://www.paperplane.com.br>
 * @description * select & multi select javascript module
 * @license * Todos os direitos reservados - Paper Plane Design Studio®
 * @version * 1.0
 */



class JetSelect {

    /**
	 * create a jetselect
	 * @param {object} options - optional settings object
	 */
    constructor(options) {
        this.config = JetSelect.extend(options)
        this.elements = document.querySelectorAll(this.config.element)
        this.names = typeof this.config.name === 'string' ? [this.config.name] : this.config.name
        this.optionsText = this.config.optionsText
        this.optionsValue = this.config.optionsValue
        this.optionsCounter = this.config.counter
        this.activeClass = 'jetselect__item--active'
        this.valueObject = {}
        this.labelObject = {}
        this.sortMap = {}
        this.selectedOptions = []
        this.tabIndex = null
        this.baseName
        this.titles
        this.storage

        this.init()
        this.config.onInit()
	}
	
	/**
	 * overrides default settings with custom ones
	 * @param {object} options - optional settings object
	 * @returns {object} - custom jetselect settings
	 */
	static extend(options) {
		const settings = {
            element: '',
            name: '',
            type: '',
            selectionLimit: '',
            optionsText: [],
            optionsValue: [],
            counter: [],
            deselectAll: '',
            selectAll: '',
            label: '',
            sortBy: [],
            sortOrder: 'ascending',
            sortTitle: false,
            sortTotal: false,
            tags: false,
            tagsOnChange: false,
            tagsTarget: '',
            filter: false,
            filterEmpty: true,
            filterTarget: '',
            filterOpenOnFocus: true,
            filterCloseOnBlur: true,
            filterPlaceholder: '',
            filterNotFound: '',
            filterType: 'text',
            validateOperator: '',
            validateTarget: '',
            defaultMobile: false,
            storage: 'session',
            onInit: () => {},
            onOpen: () => {},
            onClose: () => {},
            onChange: (value) => {},
            onDeselectAll: () => {},
            onSelectAll: () => {},
            onKeyUp: () => {},
            onKeyDown: () => {},
            onKeyEnter: () => {},
            onFocus: () => {},
            onBlur: () => {},
            onClickTag: (value) => {},
            onValidateError: () => {},
            onLimit: () => {}
        }

		for (const key in options) {
			settings[key] = options[key]
		}

		return settings
    }

    /**
	 * public function to initialize
	 * the plugin
	 */
    arrayLowerCase(array) {
        array.forEach((values, index) => {
            if (Array.isArray(values)) {
                values.forEach((value, index) => {
                    if (isNaN(value)) {
                        values[index] = value.toLowerCase()
                    }
                })
            } else {
                if (isNaN(values)) {
                    array[index] = values.toLowerCase()
                }
            }
        })
    }
    
    /**
	 * private function to define the
     * type of storage
	 */
    setBaseName(element) {
		const elementClass = element.getAttribute('class')
        const classArray = this.config.element.split(',')

        classArray.forEach((className) => {
            className = className.trim().substr(1)

            if (elementClass.indexOf(className) > -1) {
                element.dataset.jetselectName = className
            }
        })

        this.baseName = element.dataset.jetselectName
	}

	/**
	 * private function to define the
     * type of storage
	 */
    storageType() {
		if (this.config.storage === 'local') {
            this.storage = localStorage
        } else {
            this.storage = sessionStorage
        }
	}

    /**
	 * private function to check if exists
     * a storage & their values
	 */
    storageCheck() {
        this.names.forEach((name) => {
            if (this.storage.getItem(name)) {
                const storageValue = this.storage.getItem(name)
                const values = storageValue.split(',')

                if (!this.valueObject[name]) {
                    this.valueObject[name] = []
                }

                values.forEach((value) => {
                    value = value.toString().toLowerCase()
                    this.valueObject[name].push(value)
                })
            }
        })
    }
    
    /**
	 * public function to update select & tag element
     * with the recorded values
	 */
    update() {
        this.storageCheck()

        this.names.forEach((name) => {
            if (!this.storage.getItem(name)) {
                if (!this.valueObject[name]) {
                    this.valueObject[name] = []
                }

                this.valueObject[name].push('')
            }
        })
        
        this.elements.forEach((element, index) => {
            this.updateSelect(element)
            
            if (this.config.tags) {
                this.updateTags(element, index)
            }
        })
    }

    /**
	 * public function to update select & tag element
     * with the recorded values
	 */
    updateTags(element, index) {
        let fragment = document.createDocumentFragment()
        let tagsTarget

        if (this.config.tagsTarget) {
            tagsTarget = document.querySelectorAll(this.config.tagsTarget)
        } else {
            tagsTarget = element.querySelectorAll('.jetselect__label')
        }
        
        tagsTarget.forEach((tagTarget) => {
            for (const labels in this.labelObject) {
                this.labelObject[labels].forEach((label) => {
                    const tagSelector = `[data-jetselect-id="${this.config.name}"][data-jetselect-label="${label}"]`
                    const oldTag = tagTarget.querySelector(tagSelector)
                    const btn = document.querySelector(`.${this.baseName}-item[data-jetselect-text="${label}"]`)
                    const value = btn.dataset.jetselectValue.split(',')
                    
                    if (!this.config.tagsTarget) {               
                        tagsTarget[0].innerHTML = ''
                    }
                        
                    if (!oldTag) {
                        const tag = this.createTag(label, value, index)

                        fragment.appendChild(tag)
                    }
                })
            }

            tagTarget.appendChild(fragment)
        })
    }

    /**
	 * public function to update select & tag element
     * with the recorded values
	 */
    addTags(element, label, index) {
        let fragment = document.createDocumentFragment()
        let tagsTarget

        if (this.config.tagsTarget) {
            tagsTarget = document.querySelectorAll(this.config.tagsTarget)
        } else {
            tagsTarget = element.querySelectorAll('.jetselect__label')

            if (!tagsTarget[0].querySelector('.jetselect__tag')) {
                tagsTarget[0].innerHTML = ''
            }
        }

        tagsTarget.forEach((tagTarget) => {
            const tagSelector = `[data-jetselect-id="${this.config.name}"][data-jetselect-label="${label}"]`
            const oldTag = tagTarget.querySelector(tagSelector)
            const btn = element.querySelector(`[data-jetselect-text="${label}"]`)
            const value = btn.dataset.jetselectValue.split(',')

            if (!oldTag) {
                const tag = this.createTag(label, value, index)
                
                fragment.appendChild(tag)
                tagTarget.appendChild(fragment)
            }   
        })
    }

    /**
	 * public function to update select & tag element
     * with the recorded values
	 */
    removeTags(element, label) {
        let tagsTarget

        if (this.config.tagsTarget) {
            tagsTarget = document.querySelectorAll(this.config.tagsTarget)
        } else {
            tagsTarget = element.querySelectorAll('.jetselect__label')
        }

        tagsTarget.forEach((tagTarget) => {
            const tag = tagTarget.querySelector(`[data-jetselect-label="${label}"]`)

            if (tag) {
                tag.parentNode.removeChild(tag)
            }

            if (!this.config.tagsTarget && !tagTarget.querySelector('.jetselect__tag')) {
                tagTarget.innerHTML = this.config.label
            }
        })
    }

    /**
	 * private function to create the tags
     * & add their events
	 */
    createTag(label, value, index) {
        let tag = document.createElement('span')
        let text = document.createElement('span')
        let btn = document.createElement('span')

        if (this.config.type === 'multiple') {
            if (this.config.name.constructor !== Array) {
                value = value.toString()
            }
        } else {
            value = value.toString()
            // value = ''
        }
        
        tag.addEventListener('click', (e) => {
            this.clickTag(value)
            // this.clickEvent(value, index)
            // this.config.onClickTag(value)
        })

        btn.className = `${this.baseName}-delete-btn jetselect__delete-btn`
        text.className = `${this.baseName}-tag-text jetselect__tag-text`
        tag.className = `${this.baseName}-tag jetselect__tag`
        tag.dataset.jetselectId = this.config.name
        tag.dataset.jetselectLabel = label
        text.innerHTML = label
        tag.appendChild(text)
        tag.appendChild(btn)

        return tag
    }

    /**
	 * public function to update select & tag element
     * with the recorded values
	 */
    setLabel(element) {
        const btns = element.querySelectorAll(`.${this.activeClass}`)
        const label = element.querySelector('.jetselect__label')
        const name = this.config.name
        let labelArray = []

        if (!this.labelObject[name]) {
            this.labelObject[name] = []
        }

        btns.forEach((btn) => {
            const labelText = btn.dataset.jetselectText
            const labelIndex = this.labelObject[name].indexOf(labelText)

            labelArray.push(labelText)

            if (labelIndex === -1) {
                this.labelObject[name].push(labelText)
            }
        })

        if (labelArray[0]) {
            label.innerHTML = labelArray.join(', ')
        } else {
            label.innerHTML = this.config.label
        }
    }

    /**
	 * public function to update select & tag element
     * with the recorded values
	 */
    updateSelect(element) {
        let valuesArray = this.names.map(name => '')
        const array = Object.entries(this.valueObject)
        let object = {}

        array.forEach(value => {
            const nameIndex = this.names.indexOf(value[0])
            
            valuesArray[nameIndex] = value
        })
        
        valuesArray.forEach((values, index) => {
            values[1].forEach((value, index) => {
                if (!object[index]) {
                    object[index] = []
                }

                object[index].push(value)
            })         
        })
        
        for (const key in object) {
            const value = object[key]
            const btn = element.querySelector(`[data-jetselect-value="${value}"]:not(.jetselect__item--deselect-all)`)
            const option = element.querySelector(`[value="${value}"]`)

            if (btn) {
                btn.classList.add(this.activeClass)
                btn.classList.add(`${this.baseName}-item--active`)
                option.selected = true
            }
        }

        this.setLabel(element)
    }

    /**
	 * private function to create the selects
     * on the DOM & add their events
	 */
    createSelect(element, index) {
        let fragment = document.createDocumentFragment()
        let select = document.createElement('select')
        let box = document.createElement('div')
        let list = document.createElement('ul')
        let btn = document.createElement('div')
        let text = document.createElement('span')
        let icon = document.createElement('span')

        btn.className = `${this.baseName}-btn jetselect__btn`
        text.className = `${this.baseName}-label jetselect__label`
        text.innerHTML = this.config.label
        icon.className = `${this.baseName}-icon jetselect__icon`
        box.className = `${this.baseName}-box jetselect__box`
        list.className = `${this.baseName}-list jetselect__list`
        select.className = 'jetselect__default'

        if (this.isMobile() && this.config.defaultMobile) {
            select.style.width = '100%'
            select.style.position = 'absolute'
            select.style.top = '0'
            select.style.left = '0'
            select.style.opacity = '0'
            select.style.zIndex = '9'
        } else {
            select.style.display = 'none'
        }

        if (this.config.type === 'multiple') {
            select.multiple = true
        }

        this.createList({
            element: element,
            select: select,
            list: list,
            text: this.optionsText,
            value: this.optionsValue,
            counter: this.optionsCounter,
            addIndex: 0,
            index: index
        })

        select.addEventListener('change', this.change)

        btn.appendChild(text)
        btn.appendChild(icon)
        fragment.appendChild(btn)
        box.appendChild(list)
        fragment.appendChild(box)
        fragment.appendChild(select)

        btn.addEventListener('click', () => {
            this.openClose(index)
        })

        // btn.addEventListener('keydown', (e) => {
        //     this.keyDown(index, e)
        // })

        window.addEventListener('mousedown', (e) => {
            this.clickInside(index, e)
        })

        window.addEventListener('touchstart', (e) => {
            this.clickInside(index, e)
        })

        if (!this.optionsText.toString()) {
            element.classList.add('jetselect--disabled')
        } else {
            element.classList.remove('jetselect--disabled')
        }

        element.classList.add('jetselect')
        element.appendChild(fragment)
        this.createTotal(element)
    }

    /**
	 * private function to create the selects
     * on the DOM & add their events
	 */
    createList(options) {
        const deselectAllBtn = options.element.querySelector('.jetselect__option--deselect-all')
        const selectAllBtn = options.element.querySelector('.jetselect__option--deselect-all')

        if (this.config.filter) {
            this.createSearchInput(options.element, options.list, options.index)
        }

        if (!deselectAllBtn && this.config.deselectAll) {
            this.createOption({
                element: options.element,
                select: options.select,
                list: options.list,
                itemClass: ' jetselect__option--deselect-all',
                btnClass: ' jetselect__item--deselect-all',
                text: this.config.deselectAll,
                value: '',
                addIndex: options.addIndex,
                index: options.index
            })
        }

        if (!selectAllBtn && this.config.selectAll && this.config.type === "multiple") {
            this.createOption({
                element: options.element,
                select: options.select,
                list: options.list,
                itemClass: ' jetselect__option--select-all',
                btnClass: ' jetselect__item--select-all',
                text: this.config.selectAll,
                value: '*',
                addIndex: options.addIndex,
                index: options.index
            })
        }

        options.text.forEach((text, index) => {
            if (this.config.sortTitle) {
                this.createTitle({
                    select: options.select,
                    list: options.list,
                    text: this.sortMap[index]
                })
            }

            this.createOption({
                element: options.element,
                select: options.select,
                list: options.list,
                itemClass: '',
                btnClass: '',
                text: text,
                value: this.optionsValue[index],
                counter: this.optionsCounter,
                optionIndex: index,
                addIndex: options.addIndex,
                index: options.index
            })
        })
    }

    /**
	 * private function to create the selects
     * on the DOM & add their events
	 */
    createTitle(options) {
        if (this.titles.indexOf(options.text) === -1) {
            let optgroup = document.createElement('optgroup')
            let group = document.createElement('ul')
            let title = document.createElement('div')
            let name = document.createElement('span')
            let total = document.createElement('span')

            this.titles.push(options.text)
            optgroup.label = options.text
            group.className = `${this.baseName}-group jetselect__group`
            title.className = `${this.baseName}-title jetselect__title`
            name.className = `${this.baseName}-name jetselect__name`
            total.className = `${this.baseName}-total jetselect__total`
            group.dataset.jetselectTitle = options.text
            name.innerHTML = options.text

            options.select.appendChild(optgroup)
            title.appendChild(name)
            title.appendChild(total)
            group.appendChild(title)
            options.list.appendChild(group)
        }
    }

    /**
	 * private function to create the selects
     * on the DOM & add their events
	 */
    createTotal(element) {
        if (this.config.sortTitle && this.config.sortTotal) {
            const groups = element.querySelectorAll('.jetselect__group')
            
            groups.forEach((group) => {
                let total = group.querySelector('.jetselect__total')
                const itens = group.querySelectorAll('li')
                let number = 0

                itens.forEach((item) => {
                    if (this.optionsCounter && this.optionsCounter.length) {
                        const counter = item.querySelector('.jetselect__counter')
                        number = Number(counter.innerHTML)
                    } else {
                        number = itens.length
                    }
                })

                total.innerHTML = number
            })
        }
    }

    /**
	 * private function to create the selects
     * on the DOM & add their events
	 */
    createOption(options) {
        let option = document.createElement('option')
        let item = document.createElement('li')
        let btn = document.createElement('a')
        let btnText = document.createElement('span')
        const optgroup = options.select.querySelector(`[label="${this.sortMap[options.optionIndex]}"]`)
        const group = options.list.querySelector(`[data-jetselect-title="${this.sortMap[options.optionIndex]}"]`)
        
        item.className = `${this.baseName}-option jetselect__option${options.itemClass}`
        btn.className = `${this.baseName}-item jetselect__item${options.btnClass}`
        btnText.className = `${this.baseName}-text jetselect__text`
        btn.dataset.jetselectText = options.text
        btn.dataset.jetselectValue = options.value

        option.value = options.value
        option.innerHTML = options.text
        btnText.innerHTML = options.text 
        
        btn.appendChild(btnText)
        item.appendChild(btn)

        if (group) {
            group.appendChild(item)
            optgroup.appendChild(option)
            this.addAtIndex(group, item, options.addIndex)
            this.addAtIndex(optgroup, option, options.addIndex)
        } else {
            options.list.appendChild(item)
            this.addAtIndex(options.list, item, options.addIndex)
            this.addAtIndex(options.select, option, options.addIndex)
        }

        if (this.config.type === 'multiple') {
            let checkbox = document.createElement('span')

            checkbox.className = `${this.baseName}-checkbox jetselect__checkbox`
            btn.insertBefore(checkbox, btnText)
        }

        if (options.counter && options.counter.length) {
            if (options.counter[options.optionIndex]) {
                let counter = document.createElement('span')

                counter.className = `${this.baseName}-counter jetselect__counter`
                counter.innerHTML = options.counter[options.optionIndex]
                btn.appendChild(counter)
            }
        }

        btn.addEventListener('click', () => {
            this.clickEvent(options.value, options.index)
        })
    }

    /**
	 * private function to create the selects
     * on the DOM & add their events
	 */
    addAtIndex(parent, child, index) {
        const lastItemIndex = parent.children.length

        if (!index) {
            index = lastItemIndex
        }

        if (index >= parent.children.length) {
            parent.appendChild(child)
        } else {
            parent.insertBefore(child, parent.children[index])
        }
    }

    /**
	 * private function to create the selects
     * on the DOM & add their events
	 */
    add(options) {
        this.optionsText = options.text
        this.optionsValue = options.value
        this.optionsCounter = options.counter
        this.tabIndex = null

        if (options.sort) {
            this.titles = []
            this.sort(options.sort)
        }

        this.elements.forEach((element, index) => {
            const select = element.querySelector('select')
            const list = element.querySelector('ul')

            if (!this.optionsText.toString()) {
                element.classList.add('jetselect--disabled')
            } else {
                element.classList.remove('jetselect--disabled')
            }

            this.createList({
                element: element,
                select: select,
                list: list,
                text: this.optionsText,
                value: this.arrayLowerCase(this.optionsValue),
                counter: this.optionsCounter,
                addIndex: options.addIndex,
                index: index
            })

            this.createTotal(element)
        })
    }

    /**
	 * private function to create the selects
     * on the DOM & add their events
	 */
    remove(textArray) {
        this.elements.forEach((element) => {
            const select = element.querySelector('select')
            const list = element.querySelector('ul')
            
            if (textArray) {
                textArray.forEach((text) => {
                    const btn = list.querySelector(`[data-jetselect-text="${text}"]`)
                    const value = btn.dataset.jetselectValue
                    const option = select.querySelector(`[value="${value}"]`)
                    const textIndex = this.optionsText.indexOf(text)
                    const valueIndex = this.optionsValue.indexOf(value)

                    if (textIndex !== -1) {
                        this.optionsText.splice(textIndex, 1)
                        this.optionsValue.splice(valueIndex, 1)
                        option.parentNode.removeChild(option)
                        btn.parentNode.removeChild(btn)
                    }
                })
            } else {
                element.classList.add('jetselect--disabled')
                this.valueObject = {}
                this.labelObject = {}
                this.sortMap = {}
                this.optionsText = []
                this.optionsValue = []
                select.innerHTML = ''
                list.innerHTML = ''
            }
        })
    }

    /**
	 * private function to create the selects
     * on the DOM & add their events
	 */
    createSearchInput(element, list, index) {
        let inputBox = document.createElement('div')
        let input = document.createElement('input')

        inputBox.className = `${this.baseName}-filter jetselect__filter`
        input.className = `${this.baseName}-input jetselect__input`
        input.type = this.config.filterType

        if (this.config.filterPlaceholder) {
            input.placeholder = this.config.filterPlaceholder
        }

        input.addEventListener('focus', () => {
            this.focus(index)
        })

        input.addEventListener('blur', () => {
            this.blur(index)
        })

        input.addEventListener('keyup', (e) => {
            this.keyUp(index, e)
        })

        if (this.config.filterTarget) {
            list = document.querySelector(this.config.filterTarget)
        }

        inputBox.appendChild(input)

        if (this.config.filterEmpty) {
            inputBox.appendChild(this.emptyBtn(input, index))
        }

        list.appendChild(inputBox)
    }

    /**
	 * private function to detect if the click
     * was inside the select
	 */
    emptyBtn(input, index) {
        let emptyBtn = document.createElement('a')
        emptyBtn.className = `${this.baseName}-empty-btn jetselect__empty-btn`

        emptyBtn.addEventListener('click', (e) => {
            input.value = ''
            this.manageEmptyBtn('', index)
            this.manageFilter('', index)
            this.notFound(index)
            this.config.onKeyUp()
        })

        return emptyBtn
    }

    /**
	 * private function to detect if the click
     * was inside the select
	 */
    manageEmptyBtn(value, index) {
        const emptyBtn = this.elements[index].querySelector('.jetselect__empty-btn')

        if (emptyBtn) {
            if (value) {
                emptyBtn.style.display = 'block'
            } else {
                emptyBtn.style.display = 'none'
            }
        }
    }

    /**
	 * private function to detect if the click
     * was inside the select
	 */
    clickInside(index, event) {
        const clickInsideElement = this.elements[index].contains(event.target)
        const hasOpenedClass = this.elements[index].classList.contains('jetselect--opened')
        
        if (hasOpenedClass && !clickInsideElement) {
            this.close(index)
        }
    }

    /**
	 * private function to manage
     * the open & close functions
	 */
    openClose(index) {
        const hasOpenedClass = this.elements[index].classList.contains('jetselect--opened')

        if (!hasOpenedClass) {
            this.open(index)
        } else {
            this.close(index)
        }
    }

    /**
	 * private function to open
     * the select
	 */
    open(index) {
        const list = this.elements[index].querySelector('ul')

        this.elements[index].classList.add('jetselect--opened')
        list.classList.add('jetselect__list--opened')

        this.config.onOpen()
    }

    /**
	 * private function to close
     * the select
	 */
    close(index) {
        // default select dont close
        const list = this.elements[index].querySelector('ul')
        const focusedItem = list.querySelector('.jetselect__item--focused')

        if (focusedItem) {
            this.removeFocus(focusedItem)
            this.tabIndex = null
        }

        this.elements[index].classList.remove('jetselect--opened')
        list.classList.remove('jetselect__list--opened')
        list.classList.remove('jetselect__list--opened-top')
        this.config.onClose()
    }

    /**
	 * private function to record the select values
     * into a storage with the config name
	 */
    setStorage(values) {
        this.valueObject = {}
        this.storageCheck()
        let value
        
        this.names.forEach((name, index) => {
            if (!this.valueObject[name]) {
                this.valueObject[name] = []
            }

            if (this.config.name.constructor === Array) {
                value = values[index]
            } else {
                value = values
            }

            const valueIndex = this.valueObject[name].indexOf(value)

            if (valueIndex === -1) {
                if (this.config.selectionLimit && this.config.selectionLimit <= this.valueObject[name].length) {
                    this.config.onLimit()
                } else {
                    this.valueObject[name].push(value)
                }
            } else {
                let btn
                
                this.elements.forEach((element) => {
                    btn = element.querySelector(`[data-jetselect-value="${values}"]`)
                })

                if (btn.classList.contains(this.activeClass)) {
                    this.valueObject[name].splice(valueIndex, 1)
                } else {
                    this.valueObject[name].push(value)
                }
            }

            if (this.valueObject[name][0]) {   
                this.storage.setItem(name, this.valueObject[name])
            } else {
                this.storage.removeItem(name)
            }
        })
    }

    /**
	 * private function to delete the storage
     * with the config name
	 */
    removeStorage() {
        this.names.forEach((name) => {
            this.valueObject[name] = []
            this.storage.removeItem(name)
        })
    }

    /**
	 * private function to check if the value are bigger
     * or lower than the other
	 */
    validateNumber(value) {
        const validateValue = this.storage.getItem(this.config.validateTarget)
		const checkLower = this.config.validateOperator === '<' && validateValue > value
		const checkGreater = this.config.validateOperator === '>' && validateValue < value

		if (validateValue === null || checkLower || checkGreater) {
			return true
		}
    }

    // http://jsfiddle.net/adeneo/bwf5u3sj/1/
    /**
	 * private function for the select
     * click event
	 */
    change() {
        const options = this.querySelectorAll("option")
        let values = []
        let last

        options.forEach((option) => {
            const selected = option.selected

            if (selected) {
                const value = option.value

                values.push(value)
            }
        })
            
        const set1 = this.selectedOptions.filter((i) => {
            return values.indexOf(i) < 0
        })
            
        const set2 = values.filter((i) => {
            return this.selectedOptions.indexOf(i) < 0
        })
            
        if (this.config.type !== 'multiple') {
            last = values.toString()
        } else {
            last = (set1.length ? set1 : set2)[0]
        }
        
        this.selectedOptions = values

        //if (last || last !== undefined) {
            const valueIndex = this.optionsValue.indexOf(last)

            if (this.config.name.constructor === Array) { 
                last = last.split(',')
            }
            
            if (set1.length) {
                this.clickEvent(last, valueIndex)
            } else {
                if (!this.config.selectionLimit || this.config.selectionLimit && this.selectedOptions.length <= (this.config.selectionLimit)) {
                    this.clickEvent(last, valueIndex)
                } else {
                    const option = this.querySelector(`option[value=${last}]`)

                    option.selected = false
                }  
            }
        //}
    }

    /**
	 * private function for the select
     * click event
	 */
    clickEvent(value, index) {
        if (!value || this.validateNumber(value)) {
            if (this.config.type !== 'multiple') {
                this.selectOption(value)
            }

            if (value && value !== '*') {
                this.setStorage(value)
            }

            if (this.config.type === 'multiple') {
                this.selectOption(value)
            }

            if ((this.config.type !== 'multiple' || !value || value === '*') && ((!this.isMobile() && !this.config.defaultMobile) || (!this.isMobile() && this.config.defaultMobile))) {
                this.close(index)
            }

            if (!value) {
                this.config.onDeselectAll()
            }

            if (value === '*') {
                this.config.onSelectAll()
            }

            if (value) {
                this.config.onChange(this.valueObject)
            }
        } else {
            this.config.onValidateError()
        }
    }

    /**
	 * private function to select all
     * the select options
	 */
    checkAll(element, index) {
        const isExternalTag = this.config.tags && this.config.tagsTarget
        
        this.optionsValue.forEach((value, valueIndex) => {
            if (!this.config.selectionLimit || valueIndex < this.config.selectionLimit) {
                const btn = element.querySelector(`[data-jetselect-value="${value}"]`)
                const option = element.querySelector(`[value="${value}"]`)
                const label = btn.dataset.jetselectText

                if (!btn.classList.contains(this.activeClass) || !option.selected) {
                    btn.classList.add(this.activeClass)
                    btn.classList.add(`${this.baseName}-item--active`)
                    option.selected = true

                    if (this.config.tags) {
                        this.addTags(element, label, index)
                    }

                    if (index === 0) {
                        this.setStorage(value)
                    }
                }
            }
        })

        if (!this.config.tags || isExternalTag) {
            this.setLabel(element)
        }
    }

    /**
	 * private function to unselect all
     * the select options
	 */
    uncheckAll(element) {
        const isExternalTag = this.config.tags && this.config.tagsTarget
        
        this.optionsValue.forEach((value) => {
            const btn = element.querySelector(`[data-jetselect-value="${value}"]`)
            const option = element.querySelector(`[value="${value}"]`)
            let label

            if (btn) {
                label = btn.dataset.jetselectText

                btn.classList.remove(this.activeClass)
                btn.classList.remove(`${this.baseName}-item--active`)
                
                option.selected = false

                if (this.config.tags) {
                    this.removeTags(element, label)
                }
            }
        })

        this.removeStorage()

        if (!this.config.tags || isExternalTag) {
            this.setLabel(element)
        }
    }

    /**
	 * private function to filter the checkboxes
     * labels & find matches
	 */
    sort(sortArray) {
        this.sortMap = sortArray.map((element, index) => {
            return {
                index: index,
                value: element
            }
        })

        this.sortMap.sort((a, b) => {
            if (isNaN(a.value) && isNaN(b.value)) {
                return +(a.value > b.value) || +(a.value === b.value) - 1
            } else {
                return a.value - b.value 
            }
        })

        this.optionsText = this.sortMap.map((element) => {
            return this.optionsText[element.index]
        })

        this.optionsValue = this.sortMap.map((element) => {
            return this.optionsValue[element.index]
        })

        if (this.optionsCounter && this.optionsCounter.length) {
            this.optionsCounter = this.sortMap.map((element) => {
                return this.optionsCounter[element.index]
            })
        }

        this.sortMap = this.sortMap.map((element) => {
            return element[Object.keys(element)[1]]
        })

        if (this.config.sortOrder === 'descending') {
            this.optionsText.reverse()
            this.optionsValue.reverse()
            this.optionsCounter.reverse()
            this.sortMap.reverse()
        }
    }

    /**
	 * private function to filter the checkboxes
     * labels & find matches
	 */
    filter(string, keyword) {
        const wordList = keyword.split(' ')
        let regex
        let word
		
		for (let i = 0; word = wordList[i++];) {
			regex = new RegExp(word, 'ig')

			if (!regex.test(string)) {
				return false
			}

			string = string.replace(regex, '')
		}

		return true
    }

    /**
	 * private function for the input
     * key up event
	 */
    manageFilter(value, index) {
        const btns = this.elements[index].querySelectorAll('li:not(.jetselect__option--deselect-all):not(.jetselect__option--select-all)')
        const classHidden = 'jetselect__option--hidden'
        
        btns.forEach((btn, i) => {
            const group = this.elements[index].querySelector(`[data-jetselect-title="${this.sortMap[i]}"]`)
            let groupItem

            if (group) {
                groupItem = group.querySelectorAll('li')
            }

			if (value) {
                const option = btn.querySelector('a')
                let text = option.innerHTML
                
                if (!this.filter(text, value)) {       
                    btn.classList.add(classHidden)

                    if (group) {
                        const groupItemHidden = group.querySelectorAll(`li.${classHidden}`)

                        if (groupItem.length === groupItemHidden.length) {
                            group.classList.add(classHidden)
                        }
                    }
                } else {
                    btn.classList.remove(classHidden)

                    if (group && groupItem[0]) {
                        group.classList.remove(classHidden)
                    }
                }
			} else {
                btn.classList.remove(classHidden)

                if (group) {
                    group.classList.remove(classHidden)
                }
			}
        })
    }

    /**
	 * private function to select & unselect
     * multiple options
	 */
    selectOption(value) {
        this.elements.forEach((element, index) => {
            const btn = element.querySelector(`[data-jetselect-value="${value}"]`)
            const option = element.querySelector(`[value="${value}"]`)
            const label = btn.dataset.jetselectText
            const isMultipleActive = btn.classList.contains(this.activeClass) && this.config.type === 'multiple'
            const isExternalTag = this.config.tags && this.config.tagsTarget
            const firstValue = this.valueObject[Object.keys(this.valueObject)[0]]
            const valueLength = firstValue ? firstValue.length : 1
            
            if (this.config.type !== 'multiple' || !value) {
                this.uncheckAll(element)
            } else if (value === '*') {    
                this.checkAll(element, index)
            }

            if (value && value !== '*') {
                if (isMultipleActive) {
                    btn.classList.remove(this.activeClass)
                    btn.classList.remove(`${this.baseName}-item--active`)
                    option.selected = false

                    if (this.config.tags) {
                        this.removeTags(element, label)
                    }
                } else {
                    if (!this.config.selectionLimit || valueLength < this.config.selectionLimit) {
                        btn.classList.add(this.activeClass)
                        btn.classList.add(`${this.baseName}-item--active`)
                        option.selected = true

                        if (this.config.tags && this.config.tagsOnChange) {
                            this.addTags(element, label, index)
                        }
                    }
                }
            }

            if (!this.config.tags || isExternalTag) {
                this.setLabel(element)
            }
        })
    }

    /**
	 * private function for the select
     * click event
	 */
    clickTag(values) {
        this.valueObject = {}
            this.storageCheck()
            let value

            // console.log(values)
            // if (!values) {
            //     this.setStorage('')
            // }

        this.names.forEach((name, index) => {
            if (!this.valueObject[name]) {
                this.valueObject[name] = []
            }

            if (this.config.name.constructor === Array) {
                value = values[index]
            } else {
                value = values
            }

            const valueIndex = this.valueObject[name].indexOf(value)
            
            if (valueIndex !== -1) {
                this.valueObject[name].splice(valueIndex, 1)
            }/* else {
                let btn
                this.elements.forEach((element) => {
                    btn = element.querySelector(`[data-jetselect-value="${values}"]`)
                })

                if (btn.classList.contains(this.activeClass)) {
                    this.valueObject[name].splice(valueIndex, 1)
                } else {
                    this.valueObject[name].push(value)
                }
            }*/

            this.storage.setItem(name, this.valueObject[name])

            if (!this.storage.getItem(name)) {
                this.storage.removeItem(name)
            }
        })

        this.elements.forEach((element, index) => {
            const btn = element.querySelector(`[data-jetselect-value="${values}"]`)
            const label = btn.dataset.jetselectText
            const isExternalTag = this.config.tags && this.config.tagsTarget

            btn.classList.remove(this.activeClass)
            btn.classList.remove(`${this.baseName}-item--active`)

            this.removeTags(element, label)

            if (!this.config.tags || isExternalTag) {
                this.setLabel(element)
            }
        })

        this.config.onClickTag(values)
    }

    /**
	 * private function for the input
     * focus event
	 */
    focus(index) {
        if (this.config.filterOpenOnFocus && this.config.filterTarget) {
            this.open(index)
        }

        this.config.onFocus()
    }

    /**
	 * private function for the input
     * blur event
	 */
    blur(index) {
        if (this.config.filterCloseOnBlur && this.config.filterTarget) {
            this.close(index)
        }

        this.config.onBlur()
    }

    /**
	 * private function for the input
     * key up event
	 */
    keyUp(index, event) {
        const value = event.target.value
        
        this.manageFilter(value, index)
        this.manageEmptyBtn(value, index)
        this.notFound(index)
        this.config.onKeyUp()
    }

    /**
	 * private function for the input
     * key up event
	 */
    keyDown(index, event) {
        const list = this.elements[index].querySelector('ul')
        const listHeight = list.offsetHeight
        const itens = list.querySelectorAll('li')
        const value = event.target.value
        
        if (event.keyCode === 38) {
            event.preventDefault()
            this.keyUpList(itens, list, listHeight)
        }

        if (event.keyCode === 40) {
            event.preventDefault()
            this.keyDownList(itens, list, listHeight)
        }

        if (event.keyCode === 13) {
            this.keyEnterList(itens)
        }

        this.config.onKeyDown(value)
    }

    /**
	 * private function for the input
     * key up event
	 */
    keyUpList(itens, list) {
        this.removeFocus(itens[this.tabIndex])

        if (this.tabIndex > 0) {
            this.tabIndex--
        } else {
            this.tabIndex = itens.length - 1
        }

        this.addFocus(itens[this.tabIndex])
        this.scrollUp(itens, list)
    }

    /**
	 * private function for the input
     * key up event
	 */
    keyDownList(itens, list, listHeight) {
        this.removeFocus(itens[this.tabIndex])

        if (this.tabIndex === null || this.tabIndex === itens.length - 1) {
            this.tabIndex = 0
        } else {
            this.tabIndex++
        }

        this.addFocus(itens[this.tabIndex])
        this.scrollDown(itens, list, listHeight)
    }

    /**
	 * private function for the input
     * key up event
	 */
    keyEnterList(itens) {
        if (this.tabIndex) {
            itens[this.tabIndex].querySelector('a').click()
        }

        this.config.onKeyEnter()
    }

    /**
	 * private function for the input
     * key up event
	 */
    scrollUp(itens, list) {
        var selectedItemPosition = itens[this.tabIndex].offsetTop

        if (list.scrollTop >= selectedItemPosition) {
            list.scrollTop = selectedItemPosition
        } else {
            if (this.tabIndex === itens.length - 1) {
                list.scrollTop = list.scrollHeight
            }
        }
    }

    /**
	 * private function for the input
     * key up event
	 */
    scrollDown(itens, list, listHeight) {
        const selectedItemPosition = itens[this.tabIndex].offsetTop
        const itemHeight = itens[this.tabIndex].offsetHeight
        const scrollPosition = selectedItemPosition - listHeight + itemHeight

        if (list.scrollTop <= scrollPosition) {
            list.scrollTop = scrollPosition
        } else if (selectedItemPosition < list.scrollTop) {
            list.scrollTop = selectedItemPosition
        } else {
            if (this.selectedOptions === 0) {
                list.scrollTop = 0
            }
        }
    }

    /**
	 * private function for the input
     * key up event
	 */
    addFocus(item) {
        item.classList.add(`${this.baseName}-item--focused`)
        item.classList.add('jetselect__item--focused')
    }

    /**
	 * private function for the input
     * key up event
	 */
    removeFocus(item) {
        if (item) {
            item.classList.remove(`${this.baseName}-item--focused`)
            item.classList.remove('jetselect__item--focused')
        }
    }

    /**
	 * public function to destroy
     * the select plugin
	 */
    notFound(index) {
        const list = this.elements[index].querySelector('ul')
        const classHidden = 'jetselect__option--hidden'
        const hiddenBtns = list.querySelectorAll(`li.${classHidden}:not(.jetselect__option--deselect-all):not(.jetselect__option--select-all)`)
        const deselectAllBtn = list.querySelector('.jetselect__option--deselect-all')
        const selectAllBtn = list.querySelector('.jetselect__option--select-all')
        const notFound = list.querySelector('.jetselect__not-found')

        if (hiddenBtns.length >= this.optionsText.length) {
            if (deselectAllBtn) {
                deselectAllBtn.classList.add(classHidden)
            }

            if (selectAllBtn) {
                selectAllBtn.classList.add(classHidden)
            }

            if (!notFound && this.config.filterNotFound) {
                let div = document.createElement('div')
                const text = document.createTextNode(this.config.filterNotFound)
                
                div.className = 'jetselect__not-found'
                div.appendChild(text) 
                list.appendChild(div)
            }
        } else {
            if (deselectAllBtn) {
                deselectAllBtn.classList.remove(classHidden)
            }

            if (selectAllBtn) {
                selectAllBtn.classList.remove(classHidden)
            }

            if (notFound) {
                notFound.parentNode.removeChild(notFound)
            }
        }
    }

    /**
	 * public function to destroy
     * the select plugin
	 */
    destroy() {
        this.elements.forEach((element) => {
            while (element.firstChild) {
				element.removeChild(element.firstChild)
			}
        })
    }

    /**
	 * private function to detect
     * if is a mobile device
	 */
    isMobile() {
        return /Mobi|Android/i.test(navigator.userAgent)
    }

    /**
	 * initialize instance
	 */
    init() {
        this.storageType()

        if (this.config.sortBy[0]) {
            this.sort(this.config.sortBy)
        }

        this.arrayLowerCase(this.optionsValue)
        
        this.elements.forEach((element, index) => {
            element.classList.remove('jetselect')
            element.classList.remove('jetselect--opened')
            element.tabIndex = '0'
            element.innerHTML = ''
            this.titles = []

            element.addEventListener('keydown', (e) => {
                this.keyDown(index, e)
            })
            
            this.setBaseName(element)
            this.createSelect(element, index)
        })

        const storages = this.names.some(name => this.storage.getItem(name))

        if (storages) {
            this.update()
        }
    }

}