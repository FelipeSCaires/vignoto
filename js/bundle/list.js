class List {

    /**
     * create a list
     */
    constructor() {
        this.init()
    }

    /**
	 * search field
	 */
    search() {
        const buyBtn = document.querySelector('.search-list__type-option:first-of-type .search-list__type-item')
        const rentBtn = document.querySelector('.search-list__type-option:last-of-type .search-list__type-item')

        const buildingBtns = document.querySelectorAll('.search-list__construction')
        const referenceBtns = document.querySelectorAll('.search-list__code')

        const field = document.querySelector('.search-list__field')
        const building =  document.querySelector('.search-list__building')
        const reference =  document.querySelector('.search-list__reference')

        buyBtn.addEventListener('click', () => {
            buyBtn.classList.add('search-list__type-item--active')
            rentBtn.classList.remove('search-list__type-item--active')

            buildingBtns.forEach(buildingBtn => {
                buildingBtn.classList.remove('active')
            });

            referenceBtns.forEach(referenceBtn => {
                referenceBtn.classList.remove('active')
            });

            building.classList.remove('active')
            reference.classList.remove('active')

            setTimeout(() => {
                field.style.display = 'block'

                building.style.display = 'none'
                reference.style.display = 'none'

                setTimeout(() => {
                    field.classList.remove('active')
                }, 30);
            }, 300);
        })

        rentBtn.addEventListener('click', () => {
            buyBtn.classList.remove('search-list__type-item--active')
            rentBtn.classList.add('search-list__type-item--active')

            buildingBtns.forEach(buildingBtn => {
                buildingBtn.classList.remove('active')
            });

            referenceBtns.forEach(referenceBtn => {
                referenceBtn.classList.remove('active')
            });

            building.classList.remove('active')
            reference.classList.remove('active')

            setTimeout(() => {
                field.style.display = 'block'

                building.style.display = 'none'
                reference.style.display = 'none'

                setTimeout(() => {
                    field.classList.remove('active')
                }, 30);
            }, 300);
        })

        buildingBtns.forEach(buildingBtn => {
            buildingBtn.addEventListener('click', () => {
                buyBtn.classList.remove('search-list__type-item--active')
                rentBtn.classList.remove('search-list__type-item--active')

                buildingBtns.forEach(buildingBtn => {
                    buildingBtn.classList.add('active')
                });

                referenceBtns.forEach(referenceBtn => {
                    referenceBtn.classList.remove('active')
                });

                field.classList.add('active')
                reference.classList.remove('active')

                setTimeout(() => {
                    field.style.display = 'none'

                    building.style.display = 'block'
                    reference.style.display = 'none'

                    setTimeout(() => {
                        building.classList.add('active')
                    }, 30);
                }, 300);
            })
        });

        referenceBtns.forEach(referenceBtn => {
            referenceBtn.addEventListener('click', () => {
                buyBtn.classList.remove('search-list__type-item--active')
                rentBtn.classList.remove('search-list__type-item--active')

                buildingBtns.forEach(buildingBtn => {
                    buildingBtn.classList.remove('active')
                });

                referenceBtns.forEach(referenceBtn => {
                    referenceBtn.classList.add('active')
                });

                field.classList.add('active')
                building.classList.remove('active')

                setTimeout(() => {
                    field.style.display = 'none'

                    building.style.display = 'none'
                    reference.style.display = 'block'

                    setTimeout(() => {
                        reference.classList.add('active')
                    }, 30);
                }, 300);
            })
        });
    }

    /**
	 * arrange list
	 */
    arrange() {
        if (window.screen.width > 1080) {
            const cards = document.querySelectorAll('.list__card')
            const list = document.querySelector('.list__list')
            const grid = document.querySelector('.list__grid')

            if (cards) {
                cards.forEach(card => {
                    card.classList.add('active')
                });
            }

            if (list) {
                list.classList.add('active')

                list.addEventListener('click', () => {
                    cards.forEach(card => {
                        card.classList.add('active')
                    });

                    list.classList.add('active')
                    grid.classList.remove('active')
                })
            }

            if (grid) {
                grid.addEventListener('click', () => {
                    cards.forEach(card => {
                        card.classList.remove('active')
                    });

                    list.classList.remove('active')
                    grid.classList.add('active')
                })
            }
        }
    }

    /**
	 * pagination
	 */
    pagination() {
        const container = document.querySelector('.jetpagination')

        if (container) {
            const pagination = new JetPagination({
                container: '.list__pagination',
                previous: '.list__previous-btn',
                next: '.list__next-btn',
                active: sessionStorage.getItem('pagina'),
                total: container.dataset.total,
                left: {'567': 2, '0': 1},
                right: {'567': 2, '0': 1},
                onInit: () => window.scrollTo({'behavior': 'smooth', 'top': 0}),
                onComplete: () => router.updateLinks()
            })
        }
    }

    /**
	 * search filter
	 */
    filter() {
        const message = document.querySelector('#mensagem')
        let text = 'Olá estou procurando meu imóvel e não encontrei. Desejo um imóvel com as seguintes características: '

        if (sessionStorage.getItem('filtro.tiposimoveis')) {
            text +=  sessionStorage.getItem('filtro.tiposimoveis') + ' '
        }

        if (sessionStorage.getItem('filtro.tiposimoveis') && sessionStorage.getItem('filtro.cidade')) {
            text +=  'em ' + sessionStorage.getItem('filtro.cidade') + ' '
        } else if (sessionStorage.getItem('filtro.cidade')) {
            text +=  'imóvel em ' + sessionStorage.getItem('filtro.cidade') + ' '
        }

        if (sessionStorage.getItem('filtro.tiposimoveis') && sessionStorage.getItem('filtro.bairro') || sessionStorage.getItem('filtro.cidade') && sessionStorage.getItem('filtro.bairro')) {
            text +=  'no ' + sessionStorage.getItem('filtro.bairro') + ' '
        } else if (sessionStorage.getItem('filtro.bairro')) {
            text +=  'imóvel no ' + sessionStorage.getItem('filtro.bairro') + ' '
        }

        if (sessionStorage.getItem('filtro.tiposimoveis') && sessionStorage.getItem('filtro.tipodivulgacao') || sessionStorage.getItem('filtro.cidade') && sessionStorage.getItem('filtro.tipodivulgacao') || sessionStorage.getItem('filtro.bairro') && sessionStorage.getItem('filtro.tipodivulgacao')) {
            if (sessionStorage.getItem('filtro.tipodivulgacao') === 'v') {
                text +=  'para comprar, '
            } else {
                text +=  'para alugar, '
            }
        } else if (sessionStorage.getItem('filtro.tipodivulgacao') === 'v') {
            text +=  'imóvel para comprar, '
        } else if (sessionStorage.getItem('filtro.tipodivulgacao') === 'l') {
            text +=  'imóvel para alugar, '
        }

        if (sessionStorage.getItem('filtro.quarto')) {
            text +=  'com ' + sessionStorage.getItem('filtro.quarto') + ' quarto(s), '
        }

        if (sessionStorage.getItem('filtro.quartoini')) {
            text +=  'com ' + sessionStorage.getItem('filtro.quartoini') + ' ou mais quarto(s), '
        }

        if (sessionStorage.getItem('filtro.vagagaragem')) {
            let value = sessionStorage.getItem('filtro.vagagaragem')
            if (value > 1) {
                text +=  'com ' + (value - 2) + ' vaga(s), '
            }
        }

        if (sessionStorage.getItem('filtro.vagaini')) {
            let value = sessionStorage.getItem('filtro.vagaini')
            if (value > 1) {
                text +=  'com ' + (value - 2) + ' ou mais vaga(s), '
            }
        }

        if (sessionStorage.getItem('filtro.banheiroini')) {
            text +=  'com ' + sessionStorage.getItem('filtro.banheiroini') + ' ou mais banheiro(s), '
        }

        if (sessionStorage.getItem('filtro.suiteini')) {
            text +=  'com ' + sessionStorage.getItem('filtro.suiteini') + ' ou mais suíte(s), '
        }

        if (sessionStorage.getItem('filtro.areatotalminima')) {
            text +=  'de ' + sessionStorage.getItem('filtro.areatotalminima') + 'm² '
        }

        if (sessionStorage.getItem('filtro.areatotalmaxima')) {
            text +=  'até ' + sessionStorage.getItem('filtro.areatotalmaxima') + 'm², '
        }

        if (sessionStorage.getItem('filtro.valorminimo')) {
            text +=  'de R$ ' + sessionStorage.getItem('filtro.valorminimo') + ' '
        }

        if (sessionStorage.getItem('filtro.valormaximo')) {
            text += 'até R$ ' + sessionStorage.getItem('filtro.valormaximo') + ', '
        }

        text += 'obrigado.'

        if (message) {
            message.innerHTML = text
        }
    }

    /**
	 * initialize instance
	 */
    init() {
        sessionStorage.removeItem('filtro.edificio')
        sessionStorage.removeItem('filtro.referencia')

        router.updateLinks()
        new SearchList
        // this.search()
        this.arrange()
        this.pagination()
        this.filter()
    }

}