class Card {

    /**
     * create card
     */
    constructor() {
        this.init()
    }

    /**
     * gallery sliders
     */
    gallery() {
        const sliders = document.querySelectorAll('.card__gallery-slider')

        sliders.forEach(slider => {
            const name = slider.classList[1].replace('card__gallery-slider--', '')
            const counter = document.querySelector(`.card__gallery-number--${name}`)

            this[`${name}GallerySlider`] = new JetSlider({
                element: `.card__gallery-slider--${name}`,
                prev: `.card__gallery-prev--${name}`,
                next: `.card__gallery-next--${name}`,
                gap: 10,
                loop: true,
                onChange: current => {
                    counter.innerHTML = current
                }
            })
        })
    }

    /**
	 * expand gallery
	 */
    galleryExpand() {
        if (window.innerWidth > 1080) {
            const galleryExpandBtns = document.querySelectorAll('.card__gallery-options-btn--expand, .card__gallery-close-btn')
            const html = document.querySelector('html')

            galleryExpandBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    html.classList.toggle('expand')
                    this.resizeSliders()
                })
            })

            window.addEventListener('resize', () => {
                if (window.innerWidth < 1081) {
                    html.classList.remove('expand')
                    this.resizeSliders()
                }
            })
        }
    }

    /**
	 * resize gallery
	 */
    resizeSliders() {
        const sliders = document.querySelectorAll('.card__gallery-slider')

        sliders.forEach(slider => {
            const name = slider.classList[1].replace('card__gallery-slider--', '')

            this[`${name}GallerySlider`].resize()
        })
    }

    /**
	 * change gallery
	 */
    galleryChange() {
        const galleryChangeBtns = document.querySelectorAll('button.card__gallery-change-btn')
        const galleryContainer = document.querySelector('.card__gallery-container')

        galleryChangeBtns.forEach(btn => {
            const name = [...btn.classList].filter(str => str.includes('card__gallery-change-btn--'))[0].replace(`card__gallery-change-btn--`, '')

            btn.addEventListener('click', () => {
                if (!galleryContainer.classList.contains(name)) {
                    galleryContainer.classList.remove(galleryContainer.classList[1])
                    galleryContainer.classList.add(name)
                }

                galleryChangeBtns.forEach(btn => btn.classList.remove('card__gallery-change-btn--active'))
                btn.classList.add('card__gallery-change-btn--active')

                if (name === 'map' && !this.map) {
                    const urls = [
                        'css/leaflet.min.css',
                        'js/leaflet.min.js'
                    ]
                    
                    this.loadScript(urls, this.createMap.bind(this))
                }
            })
        })
    }

    /**
	 * inject & load script
	 */
    loadScript(scripts, callback) {
        const promises = scripts.map(url => this.createTag(url))
    
        Promise.all(promises).then(callback)
    }

    createTag(url) {
        return new Promise(resolve => {
            const extension = url.split('.').pop()
            const type = extension === 'js' ? 'script' : 'link'
            const parameter = extension === 'js' ? 'src' : 'href'
            const tag = document.createElement(type)
            const oldTag = document.querySelector(`${type}[${parameter}="${url}"]`)

            oldTag && oldTag.remove()
            tag[parameter] = url

            if (extension === 'css') {
                tag.rel = 'stylesheet'
            }

            document.body.appendChild(tag)
            tag.onload = () => resolve(url)
        })
    }

    createMap() {
        const mapContainer = document.querySelector('#map')
        const mapApi = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
        const latitude = mapContainer.dataset.latitude
        const longitude = mapContainer.dataset.longitude
        this.map = L.map('map').setView([latitude, longitude], 15)

        L.tileLayer(mapApi, {
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(this.map)

        const markerIcon = L.icon({
            iconUrl: 'svg/marker.svg',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        })

        L.marker([latitude, longitude], {icon: markerIcon}).addTo(this.map)
    }

    /**
	 * create the slider
	 */
    similar() {
        return new JetSlider({
            element: '.similar',
            prev: '.similar__pagination-prev',
            next: '.similar__pagination-next',
            slidesToShow: {
                0: 1,
                568: 2,
                821: 3,
                1081: 4
            },
            slidesToScroll: {
                0: 1,
                568: 2,
                821: 3,
                1081: 4
            },
            speed: 650,
            gap: 30,
            loop: false,
            pagination: '.similar__pagination'
        })
    }

    /**
	 * initialize instance
	 */
    init() {
        this.gallery()
        this.galleryExpand()
        this.galleryChange()
        this.similar()
    }

}