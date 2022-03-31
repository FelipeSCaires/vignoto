/**
 * @name * JetSlider
 * @file * jetslider.js
 * @author * Paper Plane Design Studio® <http://www.paperplane.com.br>
 * @description * javascript module to create slider & gallery
 * @license * Todos os direitos reservados - Paper Plane Design Studio®
 * @version * 1.0
 */



class JetSlider {

    /**
     * create a jetslider
     * @param {object} options - optional settings object
     */
    constructor(options) {
        this.config = JetSlider.extend(options)
        this.element = typeof this.config.element === 'string' ? document.querySelector(this.config.element) : this.config.element
        this.prevBtn = this.config.prev && typeof this.config.prev === 'string' ? document.querySelector(this.config.prev) : this.config.prev
        this.nextBtn = this.config.next && typeof this.config.next === 'string' ? document.querySelector(this.config.next) : this.config.next
        this.pagination = this.config.pagination && typeof this.config.pagination === 'string' ? document.querySelector(this.config.pagination) : this.config.pagination
        this.slidesToShow = this.config.slidesToShow
        this.slidesToScroll = this.config.slidesToScroll
        
        if (typeof this.config.element === 'string') {
            this.baseClass = this.config.element.substr(1)
        } else {
            if (this.config.element.className.includes(' ')) {
                this.baseClass = this.config.element.className.split(' ')[0]
            } else {
                this.baseClass = this.config.element.className
            }
        }

        const events = ['resize', 'touchstartHandler', 'touchendHandler', 'touchmoveHandler', 'mousedownHandler', 'mouseupHandler', 'mouseleaveHandler', 'mousemoveHandler', 'keyDown', 'clickHandler']

        if (this.element === null) {
            // console.error('Something wrong with your selector 😭')
            return false
        }

        this.element.classList.add('jetslider')
        this.resolveSlidesToShow()
        this.resolveSlidesToScroll()
        
        this.elementWidth = this.element.offsetWidth + this.config.gap
        this.innerElements = [].slice.call(this.element.children)
        this.currentSlideCheck = this.config.startIndex % this.innerElements.length
        this.currentSlide = this.config.loop ?
                            this.config.startIndex % this.innerElements.length :
                            Math.max(0, Math.min(this.config.startIndex, this.innerElements.length - this.slidesToShow))

        events.forEach(method => {
            this[method] = this[method].bind(this)
        })

        this.config.onChange(this.currentSlide + 1, this.innerElements.length)
        this.init()
    }

    /**
     * overrides default settings with custom ones
     * @param {object} options - optional settings object
     * @returns {object} - custom jetslider settings
     */
    static extend(options) {
        const settings = {
            element: '',
            prev: '',
            next: '',
            // direction: 'horizontal',
            speed: 450,
            easing: 'ease',
            // autoAdapt: '',
            slidesToShow: 1,
            slidesToScroll: 1,
            startIndex: 0,
            gap: 0,
            draggable: true,
            multipleDrag: true,
            // momentum: false,
            // weight: 100,
            threshold: 20,
            keyboard: false,
            loop: false,
            rtl: false,
            autoplay: false,
            autoplaySpeed: 5000,
            stopOnOver: true,
            pagination: '',
            onInit: () => {},
            onChange: (current, total) => {},
            onKeyDown: (code) => {},
            onResize: () => {}
        }

        for (const key in options) {
            settings[key] = options[key]
        }

        return settings
    }

