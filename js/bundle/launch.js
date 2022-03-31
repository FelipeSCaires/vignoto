class Launch {

    /**
     * create a card
     */
    constructor() {
        this.panorama
        this.map
        this.photoCounter = document.querySelector('.launch__photo-counter')
        this.videoCounter = document.querySelector('.launch__video-counter')
        this.init()
    }

    /**
	 * create the slider
	 */
    photoGallery() {
        this.photo = new JetSlider({
            element: '.launch__photo',
            prev: '.launch__photo-prev',
            next: '.launch__photo-next',
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 650,
            gap: 30,
            momentum: true,
            weight: 100,
            loop: true,
            onChange: (current) => {
                this.photoCounter.innerHTML = current

                if (this.photoThumb) {
                    this.photoThumb.goTo(current - 1)
                }
            }
        })
    }

    /**
    * create the slider
    */
    videoGallery() {
        this.video = new JetSlider({
            element: '.launch__video',
            prev: '.launch__video-prev',
            next: '.launch__video-next',
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 650,
            gap: 30,
            momentum: true,
            weight: 100,
            loop: true,
            onChange: (current) => {
                this.videoCounter.innerHTML = current

                if (this.videoThumb) {
                    this.videoThumb.goTo(current - 1)
                }
            }
        })
    }

    /**
	 * create the slider
	 */
    photoGalleryThumb() {
        this.photoThumb = new JetSlider({
            element: '.launch__photo-thumb',
            prev: '.launch__photo-thumb-prev',
            next: '.launch__photo-thumb-next',
            slidesToShow: {
                568: 3,
                821: 5,
                1081: 7,
                1341: 9,
                1601: 12
            },
            slidesToScroll: {
                568: 1
            },
            speed: 650,
            gap: 30,
            momentum: true,
            weight: 100,
            onResize: () => this.photoThumbClick(),
            onComplete: () => this.photoThumbClick()
        })
    }

    /**
	 * create the slider
	 */
    videoGalleryThumb() {
        this.videoThumb = new JetSlider({
            element: '.launch__video-thumb',
            prev: '.launch__video-thumb-prev',
            next: '.launch__video-thumb-next',
            slidesToShow: {
                568: 3,
                821: 5,
                1081: 7,
                1341: 9,
                1601: 12
            },
            slidesToScroll: {
                568: 1
            },
            speed: 650,
            gap: 30,
            momentum: true,
            weight: 100,
            onResize: () => this.videoThumbClick(),
            onComplete: () =>  this.videoThumbClick()
        })
    }

    /**
	 * thumb click event
	 */
    photoThumbClick() {
        const thumbs = document.querySelectorAll('.launch__photo-thumb__item')

        thumbs.forEach((thumb, i) => {
            thumb.addEventListener('click', () => {
                this.photo.goTo(i)
                this.photoThumb.goTo(i)
            })
        })
    }

    /**
	 * thumb click event
	 */
    videoThumbClick() {
        const thumbs = document.querySelectorAll('.launch__video-thumb__item')

        thumbs.forEach((thumb, i) => {
            thumb.addEventListener('click', () => {
                this.video.goTo(i)
                this.videoThumb.goTo(i)
            })
        })
    }

    /**
	 * create the slider
	 */
    expandBtn() {
        const btns = document.querySelectorAll('.launch__gallery-expand')

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                setTimeout(() => {
                    this.photo.resize()
                    this.photoThumb.resize()
                })
            })
        });
    }

    /**
	 * photo events
	 */
    photoBtn() {
        const photoBtn = document.querySelector('.launch__gallery-photo')
        const videoBtn = document.querySelector('.launch__gallery-video')
        const photo = document.querySelector('.launch__photo-box')
        const video = document.querySelector('.launch__video-box')
        const photoThumb = document.querySelector('.launch__photo-thumb-box')
        const videoThumb = document.querySelector('.launch__video-thumb-box')

        if (photoBtn) {
            photoBtn.classList.add('active')
        }

        if (photoBtn) {
            photoBtn.addEventListener('click', () => {
                if (photoBtn) {
                    photoBtn.classList.add('active')
                }

                if (videoBtn) {
                    videoBtn.classList.remove('active')
                }

                photo.classList.remove('active')
                video.classList.remove('active')
                photoThumb.classList.remove('active')
                videoThumb.classList.remove('active')
            })
        }
    }

    /**
	 * video events
	 */
    videoBtn() {
        const photoBtn = document.querySelector('.launch__gallery-photo')
        const videoBtn = document.querySelector('.launch__gallery-video')
        const photo = document.querySelector('.launch__photo-box')
        const video = document.querySelector('.launch__video-box')
        const photoThumb = document.querySelector('.launch__photo-thumb-box')
        const videoThumb = document.querySelector('.launch__video-thumb-box')

        if (videoBtn) {
            videoBtn.addEventListener('click', () => {
                if (photoBtn) {
                    photoBtn.classList.remove('active')
                }

                if (videoBtn) {
                    videoBtn.classList.add('active')
                }

                photo.classList.add('active')
                video.classList.add('active')
                photoThumb.classList.add('active')
                videoThumb.classList.add('active')
            })
        }
    }

    /**
	 * create the slider
	 */
    unity() {
        return new JetSlider({
            element: '.unity',
            prev: '.unity__prev',
            next: '.unity__next',
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
            momentum: true,
            weight: 100,
            loop: false,
            autoplay: false,
            autoplaySpeed: 5000,
            stopOnOver: true,
            pagination: '.unity__pagination'
        })
    }

    /**
     * create the slider
     */
    img() {
        const cards = document.querySelectorAll('.unity__hover')
        cards.forEach(card => {

            const slider = card.querySelector('.unity__box')
            if (slider && slider.children.length > 0) {

                const prev = card.querySelector('.unity__photo-prev')
                const next = card.querySelector('.unity__photo-next')
                const bullets = card.querySelector('.unity__photo-bullets')

                return new JetSlider({
                    element: slider,
                    speed: 650,
                    draggable: false,
                    prev: prev,
                    next: next,
                    pagination: bullets
                })
            }
        })
    }

    /**
	 * initialize instance
	 */
    init() {
        window.scrollTo(0, 0)
        this.photoGallery()
        this.videoGallery()
        this.photoGalleryThumb()
        this.videoGalleryThumb()
        this.expandBtn()
        this.photoBtn()
        this.videoBtn()
        this.unity()
        this.img()
    }

}