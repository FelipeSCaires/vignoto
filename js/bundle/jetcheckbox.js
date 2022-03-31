/**
 * @name * JetCheckbox
 * @file * jetcheckbox.js
 * @author * Paper Plane Design Studio® <http://www.paperplane.com.br>
 * @description * checkbox javascript module
 * @license * Todos os direitos reservados - Paper Plane Design Studio®
 * @version * 1.0
 */



class JetCheckbox {

    /**
	 * create a jetcheckbox
	 * @param {object} options - optional settings object
	 */
    constructor(options) {
        this.config = JetCheckbox.extend(options)
        this.elements = typeof this.config.element === 'string' ? document.querySelectorAll(this.config.element) : [this.config.element]
        this.names = typeof this.config.name === 'string' ? [this.config.name] : this.config.name
        this.optionsText = this.config.optionsText
        this.optionsValue = this.config.optionsValue
        this.optionsCounter = this.config.counter
        this.activeClass = 'jetcheckbox__item--active'
        this.valueObject = {}
        this.labelObject = {}
        this.sortMap = {}
        this.baseName
        this.titles
        this.storage

        this.init()
        this.config.onInit()
	}
	
	/**
	 * overrides default settings with custom ones
	 * @param {object} options - optional settings object
	 * @returns {object} - custom jetcheckbox settings
	 */
	static extend(options) {
		const settings = {
            element: '',
            name: '',
            checkLimit: '',
            optionsText: [],
            optionsValue: [],
            counter: [],
            uncheckAll: '',
            checkAll: '',
            label: '',
            sortBy: [],
            sortOrder: 'ascending',
            sortTitle: false,
            sortTotal: false,
            tags: false,
            tagsOnChange: true,
            tagsTarget: '',
            filter: false,
            filterEmpty: true,
            filterTarget: '',
            filterPlaceholder: '',
            filterNotFound: '',
            filterType: 'text',
            validateOperator: '',
            validateTarget: '',
            storage: 'session',
            onInit: () => {},
            onChange: (value) => {},
            onUncheckAll: () => {},
            onCheckAll: () => {},
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
        let classArray
        
        if (typeof this.config.element === 'string') {
            classArray = this.config.element.split(',')
        } else {
            classArray = this.config.element.className
            classArray = classArray.split(' ')
        }

        classArray.forEach((className) => {
            if (typeof this.config.element === 'string') {
                className = className.trim().substr(1)
            } else {
                className = classArray[0]
            }

            if (elementClass.indexOf(className) > -1) {
                element.dataset.jetcheckboxName = className
            }
        })

        this.baseName = element.dataset.jetcheckboxName
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
        
        this.elements.forEach((element) => {
            this.updateCheckbox(element)
            
            if (this.config.tags) {
                this.updateTags(element)
            }
        })
    }

    /**
	 * public function to update select & tag element
     * with the recorded values
	 */
    updateTags(element) {
        let fragment = document.createDocumentFragment()
        let tagsTarget

        if (this.config.tagsTarget) {
            tagsTarget = document.querySelectorAll(this.config.tagsTarget)
        } else {
            tagsTarget = element.querySelectorAll('.jetcheckbox__label')
        }
        
        tagsTarget.forEach((tagTarget) => {
            for (const labels in this.labelObject) {
                this.labelObject[labels].forEach((label) => {
                    const tagSelector = `[data-jetcheckbox-id="${this.config.name}"][data-jetcheckbox-label="${label}"]`
                    const oldTag = tagTarget.querySelector(tagSelector)
                    const btn = document.querySelector(`.${this.baseName}-item[data-jetcheckbox-text="${label}"]`)
                    const value = btn.dataset.jetcheckboxValue.split(',')
                    
                    if (!this.config.tagsTarget) {
                        tagsTarget[0].innerHTML = ''
                    }
                        
                    if (!oldTag) {
                        const tag = this.createTag(label, value)

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
    addTags(element, label) {
        let fragment = document.createDocumentFragment()
        let tagsTarget

        if (this.config.tagsTarget) {
            tagsTarget = document.querySelectorAll(this.config.tagsTarget)
        } else {
            tagsTarget = element.querySelectorAll('.jetcheckbox__label')

            if (!tagsTarget[0].querySelector('.jetcheckbox__tag')) {
                tagsTarget[0].innerHTML = ''
            }
        }

        tagsTarget.forEach((tagTarget) => {
            const tagSelector = `[data-jetcheckbox-id="${this.config.name}"][data-jetcheckbox-label="${label}"]`
            const oldTag = tagTarget.querySelector(tagSelector)
            const btn = element.querySelector(`[data-jetcheckbox-text="${label}"]`)
            const value = btn.dataset.jetcheckboxValue.split(',')

            if (!oldTag) {
                const tag = this.createTag(label, value)
                
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
            tagsTarget = element.querySelectorAll('.jetcheckbox__label')
        }

        tagsTarget.forEach((tagTarget) => {
            const tag = tagTarget.querySelector(`[data-jetcheckbox-id="${this.config.name}"][data-jetcheckbox-label="${label}"]`)

            if (tag) {
                tag.parentNode.removeChild(tag)
            }

            if (!this.config.tagsTarget && !tagTarget.querySelector('.jetcheckbox__tag')) {
                tagTarget.innerHTML = this.config.label
            }
        })
    }

    /**
	 * private function to create the tags
     * & add their events
	 */
    createTag(label, value) {
        let tag = document.createElement('span')
        let text = document.createElement('span')
        let btn = document.createElement('span')

        if (this.config.name.constructor !== Array) {
            value = value.toString()
        }
        
        tag.addEventListener('click', () => {
            this.clickTag(value)
            // this.clickEvent(value)
            // this.config.onClickTag(value)
            // console.log(this.config.onClickTag.toString() !== '(value) => {}') // check empty function
        })

        btn.className = `${this.baseName}-delete-btn jetcheckbox__delete-btn`
        text.className = `${this.baseName}-tag-text jetcheckbox__tag-text`
        tag.className = `${this.baseName}-tag jetcheckbox__tag`
        tag.dataset.jetcheckboxId = this.config.name
        tag.dataset.jetcheckboxLabel = label
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
        const label = element.querySelector('.jetcheckbox__label')
        let labelArray = []
        const name = this.config.name

        if (!this.labelObject[name]) {
            this.labelObject[name] = []
        }

        btns.forEach((btn) => {
            const labelText = btn.dataset.jetcheckboxText
            const labelIndex = this.labelObject[name].indexOf(labelText)

            labelArray.push(labelText)

            if (labelIndex === -1) {
                this.labelObject[name].push(labelText)
            }
        })

        if (this.config.label) {
            if (labelArray[0]) {
                label.innerHTML = labelArray.join(', ')
            } else {
                label.innerHTML = this.config.label
            }
        }
    }

    /**
	 * public function to update select & tag element
     * with the recorded values
	 */
    updateCheckbox(element) {
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
            const btn = element.querySelector(`[data-jetcheckbox-value="${value}"]:not(.jetcheckbox__item--uncheck-all)`)

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
    createCheckbox(element, index) {
        let fragment = document.createDocumentFragment()
        let list = document.createElement('ul')
        let btn = document.createElement('div')
        let text = document.createElement('span')
        let icon = document.createElement('span')

        btn.className = `${this.baseName}-btn jetcheckbox__btn`
        text.className = `${this.baseName}-label jetcheckbox__label`
        text.innerHTML = this.config.label
        icon.className = `${this.baseName}-icon jetcheckbox__icon`
        list.className = `${this.baseName}-list jetcheckbox__list`

        this.createList({
            element: element,
            list: list,
            text: this.optionsText,
            value: this.optionsValue,
            counter: this.optionsCounter,
            addIndex: 0,
            index: index
        })

        btn.appendChild(text)
        btn.appendChild(icon)
        fragment.appendChild(btn)
        fragment.appendChild(list)

        if (!this.optionsText.toString()) {
            element.classList.add('jetcheckbox--disabled')
        }

        element.classList.add('jetcheckbox')
        element.appendChild(fragment)
        this.createTotal(element)
    }

    /**
	 * private function to create the selects
     * on the DOM & add their events
	 */
    createList(options) {
        if (this.config.filter) {
            this.createSearchInput(options.element, options.list, options.index)
        }

        if (this.config.uncheckAll) {
            this.createCheck({
                element: options.element,
                list: options.list,
                itemClass: ' jetcheckbox__option--uncheck-all',
                btnClass: ' jetcheckbox__item--uncheck-all',
                text: this.config.uncheckAll,
                value: '',
                addIndex: options.addIndex,
                index: options.index
            })
        }

        if (this.config.checkAll) {
            this.createCheck({
                element: options.element,
                list: options.list,
                itemClass: ' jetcheckbox__option--check-all',
                btnClass: ' jetcheckbox__item--check-all',
                text: this.config.checkAll,
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

            this.createCheck({
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
            group.className = `${this.baseName}-group jetcheckbox__group`
            title.className = `${this.baseName}-title jetcheckbox__title`
            name.className = `${this.baseName}-name jetcheckbox__name`
            total.className = `${this.baseName}-total jetcheckbox__total`
            group.dataset.jetcheckboxTitle = options.text
            name.innerHTML = options.text

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
            const groups = element.querySelectorAll('.jetcheckbox__group')
            
            groups.forEach((group) => {
                let total = group.querySelector('.jetcheckbox__total')
                const itens = group.querySelectorAll('li')
                let number = 0

                itens.forEach((item) => {
                    if (this.optionsCounter && this.optionsCounter.length) {
                        const counter = item.querySelector('.jetcheckbox__counter')
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
    createCheck(options) {
        let item = document.createElement('li')
        let btn = document.createElement('label')
        let btnText = document.createElement('span')
        const group = options.list.querySelector('[jetcheckbox-title="' + this.sortMap[options.optionIndex] + '"]')
        
        item.className = `${this.baseName}-option jetcheckbox__option${options.itemClass}`
        btn.className = `${this.baseName}-item jetcheckbox__item${options.btnClass}` 
        btnText.className = `${this.baseName}-text jetcheckbox__text`
        btn.dataset.jetcheckboxText = options.text
        btn.dataset.jetcheckboxValue = options.value

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

        let checkbox = document.createElement('span')

        checkbox.className = `${this.baseName}-checkbox jetcheckbox__checkbox`
        btn.insertBefore(checkbox, btnText)

        if (options.counter && options.counter.length) {
            let counter = document.createElement('span')

            counter.className = `${this.baseName}-counter jetcheckbox__counter`
            counter.innerHTML = options.counter[options.optionIndex]
            btn.appendChild(counter)
        }

        btn.addEventListener('click', () => {
            this.clickEvent(options.value)
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

        if (options.sort) {
            this.titles = []
            this.sort(options.sort)
        }

        this.elements.forEach((element, index) => {
            const list = element.querySelector('ul')

            if (!this.optionsText.toString()) {
                element.classList.add('jetcheckbox--disabled')
            } else {
                element.classList.remove('jetcheckbox--disabled')
            }

            this.createList({
                element: element,
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
            const list = element.querySelector('ul')

            if (textArray) {
                textArray.forEach((text) => {
                    const btn = list.querySelector(`[data-jetcheckbox-text="${text}"]`)
                    const value = btn.dataset.jetcheckboxValue
                    const textIndex = this.optionsText.indexOf(text)
                    const valueIndex = this.optionsValue.indexOf(value)

                    if (textIndex !== -1) {
                        this.optionsText.splice(textIndex, 1)
                        this.optionsValue.splice(valueIndex, 1)
                        btn.parentNode.removeChild(btn)
                    }
                })
            } else {
                element.classList.add('jetcheckbox--disabled')
                this.valueObject = {}
                this.labelObject = {}
                this.sortMap = {}
                this.optionsText = []
                this.optionsValue = []
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

        inputBox.className = `${this.baseName}-filter jetcheckbox__filter`
        input.className = `${this.baseName}-input jetcheckbox__input`
        input.type = this.config.filterType

        if (this.config.filterPlaceholder) {
            input.placeholder = this.config.filterPlaceholder
        }

        input.addEventListener('focus', this.config.focus)
        input.addEventListener('blur', this.config.blur)

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
        emptyBtn.className = `${this.baseName}-empty-btn jetcheckbox__empty-btn`

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
        const emptyBtn = this.elements[index].querySelector('.jetcheckbox__empty-btn')

        if (emptyBtn) {
            if (value) {
                emptyBtn.style.display = 'block'
            } else {
                emptyBtn.style.display = 'none'
            }
        }
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
                if (this.config.checkLimit && this.config.checkLimit <= this.valueObject[name].length) {
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
    clickEvent(value) {
        if (!value || this.validateNumber(value)) {
            this.selectOption(value)

            if (value && value !== '*') {
                this.setStorage(value)
            }

            if (!value) {
                this.config.onUncheckAll()
            }

            if (value === '*') {
                this.config.onCheckAll()
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
            if (!this.config.checkLimit || valueIndex < this.config.checkLimit) {
                const btn = element.querySelector(`[data-jetcheckbox-value="${value}"]`)
                const label = btn.dataset.jetcheckboxText

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

        if (this.config.label && (!this.config.tags || isExternalTag)) {
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
            const btn = element.querySelector(`[data-jetcheckbox-value="${value}"]`)
            let label

            if (btn) {
                label = btn.dataset.jetcheckboxText

                btn.classList.remove(this.activeClass)
                btn.classList.remove(`${this.baseName}-item--active`)

                if (this.config.tags) {
                    this.removeTags(element, label)
                }
            }
        })

        this.removeStorage()

        if (this.config.label && (!this.config.tags || isExternalTag)) {
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
        const btns = this.elements[index].querySelectorAll('li:not(.jetcheckbox__option--uncheck-all):not(.jetcheckbox__option--check-all)')
        const classHidden = 'jetcheckbox__option--hidden'
        
        btns.forEach((btn, i) => {
            const group = this.elements[index].querySelector(`[data-jetcheckbox-title="${this.sortMap[i]}"]`)
            let groupItem

            if (group) {
                groupItem = group.querySelectorAll('li')
            }

			if (value) {
                const option = btn.querySelector('label')
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
            const btn = element.querySelector(`[data-jetcheckbox-value="${value}"]`)
            const label = btn.dataset.jetcheckboxText
            const isActive = btn.classList.contains(this.activeClass)
            const isExternalTag = this.config.tags && this.config.tagsTarget
            const firstValue = this.valueObject[Object.keys(this.valueObject)[0]]
            const valueLength = firstValue ? firstValue.length : 1
            
            if (!value) {
                this.uncheckAll(element)
            } else if (value === '*') {    
                this.checkAll(element, index)
            }

            if (value && value !== '*') {
                if (isActive) {
                    btn.classList.remove(this.activeClass)
                    btn.classList.remove(`${this.baseName}-item--active`)

                    if (this.config.tags) {
                        this.removeTags(element, label)
                    }
                } else {
                    if (!this.config.checkLimit || valueLength < this.config.checkLimit) {
                        btn.classList.add(this.activeClass)
                        btn.classList.add(`${this.baseName}-item--active`)

                        if (this.config.tags && this.config.tagsOnChange) {
                            this.addTags(element, label)
                        }
                    }
                }
            }

            if (this.config.label && (!this.config.tags || isExternalTag)) {
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
                    btn = element.querySelector(`[data-jetcheckbox-value="${values}"]`)
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
            const btn = element.querySelector(`[data-jetcheckbox-value="${values}"]`)
            const label = btn.dataset.jetcheckboxText
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
	 * public function to destroy
     * the select plugin
	 */
    notFound(index) {
        const list = this.elements[index].querySelector('ul')
        const classHidden = 'jetcheckbox__option--hidden'
        const hiddenBtns = list.querySelectorAll(`li.${classHidden}:not(.jetcheckbox__option--uncheck-all):not(.jetcheckbox__option--check-all)`)
        const uncheckAllBtn = list.querySelector('.jetcheckbox__option--uncheck-all')
        const checkAllBtn = list.querySelector('.jetcheckbox__option--check-all')
        const notFound = list.querySelector('.jetcheckbox__not-found')

        if (hiddenBtns.length >= this.optionsText.length) {
            if (uncheckAllBtn) {
                uncheckAllBtn.classList.add(classHidden)
            }

            if (checkAllBtn) {
                checkAllBtn.classList.add(classHidden)
            }

            if (!notFound && this.config.filterNotFound) {
                let div = document.createElement('div')
                const text = document.createTextNode(this.config.filterNotFound)
                
                div.className = 'jetcheckbox__not-found'
                div.appendChild(text) 
                list.appendChild(div)
            }
        } else {
            if (uncheckAllBtn) {
                uncheckAllBtn.classList.remove(classHidden)
            }

            if (checkAllBtn) {
                checkAllBtn.classList.remove(classHidden)
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
	 * initialize instance
	 */
    init() {
        this.storageType()

        if (this.config.sortBy[0]) {
            this.sort(this.config.sortBy)
        }

        this.arrayLowerCase(this.optionsValue)
        
        this.elements.forEach((element, i) => {
            element.classList.remove('jetcheckbox')
            element.innerHTML = ''
            this.titles = []
            
            this.setBaseName(element)
            this.createCheckbox(element, i)
        })

        const storages = this.names.some(name => this.storage.getItem(name))

        if (storages) {
            this.update()
        }
    }

}