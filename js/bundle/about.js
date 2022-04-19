class About {

    /**
     * create a home
     */
    constructor() {
        this.init()
    }

    /**
	 * create image slider
	 */

    image() {
        return new JetSlider({
            element: '.about-content',
            prev: '.about__prev',
            next: '.about__next',
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 650,
            gap: 30,
            momentum: true,
            weight: 100,
            loop: false,
            autoplay: false,
            autoplaySpeed: 5000,
            stopOnOver: true,
            pagination: '.about__pagination'
        })
    }

    /**
	 * initialize instance
	 */
    init() {
        this.image()
    }

}
