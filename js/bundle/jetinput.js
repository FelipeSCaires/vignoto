/**
 * @name * JetInput
 * @file * jetinput.js
 * @author * Paper Plane Design Studio® <http://www.paperplane.com.br>
 * @description * input javascript module
 * @license * Todos os direitos reservados - Paper Plane Design Studio®
 * @version * 1.0
 */



class JetInput {

    /**
	 * create a jetinput
	 * @param {object} options - optional settings object
	 */
    constructor(options) {
        this.config = JetInput.extend(options)
        this.elements = document.querySelectorAll(this.config.element)
        this.names = typeof this.config.name === 'string' ? [this.config.name] : this.config.name
        this.optionsText = this.config.optionsText
        this.optionsValue = this.config.optionsValue
        this.optionsCounter = this.config.counter
        this.activeClass = 'jetinput__item--active'
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
	 * @returns {object} - custom jetinput settings
	 */
	static extend(options) {
		const settings = {
            element: '',
            name: '',
            type: '',
            autocomplete: false,
            selectionLimit: '',
            optionsText: [],
            optionsValue: [],
            counter: [],
            deselectAll: '',
            selectAll: '',
            inputType: 'text',
            placeholder: 'Digite para filtrar',
            value: '',
            update: false,
            empty: true,
            min: 0,
            max: Number,
            maxlength: Number,
            step: 1,
            pattern: '',
            // read_only: false,
            // required: false,
            closeOnBlur: true,
            sortBy: [],
            sortOrder: 'ascending',
            sortTitle: false,
            sortTotal: false,
            tags: false,
            tagsOnChange: true,
            tagsTarget: '',
            filter: false,
            // filterEmpty: true,
            // filterTarget: '',
            // filterOpenOnFocus: true,
            // filterCloseOnBlur: true,
            // filterPlaceholder: '',
            // filterNotFound: '',
            // filterType: 'text',
            sumButton: false,
            sumButtonLabel: '',
            reduceButton: false,
            reduceButtonLabel: '',
            validateOperator: '',
            validateTarget: '',
            storeOnKeyUp: true,
            storage: 'session',
            onInit: () => {},
            onOpen: () => {},
            onClose: () => {},
            onChange: (value) => {},
            onDeselectAll: () => {},
            onSelectAll: () => {},
            onKeyUp: (value) => {},
            onKeyDown: (value) => {},
            onKeyEnter: () => {},
            onFocus: () => {},
            onBlur: () => {},
            onPaste: () => {},
            onClickTag: (value) => {},
            onEmpty: () => {},
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
                element.dataset.jetinputName = className
            }
        })

