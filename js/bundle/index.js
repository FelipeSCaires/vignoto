
class Index {

    /**
     * create a home
     */
  

    constructor() {
        this.init()
    }
    
    /**
	 * create banner slider
	 */
         banner() {
            return new JetSlider({
                element: '.banner__box',
                prev: '.banner__prev',
                next: '.banner__next',
                speed: 650,
                gap: 30,
                momentum: true,
                weight: 100,
                loop: false,
                autoplay: false,
                autoplaySpeed: 5000,
                stopOnOver: true,
                pagination: '.banner__box__pagination'
            })
        }
  

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
     * header modal
     */
    openModal(){
        let modal = document.querySelector('.header__modal--contact')
        let buttonArrow = document.querySelector('#teste')
        buttonArrow.addEventListener('click', ()=>{
            modal.classList.toggle('display')
            buttonArrow.classList.toggle('rotate')
        })
    }

   

    /**
	 * initialize instance
	 */

    init() {

        new SearchIndex
        this.banner()
        this.offer()
        this.openModal()
    
    }

}

