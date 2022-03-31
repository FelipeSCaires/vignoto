class Index {

    /**
     * create a home
     */
  

    constructor() {
        this.init()
    }
     /**
     * offer slider
     */
  

    offer() {
        const classNames = [
            '.offer-buy',
            '.offer-rent'
        ]

        classNames.forEach((className) => {
            return new JetSlider({
                element: className,
                prev: `${className}__prev`,
                next: `${className}__next`,
                slidesToShow: {
                    0: 1,
                    568: 2,
                    821: 3
                },
                slidesToScroll: {
                    0: 1,
                    568: 2,
                    821: 3
                },
                speed: 650,
                gap: 30,
                momentum: true,
                weight: 100,
                loop: false,
                autoplay: false,
                autoplaySpeed: 5000,
                stopOnOver: true,
                pagination: `${className}__pagination`
            })
        })
    }

    /**
	 * initialize instance
	 */

    init() {

        new Search
        this.offer()
    }

}

