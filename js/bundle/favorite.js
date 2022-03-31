class Favorite {

    /**
     * create a favorite
     */
    constructor() {
        this.init()
    }

    /**
	 * create the favorite
	 */
    favorite() {
        const favorite = new JetFavorite({
            form: '.favorite__form',
            pageLink: '.favorite__link',
            favorite: '.favorite__btn',
            deleteAll: '.favorite__delete',
            counter: '.favorite__counter',
            idType: 'cliente',
            id: config.id,
            onInit: () => {},
            onLogin: () => this.login(),
            onNoLogin: () => this.noLogin(),
            onRemove: () => this.remove(),
            onRemoveAll: () => this.removeAll()
        })
    }

    login() {
        const form = document.querySelector('.favorite__form')
        const input = document.querySelector('.favorite__login-input')
        const page = document.querySelector('.favorite')
        const user = sessionStorage.getItem(`favorite-user-${config.id}`)
        const url = `${config.pageFavoritos}?user=${user}`
        const formContent = form.querySelector('.form__content')
        const success = form.querySelector('.form__success')

        formContent.classList.add('form__content--hidden')
        success.classList.add('form__success--active')

        setTimeout(() => {
            input.checked = false
            formContent.classList.remove('form__content--hidden')
            success.classList.remove('form__success--active')
    
            if (page) {
                router.listen(url)
            }
        }, 3000)
    }

    noLogin() {
        const input = document.querySelector('.favorite__login-input')

        input.checked = true
    }

    remove() {
        const page = document.querySelector('.favorite')
        const url = `${config.pageFavoritos}${window.location.search}`

        if (page) {
            router.listen(url)
        }
    }

    removeAll() {
        const deleteInput = document.querySelector('.favorite__delete-input')
        const url = `${config.pageFavoritos}${window.location.search}`
        const content = document.querySelector('.favorite__delete-content')
        const success = document.querySelector('.favorite__delete-success')

        content.classList.add('form__content--hidden')
        success.classList.add('form__success--active')

        setTimeout(() => {
            deleteInput.checked = false
            router.listen(url)
            content.classList.remove('form__content--hidden')
            success.classList.remove('form__success--active')
        }, 3000)
    }

    exit() {
        const button = document.querySelector('.favorite__exit')

        if (button) {
            button.addEventListener('click', this.exitHandler.bind(this))
        }
    }

    exitHandler() {
        sessionStorage.removeItem(`favorite-token-${config.id}`)
        sessionStorage.removeItem(`favorite-user-${config.id}`)
        router.listen(config.pageFavoritos)
    }

    /**
	 * pagination
	 */
    pagination() {
        const container = document.querySelector('.ui__pagination-box')

        if (container) {
            const pagination = new JetPagination({
                container: '.ui__pagination',
                previous: '.ui__pagination-previous',
                next: '.ui__pagination-next',
                active: container.dataset.page,
                total: container.dataset.total,
                left: {'568': 2, '0': 1},
                right: {'568': 2, '0': 1},
                concatenateWith: '/',
                onComplete: () => router.updateLinks()
            })
        }
    }

    /**
	 * initialize instance
	 */
    init() {
        this.favorite()
        this.exit()
        this.pagination()
    }

}