    /**
     * attaches listeners to required events.
     */
    attachEvents() {
        window.addEventListener('resize', this.resize)

        if (this.config.draggable) {
            this.pointerDown = false

            this.drag = {
                startX: 0,
                endX: 0,
                startY: 0,
                letItGo: null,
                preventClick: false
            }

            this.element.addEventListener('touchstart', this.touchstartHandler, {passive: true})
            this.element.addEventListener('touchend', this.touchendHandler)
            this.element.addEventListener('touchmove', this.touchmoveHandler, {passive: true})
            this.element.addEventListener('mousedown', this.mousedownHandler)
            this.element.addEventListener('mouseup', this.mouseupHandler)
            this.element.addEventListener('mouseleave', this.mouseleaveHandler)
            this.element.addEventListener('mousemove', this.mousemoveHandler)
            this.element.addEventListener('click', this.clickHandler)
        }

        if (this.config.keyboard) {
            this.element.tabIndex = '0'
            this.element.focus()
            this.element.addEventListener('keydown', this.keyDown)
        }

        if (this.config.autoplay && this.config.stopOnOver) {
            this.element.addEventListener('mouseover', this.stopAutoplay.bind(this))
            this.element.addEventListener('mouseout', this.restartAutoplay.bind(this))
        }

        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prev(this.slidesToScroll)
            })
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.next(this.slidesToScroll)
            })
        }
    }

    /**
     * detaches listeners from required events
     */
    detachEvents() {
        window.removeEventListener('resize', this.resize)
        this.element.removeEventListener('touchstart', this.touchstartHandler, {passive: true})
        this.element.removeEventListener('touchend', this.touchendHandler)
        this.element.removeEventListener('touchmove', this.touchmoveHandler, {passive: true})
        this.element.removeEventListener('mousedown', this.mousedownHandler)
        this.element.removeEventListener('mouseup', this.mouseupHandler)
        this.element.removeEventListener('mouseleave', this.mouseleaveHandler)
        this.element.removeEventListener('mousemove', this.mousemoveHandler)
        this.element.removeEventListener('click', this.clickHandler)

        if (this.config.keyboard) {
            this.element.removeEventListener('keydown', this.keyDown)
        }

        if (this.config.autoplay && this.config.stopOnOver) {
            this.element.removeEventListener('mouseover', this.stopAutoplay.bind(this))
            this.element.removeEventListener('mouseout', this.restartAutoplay.bind(this))
        }

        if (this.prevBtn) {
            this.prevBtn.removeEventListener('click', () => {
                this.prev(this.slidesToScroll)
            })
        }

        if (this.nextBtn) {
            this.nextBtn.removeEventListener('click', () => {
                this.next(this.slidesToScroll)
            })
        }
    }

    /**
     * add dots
     */
    addDots() {
        this.pagination.classList.add('jetslider__pagination', `${this.baseClass}__pagination`)
        const dotsLength = Math.ceil(this.innerElements.length / this.slidesToScroll)

        this.pagination.innerHTML = ''

        for (let i = 0; i < dotsLength; i++) {
            let item = document.createElement('li')
            let bullet = document.createElement('button')

            item.classList.add('jetslider__pagination-item', `${this.baseClass}__pagination-item`)
            bullet.classList.add('jetslider__bullet', `${this.baseClass}__bullet`)

            if (i === 0) {
                bullet.dataset.jetsliderBullet = i
            } else {
                bullet.dataset.jetsliderBullet = i * this.slidesToScroll
            }

            bullet.addEventListener('click', (e) => {
                this.goTo(e.target.dataset.jetsliderBullet)
            })

            item.appendChild(bullet)
            this.pagination.appendChild(item)
        }
    }

    /**
     * update pagination
     */
    updateDots() {
        let dots = this.pagination.querySelectorAll('li')
        let item = this.element.querySelector(`.${this.baseClass}__item--active`)
        
        if (!item) {
            this.innerElements[0].classList.add('jetslider__item--active', `${this.baseClass}__item--active`)
            item = this.element.querySelector(`.${this.baseClass}__item--active`)
        }

        dots.forEach((dot, i) => {
            let addOrRemove = Number(item.dataset.jetsliderPage) === i ? 'add' : 'remove'
            
            dot.querySelector('button').classList[addOrRemove]('jetslider__bullet--active', `${this.baseClass}__bullet--active`)
        })
    }

    /**
     * starts autoplay
     */
    startAutoplay() {
        this.autoplayIntervalInstace = setInterval(() => {
            if (!this.pointerDown) {
                this.next(this.slidesToScroll)
            }
        }, this.config.autoplaySpeed)
    }

    /**
     * stops autoplay
     */
    stopAutoplay() {
        clearInterval(this.autoplayIntervalInstace)
    }

    /**
     * restarts autoplay counter
     */
    restartAutoplay() {
        this.stopAutoplay()

        // if (this.config.loop && this.config.autoplay) {
        if (this.config.autoplay) {
            this.startAutoplay()
        }
    }

    /**
     * builds the markup and attaches listeners to required events
     */
    init() {
        this.attachEvents()

        this.element.style.overflow = 'hidden'
        this.element.style.direction = this.config.rtl ? 'rtl' : 'ltr'

        this.createContainer()
        this.updateItens()

        if (this.config.autoplay) {
            this.startAutoplay()
        }

        if (this.pagination) {
            this.addDots()
            this.updateDots()

            this.pagination.classList.toggle('jetslider__pagination--disabled', this.innerElements.length <= this.slidesToShow)
        }

        this.config.onInit.call(this)
        // window.onload = this.resize()

        const intersectionObserver = new IntersectionObserver(this.resize)

        intersectionObserver.observe(this.element)
        // intersectionObserver.disconnect()
    }    

    /**
     * build a sliderFrame and slide to a current item
     */
    createContainer() {
        const widthItem = this.elementWidth / this.slidesToShow
        const itemsToBuild = this.config.loop ? this.innerElements.length + (2 * this.slidesToShow) : this.innerElements.length
        let page = 0

        this.sliderFrame = document.createElement('div')
        this.sliderFrame.classList.add('jetslider__container', `${this.baseClass}__container`)
        this.sliderFrame.style.width = `${widthItem * itemsToBuild}px`
        this.sliderFrame.style.height = '100%'
        this.sliderFrame.style.display = 'inline-block'
        this.enableTransition()

        if (this.config.draggable) {
            this.element.style.cursor = '-webkit-grab'
        }

        const docFragment = document.createDocumentFragment()

        if (this.config.loop && this.innerElements.length > this.slidesToShow) {
            for (let i = this.innerElements.length - this.slidesToShow; i < this.innerElements.length; i++) {
                const element = this.createItem(this.innerElements[i].cloneNode(true))
                const numberPages = Math.ceil(this.innerElements.length / this.slidesToScroll)

                element.setAttribute('data-jetslider-page', numberPages - 1)
                docFragment.appendChild(element)
            }
        }

        for (let i = 0; i < this.innerElements.length; i++) {
            const element = this.createItem(this.innerElements[i])

            if (i % this.slidesToShow == 0 && i !== 0) {
                page++
            }

            element.setAttribute('data-jetslider-page', page)
            docFragment.appendChild(element)
        }

        if (this.config.loop && this.innerElements.length > this.slidesToShow) {
            for (let i = 0; i < this.slidesToShow; i++) {
                const element = this.createItem(this.innerElements[i].cloneNode(true))

                element.setAttribute('data-jetslider-page', 0)
                docFragment.appendChild(element)
            }
        }

        this.sliderFrame.appendChild(docFragment)
        this.element.innerHTML = ''
        this.element.appendChild(this.sliderFrame)
        this.slideToCurrent()
    }

    /**
     * build the slides
     */
    createItem(el) {
        const item = document.createElement('div')
        const itemWidth = `${this.config.loop ? 100 / (this.innerElements.length + (this.slidesToShow * 2)) : 100 / (this.innerElements.length)}%`
        
        item.classList.add('jetslider__item', `${this.baseClass}__item`)
        item.style.cssFloat = this.config.rtl ? 'right' : 'left'
        item.style.float = this.config.rtl ? 'right' : 'left'
        item.style.marginRight = `${this.config.gap}px`
        item.style.width = `calc(${itemWidth} - ${this.config.gap}px)`
        item.appendChild(el)

        return item
    }

    /**
     * determinates slides to show number accordingly to viewport
     */
    resolveSlidesToShow() {
        if (typeof this.config.slidesToShow === 'number') {
            this.slidesToShow = this.config.slidesToShow
        } else if (typeof this.config.slidesToShow === 'object') {
            this.slidesToShow = 1

            for (const viewport in this.config.slidesToShow) {
                if (document.documentElement.clientWidth >= viewport) {
                    this.slidesToShow = this.config.slidesToShow[viewport]
                }
            }
        }
    }

    /**
     * determinates slides to scroll number accordingly to viewport
     */
    resolveSlidesToScroll() {
        if (typeof this.config.slidesToScroll === 'number') {
            this.slidesToScroll = this.config.slidesToScroll
        } else if (typeof this.config.slidesToScroll === 'object') {
            this.slidesToScroll = 1

            for (const viewport in this.config.slidesToScroll) {
                // if (window.innerWidth >= viewport) {
                if (document.documentElement.clientWidth >= viewport) {
                    this.slidesToScroll = this.config.slidesToScroll[viewport]
                }
            }
        }
    }

    /**
     * go to previous slide
     * @param {number} [howManySlides=1] - how many items to slide backward
     * @param {function} callback - optional callback function
     */
    prev(howManySlides = 1, callback) {
        if (this.innerElements.length <= this.slidesToShow) {
            return
        }

        this.restartAutoplay()

        const beforeChange = this.currentSlide

        if (this.config.loop) {
            const isNewIndexClone = this.currentSlide - howManySlides < 0

            if (isNewIndexClone) {
                this.disableTransition()

                const mirrorSlideIndex = this.currentSlide + this.innerElements.length
                const mirrorSlideIndexOffset = this.slidesToShow
                const moveTo = mirrorSlideIndex + mirrorSlideIndexOffset
                const offset = (this.config.rtl ? 1 : -1) * moveTo * (this.elementWidth / this.slidesToShow)
                const dragDistance = this.config.draggable ? this.drag.endX - this.drag.startX : 0

                this.sliderFrame.style.transform = `translate3d(${offset + dragDistance}px, 0, 0)`
                this.currentSlide = mirrorSlideIndex - howManySlides
            } else {
                this.currentSlide = this.currentSlide - howManySlides
            }
        } else {
            this.currentSlide = Math.max(this.currentSlide - howManySlides, 0)
        }

        this.currentSlideCheck = this.currentSlide

        if (beforeChange !== this.currentSlide) {
            this.slideToCurrent(this.config.loop)
            this.updateItens()

            if (this.config.pagination) {
                this.updateDots()
            }

            this.config.onChange(this.currentSlide + 1, this.innerElements.length)

            if (callback) {
                callback.call(this)
            }
        }
    }

    /**
     * go to next slide
     * @param {number} [howManySlides=1] - how many items to slide forward
     * @param {function} callback - optional callback function
     */
    next(howManySlides = 1, callback) {
        if (this.innerElements.length <= this.slidesToShow) {
            return
        }

        this.restartAutoplay()

        const beforeChange = this.currentSlide
        
        if (this.config.loop) {
            const isNewIndexClone = this.currentSlide + howManySlides > this.innerElements.length - this.slidesToShow

            if (isNewIndexClone) {
                this.disableTransition()

                const mirrorSlideIndex = this.currentSlide - this.innerElements.length
                const mirrorSlideIndexOffset = this.slidesToShow
                const moveTo = mirrorSlideIndex + mirrorSlideIndexOffset
                const offset = (this.config.rtl ? 1 : -1) * moveTo * (this.elementWidth / this.slidesToShow)
                const dragDistance = this.config.draggable ? this.drag.endX - this.drag.startX : 0

                this.sliderFrame.style.transform = `translate3d(${offset + dragDistance}px, 0, 0)`
                this.currentSlide = mirrorSlideIndex + howManySlides
            } else {
                this.currentSlide = this.currentSlide + howManySlides
            }
        } else {
            this.currentSlide = Math.min(this.currentSlide + howManySlides, this.innerElements.length - this.slidesToShow)
        }

        this.currentSlideCheck = this.currentSlide

        if (beforeChange !== this.currentSlide) {
            this.slideToCurrent(this.config.loop)
            this.updateItens()

            if (this.config.pagination) {
                this.updateDots()
            }

            this.config.onChange(this.currentSlide + 1, this.innerElements.length)

            if (callback) {
                callback.call(this)
            }
        }
    }

    /**
     * disable transition on sliderframe
     */
    disableTransition() {
        this.sliderFrame.style.transition = `transform 0ms ${this.config.easing}`
    }

    /**
     * enable transition on sliderframe
     */
    enableTransition() {
        this.sliderFrame.style.transition = `transform ${this.config.speed}ms ${this.config.easing}`
    }

    /**
     * go to slide with particular index
     * @param {number} index - item index to slide to
     * @param {function} callback - optional callback function
     */
    goTo(index, callback) {
        if (this.innerElements.length <= this.slidesToShow) {
            return
        }

        this.restartAutoplay()

        const beforeChange = this.currentSlide

        this.currentSlide = this.config.loop ?
            index % this.innerElements.length :
            Math.min(Math.max(index, 0), this.innerElements.length - this.slidesToShow)

        this.currentSlideCheck = index % this.innerElements.length
        this.updateItens()

        if (beforeChange !== this.currentSlide) {
            this.slideToCurrent()
            // this.updateItens()

            if (this.config.pagination) {
                this.updateDots()
            }

            this.config.onChange(this.currentSlide + 1, this.innerElements.length)

            if (callback) {
                callback.call(this)
            }
        }

        // this.updateItens()
    }

    /**
     * update slide itens
     */
    updateItens() {
        let itens = document.querySelectorAll(`.${this.baseClass}__item`)
        let current = this.currentSlideCheck

        if (this.config.loop && itens.length > this.slidesToShow) {
            current = current + this.slidesToShow
        }
        
        itens.forEach((item, i) => {
            let addOrRemove = current === i ? 'add' : 'remove'

            item.classList[addOrRemove]('jetslider__item--active', `${this.baseClass}__item--active`)
        })
    }

    /**
     * moves sliders frame to position of currently active slide
     */
    slideToCurrent(enableTransition) {
        const currentSlide = this.config.loop ? this.currentSlide + this.slidesToShow : this.currentSlide
        const offset = (this.config.rtl ? 1 : -1) * currentSlide * (this.elementWidth / this.slidesToShow)

        if (this.innerElements.length > this.slidesToShow) {
            if (enableTransition) {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        this.enableTransition()
                        this.sliderFrame.style.transform = `translate3d(${offset}px, 0, 0)`
                    })
                })
            } else {
                this.sliderFrame.style.transform = `translate3d(${offset}px, 0, 0)`
            }
        } else {
            this.sliderFrame.style.transform = `translate3d(0, 0, 0)`
        }
    }

    /**
     * recalculate drag /swipe event and reposition the frame of a slider
     */
    updateAfterDrag() {
        const movement = (this.config.rtl ? -1 : 1) * (this.drag.endX - this.drag.startX)
        const movementDistance = Math.abs(movement)
        const howManySliderToSlide = this.config.multipleDrag ? Math.ceil(movementDistance / (this.elementWidth / this.slidesToShow)) : 1
        const slideToNegativeClone = movement > 0 && this.currentSlide - howManySliderToSlide < 0
        const slideToPositiveClone = movement < 0 && this.currentSlide + howManySliderToSlide > this.innerElements.length - this.slidesToShow

        this.restartAutoplay()
        
        if (movement > 0 && movementDistance > this.config.threshold && this.innerElements.length > this.slidesToShow) {
            this.prev(howManySliderToSlide)
        } else if (movement < 0 && movementDistance > this.config.threshold && this.innerElements.length > this.slidesToShow) {
            this.next(howManySliderToSlide)
        }

        this.slideToCurrent(slideToNegativeClone || slideToPositiveClone)
    }

    /**
     * when window resizes, resize slider components as well
     */
    resize() {
        // this.innerElements = this.element.querySelectorAll('.jetslider__item')
        this.resolveSlidesToShow()
        this.resolveSlidesToScroll()

        if (this.currentSlide + this.slidesToShow > this.innerElements.length) {
            this.currentSlide = this.innerElements.length <= this.slidesToShow ? 0 : this.innerElements.length - this.slidesToShow
            this.currentSlideCheck = this.currentSlide
        }

        this.elementWidth = this.element.offsetWidth + this.config.gap

        const widthItem = this.elementWidth / this.slidesToShow
        const itemsToBuild = this.config.loop ? this.innerElements.length + (2 * this.slidesToShow) : this.innerElements.length

        this.createContainer()

        // this.element.querySelector('.jetslider__container').style.width = `${widthItem * itemsToBuild}px`
        this.slideToCurrent()
        this.updateItens()

        if (this.pagination) {
            this.addDots()
            this.updateDots()

            this.pagination.classList.toggle('jetslider__pagination--disabled', this.innerElements.length <= this.slidesToShow)
        }

        this.config.onResize.call(this)
    }

    /**
     * clear drag after touchend and mouseup event
     */
    clearDrag() {
        this.drag = {
            startX: 0,
            endX: 0,
            startY: 0,
            letItGo: null,
            preventClick: this.drag.preventClick
        }
    }

    /**
     * touchstart event handler
     */
    touchstartHandler(e) {
        const ignore = ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(e.target.nodeName) !== -1

        if (ignore) {
            return
        }

        e.stopPropagation()
        this.pointerDown = true
        this.drag.startX = e.touches[0].pageX
        this.drag.startY = e.touches[0].pageY
    }

    /**
     * touchend event handler
     */
    touchendHandler(e) {
        e.stopPropagation()
        this.pointerDown = false
        this.enableTransition()

        if (this.drag.endX) {
            this.updateAfterDrag()
        }

        this.clearDrag()
    }

    /**
     * touchmove event handler
     */
    touchmoveHandler(e) {
        e.stopPropagation()

        if (this.drag.letItGo === null) {
            this.drag.letItGo = Math.abs(this.drag.startY - e.touches[0].pageY) < Math.abs(this.drag.startX - e.touches[0].pageX)
        }

        if (this.pointerDown && this.drag.letItGo) {
            e.preventDefault()
            this.drag.endX = e.touches[0].pageX
            this.sliderFrame.style.transition = `transform 0ms ${this.config.easing}`

            if (this.innerElements.length > this.slidesToShow) {
                const currentSlide = this.config.loop ? this.currentSlide + this.slidesToShow : this.currentSlide
                const currentOffset = currentSlide * (this.elementWidth / this.slidesToShow)
                const dragOffset = (this.drag.endX - this.drag.startX)
                const offset = this.config.rtl ? currentOffset + dragOffset : currentOffset - dragOffset
                this.sliderFrame.style.transform = `translate3d(${(this.config.rtl ? 1 : -1) * offset}px, 0, 0)`
            } else {
                this.sliderFrame.style.transform = '(0, 0, 0)'
            }
        }
    }

    /**
     * mousedown event handler
     */
    mousedownHandler(e) {
        const ignore = ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(e.target.nodeName) !== -1

        if (ignore) {
            return
        }

        e.preventDefault()
        e.stopPropagation()
        this.pointerDown = true
        this.drag.startX = e.pageX
        
        
    }

    /**
     * mouseup event handler
     */
    mouseupHandler(e) {
        e.stopPropagation()
        this.pointerDown = false
        this.element.style.cursor = '-webkit-grab'

        this.innerElements.forEach(item => {
            item.style.pointerEvents = ''
        })

        this.enableTransition()

        if (this.drag.endX) {
            this.updateAfterDrag()
        }

        this.clearDrag()
    }

    /**
     * mousemove event handler
     */
    mousemoveHandler(e) {
        e.preventDefault()

        if (this.pointerDown) {
            // if (e.target.nodeName === 'A') {
            // if (this.element.querySelector('a')) {
                this.drag.preventClick = true
            // }

            if (e.pageX !== this.drag.startX) {
                this.innerElements.forEach(item => {
                    item.style.pointerEvents = 'none'
                })
            }

            this.drag.endX = e.pageX
            this.element.style.cursor = '-webkit-grabbing'
            this.sliderFrame.style.transition = `transform 0ms ${this.config.easing}`

            if (this.innerElements.length > this.slidesToShow) {
                const currentSlide = this.config.loop ? this.currentSlide + this.slidesToShow : this.currentSlide
                const currentOffset = currentSlide * (this.elementWidth / this.slidesToShow)
                const dragOffset = (this.drag.endX - this.drag.startX)
                const offset = this.config.rtl ? currentOffset + dragOffset : currentOffset - dragOffset
                this.sliderFrame.style.transform = `translate3d(${(this.config.rtl ? 1 : -1) * offset}px, 0, 0)`
            } else {
                this.sliderFrame.style.transform = 'translate3d(0, 0, 0)'
            }
        }
    }

    /**
     * mouseleave event handler
     */
    mouseleaveHandler(e) {
        if (this.pointerDown) {
            this.pointerDown = false
            this.element.style.cursor = '-webkit-grab'
            this.drag.endX = e.pageX
            this.drag.preventClick = false
            this.enableTransition()
            this.updateAfterDrag()
            this.clearDrag()

            this.innerElements.forEach(item => {
                item.style.pointerEvents = ''
            })
        }
    }

    /**
	 * private function for the input
     * key down event
	 */
    keyDown(event) {
        switch(event.keyCode) {
            case 37:
                this.prev(this.slidesToShow)
                break
            case 39:
                this.next(this.slidesToShow)
                break
        }

        this.config.onKeyDown(event.keyCode)
    }

    /**
     * click event handler
     */
    clickHandler(e) {
        if (this.drag.preventClick) {
            e.preventDefault()
        }

        this.drag.preventClick = false
    }

    /**
     * remove item from slider
     * @param {number} index - item index to remove
     * @param {function} callback - optional callback to call after remove
     */
    remove(index, callback) {
        if (index < 0 || index >= this.innerElements.length) {
            console.error('Item to remove doesn\'t exist 😭')
        }

        const lowerIndex = index < this.currentSlide
        const lastItem = this.currentSlide + this.slidesToShow - 1 === index

        if (lowerIndex || lastItem) {
            this.currentSlide--
        }

        this.innerElements.splice(index, 1)

        this.createContainer()

        if (callback) {
            callback.call(this)
        }
    }

    /**
     * insert item to slider at particular index
     * @param {htmlelement} item - item to insert
     * @param {number} index - index of new new item insertion
     * @param {function} callback - optional callback to call after insert
     */
    insert(item, index, callback) {
        if (index < 0 || index > this.innerElements.length + 1) {
            console.error('Unable to inset it at this index 😭')
        }

        if (this.innerElements.indexOf(item) !== -1) {
            console.error('The same item in a slider? Really? Nope 😭')
        }

        const shouldItShift = index <= this.currentSlide > 0 && this.innerElements.length
        this.currentSlide = shouldItShift ? this.currentSlide + 1 : this.currentSlide
        this.innerElements.splice(index, 0, item)

        this.createContainer()

        if (callback) {
            callback.call(this)
        }
    }

    /**
     * prepend item to slider
     * @param {htmlelement} item - Item to prepend
     * @param {function} callback - Optional callback to call after prepend
     */
    prepend(item, callback) {
        this.insert(item, 0)

        if (callback) {
            callback.call(this)
        }
    }

    /**
     * append item to slider
     * @param {htmlelement} item - item to append
     * @param {function} callback - optional callback to call after append
     */
    append(item, callback) {
        this.insert(item, this.innerElements.length + 1)

        if (callback) {
            callback.call(this)
        }
    }

    /**
     * removes listeners and optionally restores to initial markup
     * @param {boolean} restoreMarkup - determinants about restoring an initial markup
     * @param {function} callback - optional callback function
     */
    destroy(restoreMarkup = false, callback) {
        this.detachEvents()

        this.element.style.cursor = 'auto'

        if (restoreMarkup) {
            const slides = document.createDocumentFragment()
            
            this.innerElements.forEach((element) => {
                slides.appendChild(element)
            })

            this.element.innerHTML = ''
            this.element.appendChild(slides)
            this.element.removeAttribute('style')
        }

        if (callback) {
            callback.call(this)
        }
    }

}