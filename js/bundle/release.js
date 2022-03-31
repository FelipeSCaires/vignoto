class Release {

    /**
     * create release
     */
    constructor() {
        this.init()
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
        this.pagination()
    }
}