        this.baseName = element.dataset.jetinputName
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
            tagsTarget = element.querySelectorAll('.jetinput')
        }
        
        tagsTarget.forEach((tagTarget) => {
            for (const labels in this.labelObject) {
                console.log(this.labelObject)
                this.labelObject[labels].forEach((label) => {
                    const tagSelector = `[data-jetinput-id="${this.config.name}"][data-jetinput-label="${label}"]`
                    const oldTag = tagTarget.querySelector(tagSelector)
                    let value

                    if (this.config.autocomplete) {
                        const btn = document.querySelector(`.${this.baseName}-item[data-jetinput-text="${label}"]`)
                        value = btn.dataset.jetinputValue.split(',')
                    } else {
                        value = label
                    }
                    
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
            tagsTarget = element.querySelectorAll('.jetinput')

            if (!tagsTarget[0].querySelector('.jetinput__tag')) {
                tagsTarget[0].innerHTML = ''
            }
        }

        tagsTarget.forEach((tagTarget) => {
            const tagSelector = `[data-jetinput-id="${this.config.name}"][data-jetinput-label="${label}"]`
            const oldTag = tagTarget.querySelector(tagSelector)
            const btn = element.querySelector(`[data-jetinput-text="${label}"]`)
            const value = btn.dataset.jetinputValue.split(',')

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
            tagsTarget = element.querySelectorAll('.jetinput')
        }

        tagsTarget.forEach((tagTarget) => {
            const tag = tagTarget.querySelector(`[data-jetinput-label="${label}"]`)

            if (tag) {
                tag.parentNode.removeChild(tag)
            }

            if (!this.config.tagsTarget && !tagTarget.querySelector('.jetinput__tag')) {
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
            value = ''
        }
        
        tag.addEventListener('click', () => {
            if (this.config.filter && this.config.autocomplete) {
                this.manageFilter('', index)
            }
            
            this.clickEvent(value, index)
            this.config.onClickTag(value)
        })

        btn.className = `${this.baseName}-delete-btn jetinput__delete-btn`
        text.className = `${this.baseName}-tag-text jetinput__tag-text`
        tag.className = `${this.baseName}-tag jetinput__tag`
        tag.dataset.jetinputId = this.config.name
        tag.dataset.jetinputLabel = label
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
        const label = element.querySelector('input')
        const name = this.config.name
        let labelArray = []

        if (!this.labelObject[name]) {
            this.labelObject[name] = []
        }

        if (this.config.autocomplete) {
            btns.forEach((btn) => {
                const labelText = btn.dataset.jetinputText
                const labelIndex = this.labelObject[name].indexOf(labelText)
    
                labelArray.push(labelText)
    
                if (labelIndex === -1) {
                    this.labelObject[name].push(labelText)
                }
            })
        } else {
            this.labelObject[name].push(this.storage.getItem(name))
        }

        if (labelArray[0]) {
            label.innerHTML = labelArray.join(', ')
        } else {
            label.innerHTML = ''
        }
    }

    /**
	 * public function to update select & tag element
     * with the recorded values
	 */
    updateSelect(element) {
        let values = {}

        for (const key in this.valueObject) {
            this.valueObject[key].forEach((value, index) => {
                if (!values[index]) {
                    values[index] = []
                }

                values[index].push(value)
            })         
        }

        for (const key in values) {
            const value = values[key]
            const btn = element.querySelector(`[data-jetinput-value="${value}"]`)

            if (btn) {
                btn.classList.add(this.activeClass)
                btn.classList.add(`${this.baseName}-item--active`)
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
        let list = document.createElement('ul')

        list.className = `${this.baseName}-list jetinput__list`

        this.createList({
            element: element,
            list: list,
            text: this.optionsText,
            value: this.optionsValue,
            counter: this.optionsCounter,
            addIndex: 0,
            index: index
        })

        window.addEventListener('click', (e) => {
            this.clickInside(index, e)
        })

        fragment.appendChild(list)
        element.appendChild(fragment)
        this.createTotal(element)
    }

    /**
	 * private function to create the selects
     * on the DOM & add their events
	 */
    createList(options) {
        const deselectAllBtn = options.element.querySelector('.jetinput__option--deselect-all')
        const selectAllBtn = options.element.querySelector('.jetinput__option--deselect-all')

        if (!deselectAllBtn && this.config.deselectAll) {
            this.createOption({
                element: options.element,
                list: options.list,
                itemClass: ' jetinput__option--deselect-all',
                btnClass: ' jetinput__item--deselect-all',
                text: this.config.deselectAll,
                value: '',
                addIndex: options.addIndex,
                index: options.index
            })
        }

        if (!selectAllBtn && this.config.selectAll && this.config.type === "multiple") {
            this.createOption({
                element: options.element,
                list: options.list,
                itemClass: ' jetinput__option--select-all',
                btnClass: ' jetinput__item--select-all',
                text: this.config.selectAll,
                value: '*',
                addIndex: options.addIndex,
                index: options.index
            })
        }

        options.text.forEach((text, index) => {
            if (this.config.sortTitle) {
                this.createTitle({
                    list: options.list,
                    text: this.sortMap[index]
                })
            }

            this.createOption({
                element: options.element,
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
            let group = document.createElement('ul')
            let title = document.createElement('div')
            let name = document.createElement('span')
            let total = document.createElement('span')

            this.titles.push(options.text)
            group.className = `${this.baseName}-group jetinput__group`
            title.className = `${this.baseName}-title jetinput__title`
            name.className = `${this.baseName}-name jetinput__name`
            total.className = `${this.baseName}-total jetinput__total`
            group.dataset.jetinputTitle = options.text
            name.innerHTML = options.text

            // options.select.appendChild(optgroup)
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
            const groups = element.querySelectorAll('.jetinput__group')
            
            groups.forEach((group) => {
                let total = group.querySelector('.jetinput__total')
                const itens = group.querySelectorAll('li')
                let number = 0

                itens.forEach((item) => {
                    if (this.optionsCounter && this.optionsCounter.length) {
                        const counter = item.querySelector('.jetinput__counter')
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
        let item = document.createElement('li')
        let btn = document.createElement('a')
        let btnText = document.createElement('span')
        const group = options.list.querySelector(`[data-jetinput-title="${this.sortMap[options.optionIndex]}"]`)
        
        item.className = `${this.baseName}-option jetinput__option${options.itemClass}`
        btn.className = `${this.baseName}-item jetinput__item${options.btnClass}`
        btnText.className = `${this.baseName}-text jetinput__text`
        btn.dataset.jetinputText = options.text
        btn.dataset.jetinputValue = options.value
        btnText.innerHTML = options.text 
        
        btn.appendChild(btnText)
        item.appendChild(btn)

        if (group) {
            group.appendChild(item)
            this.addAtIndex(group, item, options.addIndex)
        } else {
            options.list.appendChild(item)
            this.addAtIndex(options.list, item, options.addIndex)
        }

        if (this.config.type === 'multiple') {
            let checkbox = document.createElement('span')

            checkbox.className = `${this.baseName}-checkbox jetinput__checkbox`
            btn.insertBefore(checkbox, btnText)
        }

        if (options.counter && options.counter.length) {
            if (options.counter[options.optionIndex]) {
                let counter = document.createElement('span')

                counter.className = `${this.baseName}-counter jetinput__counter`
                counter.innerHTML = options.counter[options.optionIndex]
                btn.appendChild(counter)
            }
        }

        btn.addEventListener('click', () => {
            this.clickEvent(options.value, options.index)
        })

        btn.addEventListener('mouseover', (e) => {
            const selectedItem = options.list.querySelector('.jetinput__item--focused')
            this.tabIndex = options.optionIndex

            if (selectedItem) {
                this.removeFocus(selectedItem)
            }
            
            this.addFocus(e.target.parentElement)
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

        this.arrayLowerCase(this.optionsValue)

        if (options.sort) {
            this.titles = []
            this.sort(options.sort)
        }

        this.elements.forEach((element, index) => {
            const input = element.querySelector('input')
            const list = element.querySelector('ul')

            if (!this.optionsText.toString()) {
                element.classList.add('jetinput--disabled')
            } else {
                element.classList.remove('jetinput--disabled')
            }

            this.createList({
                element: element,
                list: list,
                text: this.optionsText,
                value: this.optionsValue,
                counter: this.optionsCounter,
                addIndex: options.addIndex,
                index: index
            })

            this.createTotal(element)

            if (input === document.activeElement) {
                this.open(index)
            }
        })
    }

    /**
	 * private function to create the selects
     * on the DOM & add their events
	 */
    remove(textArray) {
        this.elements.forEach((element) => {
            const list = element.querySelector('ul')
            
            if (textArray) {
                textArray.forEach((text) => {
                    const btn = list.querySelector(`[data-jetinput-text="${text}"]`)
                    const value = btn.dataset.jetinputValue
                    const textIndex = this.optionsText.indexOf(text)
                    const valueIndex = this.optionsValue.indexOf(value)

                    if (textIndex !== -1) {
                        this.optionsText.splice(textIndex, 1)
                        this.optionsValue.splice(valueIndex, 1)
                        btn.parentNode.removeChild(btn)
                    }
                })
            } else {
                this.valueObject = {}
                this.labelObject = {}
                this.sortMap = {}
                this.optionsText = []
                this.optionsValue = []
                
                if (list) {
                    list.innerHTML = ''
                }
            }
        })
    }

    /**
	 * public function to add value
     * to the number input
	 */
    sum() {
        const min = this.config.min
        const max = this.config.max
        const step = this.config.step
        let value

        this.elements.forEach((el, i) => {
            const input = el.querySelector('input')
            const emptyBtn = el.querySelector('.jetinput__empty-btn')
            value = parseInt(input.value, 10)
            value = isNaN(value) ? min : value

            if (!isNaN(max)) {
                value = Number(value) + Number(step)

                if (value >= max) {
                    value = max
                }
            } else {
                value++
            }

            if (emptyBtn) {
                emptyBtn.style.display = 'block'
            }
          
            input.value = value
        })

        this.removeStorage()
        this.setStorage(value)
        this.config.onChange(value)

        if (this.config.update) {
            this.update()
        }
    }

    /**
	 * public function to substract value
     * to the number input
	 */
    reduce() {
        const min = this.config.min
        const step = this.config.step
        let value
        
        this.elements.forEach((el, i) => {
            const input = el.querySelector('input')
            const emptyBtn = el.querySelector('.jetinput__empty-btn')
            value = parseInt(input.value, 10)
            value = isNaN(value) ? min : value
            
            if (!isNaN(min)) {
                value = Number(value) - Number(step)
                
                if (value <= min) {
                    value = min
                }
            } else {
                value--
            }

            if (emptyBtn) {
                emptyBtn.style.display = 'block'
            }
            
            input.value = value
        })

        this.removeStorage()
        this.setStorage(value)
        this.config.onChange(value)

        if (this.config.update) {
            this.update()
        }
    }

    /**
	 * private function to create the selects
     * on the DOM & add their events
	 */
    createSearchInput(element, index) {
        let fragment = document.createDocumentFragment()
        const inputBox = document.createElement('div')
        const input = document.createElement('input')

        inputBox.className = `${this.baseName}-filter jetinput__filter`
        input.className = `${this.baseName}-input jetinput__input`
        input.placeholder = this.config.placeholder
        input.type = this.config.inputType

        if (this.config.value !== '') {
            input.value = this.config.value
        }

        if (!isNaN(this.config.min)) {
            input.min = this.config.min
        }

        if (!isNaN(this.config.max)) {
            input.max = this.config.max
        }

        if (!isNaN(this.config.maxlength)) {
            input.maxLength = this.config.maxlength
        }

        if (!isNaN(this.config.step)) {
            input.step = this.config.step
        }

        // if (config.required) {
        //     input.required = this.config.required
        // }

        // if (config.read_only) {
        //     input.readOnly = this.config.read_only
        // }

        input.addEventListener('paste', (e) => {
            this.paste(index, e)
        })

        input.addEventListener('focus', () => {
            this.focus(index)
        })

        input.addEventListener('blur', () => {
            this.config.onBlur()
        })

        input.addEventListener('keyup', (e) => {
            this.keyUp(index, e)
        })

        input.addEventListener('keydown', (e) => {
            this.keyDown(index, e)
        })

        inputBox.appendChild(input)

        if (this.config.empty) {
            inputBox.appendChild(this.emptyBtn(input, index))
        }

        fragment.appendChild(inputBox)

        if (this.config.reduceButton) {
            fragment.appendChild(this.reduceBtn())
        }

        if (this.config.sumButton) {
            fragment.appendChild(this.sumBtn())
        }

        element.appendChild(fragment)
        element.classList.add('jetinput')
    }

    /**
	 * public function to detect if the click
     * was inside the select
	 */
    empty() {
        this.elements.forEach((element, index) => {
            const input = element.querySelector('input')
            input.value = ''

            if (this.config.autocomplete) {
                this.close(index)

                if (!this.config.filter) {
                    this.remove()
                } else {
                    this.manageFilter('', index)
                }
            }
            
            if (this.config.empty) {
                this.manageEmptyBtn('', index)
            }

            if (this.config.storeOnKeyUp) {
                this.removeStorage()
            }
        })

        this.config.onEmpty()
    }

    /**
	 * private function to detect if the click
     * was inside the select
	 */
    emptyBtn(input, index) {
        let emptyBtn = document.createElement('a')
        emptyBtn.className = `${this.baseName}-empty-btn jetinput__empty-btn`

        emptyBtn.addEventListener('click', this.empty.bind(this))

        return emptyBtn
    }

    /**
	 * private function to detect if the click
     * was inside the select
	 */
    manageEmptyBtn(value, index) {
        const emptyBtn = this.elements[index].querySelector('.jetinput__empty-btn')

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
    sumBtn() {
        let sumBtn = document.createElement('div')
        sumBtn.className = `${this.baseName}-sum-btn jetinput__sum-btn`

        if (this.config.sumButtonLabel) {
            sumBtn.innerText = this.config.sumButtonLabel
        }
        
        sumBtn.addEventListener('click', this.sum.bind(this))

        return sumBtn
    }

    /**
	 * private function to detect if the click
     * was inside the select
	 */
    reduceBtn() {
        let reduceBtn = document.createElement('div')
        reduceBtn.className = `${this.baseName}-reduce-btn jetinput__reduce-btn`

        if (this.config.reduceButtonLabel) {
            reduceBtn.innerText = this.config.reduceButtonLabel
        }
        
        reduceBtn.addEventListener('click', this.reduce.bind(this))
        return reduceBtn
    }

    /**
	 * private function to detect if the click
     * was inside the select
	 */
    clickInside(index, event) {
        const clickInsideElement = this.elements[index].contains(event.target)
        const hasOpenedClass = this.elements[index].classList.contains('jetinput--opened')
        
        if (hasOpenedClass && !clickInsideElement && this.config.closeOnBlur) {
            this.close(index)
        }
    }

    /**
	 * private function to open
     * the select
	 */
    open(index) {
        const list = this.elements[index].querySelector('ul')

        this.elements[index].classList.add('jetinput--opened')
        list.classList.add('jetinput__list--opened')

        this.config.onOpen()
    }

    /**
	 * private function to close
     * the select
	 */
    close(index) {
        if (this.config.autocomplete) {
            const list = this.elements[index].querySelector('ul')
            const focusedItem = list.querySelector('.jetinput__item--focused')
    
            if (focusedItem) {
                this.removeFocus(focusedItem)
                this.tabIndex = null
            }
    
            this.elements[index].classList.remove('jetinput--opened')
            list.classList.remove('jetinput__list--opened')
            list.classList.remove('jetinput__list--opened-top')
        }
        
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
                this.valueObject[name].splice(valueIndex, 1)
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

    /**
	 * private function for the select
     * click event
	 */
    clickEvent(value, index) {
        if (!value || this.validateNumber(value)) {
            const input = this.elements[index].querySelector('input')

            this.selectOption(value)

            if (value && value !== '*') {
                this.setStorage(value)
            }

            if ((this.config.type !== 'multiple' || !value || value === '*')) {
                this.close(index)
            }

            if (this.config.empty) {
                this.manageEmptyBtn(input.value, index)
            }

            if (!value) {
                this.config.onDeselectAll()
            }

            if (value === '*') {
                this.config.onSelectAll()
            }

            // input.focus()

            // if (value) {
                this.config.onChange(this.valueObject)
            // }
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
                const btn = element.querySelector(`[data-jetinput-value="${value}"]`)
                const label = btn.dataset.jetinputText

                if (!btn.classList.contains(this.activeClass) || !option.selected) {
                    btn.classList.add(this.activeClass)
                    btn.classList.add(`${this.baseName}-item--active`)

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
            const btn = element.querySelector(`[data-jetinput-value="${value}"]`)
            let label

            if (btn) {
                label = btn.dataset.jetinputText

                btn.classList.remove(this.activeClass)
                btn.classList.remove(`${this.baseName}-item--active`)

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
        const btns = this.elements[index].querySelectorAll('li:not(.jetinput__option--deselect-all):not(.jetinput__option--select-all)')
        const classHidden = 'jetinput__option--hidden'
        
        btns.forEach((btn, i) => {
            const group = this.elements[index].querySelector(`[data-jetinput-title="${this.sortMap[i]}"]`)
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
            let btn
            let label
            let isMultipleActive

            if (value) {
                btn = element.querySelector(`[data-jetinput-value="${value}"]`)
                label = btn.dataset.jetinputText
                isMultipleActive = btn.classList.contains(this.activeClass) && this.config.type === 'multiple'
            }

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

                    if (this.config.tags) {
                        this.removeTags(element, label)
                    }
                } else {
                    if (!this.config.selectionLimit || valueLength < this.config.selectionLimit) {
                        btn.classList.add(this.activeClass)
                        btn.classList.add(`${this.baseName}-item--active`)

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
	 * private function for the input
     * paste event
	 */
    paste(index, event) {
        setTimeout(() => {
            const value = event.target.value
            
            this.setStorage(value)
            this.config.onPaste()
        })
    }

    /**
	 * private function for the input
     * focus event
	 */
    focus(index) {
        if (this.config.autocomplete && this.optionsText[0]) {     
            this.open(index)
        }

        this.config.onFocus()
    }

    /**
	 * private function for the input
     * key up event
	 */
    keyUp(index, event) {
        const input = this.elements[index].querySelector('input')
        const value = event.target.value

        if (event.keyCode !== 38 && event.keyCode !== 40 && event.keyCode !== 13 && event.keyCode !== 17) {
            this.manageEmptyBtn(value, index)
            this.removeStorage()
        }

        if (event.keyCode === 8 || event.keyCode === 32 || event.keyCode === 46 || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode >= 187 && event.keyCode <= 190) || event.keyCode === 229) {
            if (!this.config.pattern || (this.config.pattern && this.pattern(value, this.config.pattern))) {
                if (value) {
                    if (this.config.storeOnKeyUp) {
                        this.setStorage(value)
                        // this.setLabel(element)
                        this.config.onChange(value)
                    }
                }

                if (this.config.filter && this.config.autocomplete) {
                    this.manageFilter(value, index)
                }

                this.config.onKeyUp(value)
            } else {
                input.value = this.removeLastDigit(value)
            }
        }
    }

    /**
	 * private function for the input
     * key up event
	 */
    keyDown(index, event) {
        let value = event.target.value
        let itens

        if (this.config.autocomplete) {
            const list = this.elements[index].querySelector('ul')
            const listHeight = list.offsetHeight
            itens = list.querySelectorAll('li')
            
            if (event.keyCode === 38) {
                event.preventDefault()
                this.keyUpList(itens, list, listHeight)
            }

            if (event.keyCode === 40) {
                event.preventDefault()
                this.keyDownList(itens, list, listHeight)
            }
        }

        if (event.keyCode === 13) {
            if (this.config.autocomplete) {
                this.keyEnterList(itens)
            } else {
                this.keyEnterList() 
            }
            
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
        item.classList.add('jetinput__item--focused')
    }

    /**
	 * private function for the input
     * key up event
	 */
    removeFocus(item) {
        if (item) {
            item.classList.remove(`${this.baseName}-item--focused`)
            item.classList.remove('jetinput__item--focused')
        }
    }

    /**
	 * private function for the input
     * key up event
	 */
    pattern(value, regex) {
        return regex.test(value)
    }

    /**
	 * private function for the input
     * key up event
	 */
    removeLastDigit(value) {
        return value.substr(0, value.length - 1)
    }

    /**
	 * public function to destroy
     * the select plugin
	 */
    notFound(index) {
        const list = this.elements[index].querySelector('ul')
        const classHidden = 'jetinput__option--hidden'
        const hiddenBtns = list.querySelectorAll(`li.${classHidden}:not(.jetinput__option--deselect-all):not(.jetinput__option--select-all)`)
        const deselectAllBtn = list.querySelector('.jetinput__option--deselect-all')
        const selectAllBtn = list.querySelector('.jetinput__option--select-all')
        const notFound = list.querySelector('.jetinput__not-found')

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
                
                div.className = 'jetinput__not-found'
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

            this.open(index)
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
	 * initialize instance
	 */
    init() {
        this.storageType()

        if (this.config.sortBy[0]) {
            this.sort(this.config.sortBy)
        }
        
        this.arrayLowerCase(this.optionsValue)

        this.elements.forEach((element, index) => {
            element.classList.remove('jetinput')
            element.classList.remove('jetinput--opened')
            element.tabIndex = '0'
            element.innerHTML = ''
            this.titles = []
            
            this.setBaseName(element)
            this.createSearchInput(element, index)

            if (this.config.autocomplete) {
                this.createSelect(element, index)
            }
        })

        if (this.storage.getItem(this.names[0])) {
            this.update()
        }
    }

}