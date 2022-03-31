class Filters {

    /**
     * create a filters
     */
    constructor(page) {
        this.page = page
    }

    /**
	 * create all filters url
	 */
    filtersUrl(callback) {
        const tipodivulgacao = sessionStorage.getItem('filtro.tipodivulgacao')
        const storageFilters = sessionStorage.getItem(`filters-${tipodivulgacao}`)
        
        if (storageFilters) {
            callback(JSON.parse(storageFilters))
        } else {
            let parameters = config.filters.map(filter => !filter[1] ? `${filter}=true` : '')

            if (parameters[0]) {
                parameters.push({
                    'filtro.tipodivulgacao': tipodivulgacao,
                    [`filtro.${config.tipoCliente}id`]: config.id,
                    'maximo': 999999,
                    'pagina': 1
                })

                this.createUrl(tipodivulgacao, parameters, callback)
            }
        }
    }

    /**
	 * create dynamic filters url
	 */
    dynamicFiltersUrl(callback) {
        const tipodivulgacao = sessionStorage.getItem('filtro.tipodivulgacao')
        const storageFilters = sessionStorage.getItem(`filters-${tipodivulgacao}`)

        if (storageFilters) {
            const obj = JSON.parse(storageFilters)

            this.dynamicsFilters.forEach(filter => delete obj[filter])

            if (tipodivulgacao) {
                sessionStorage.setItem(`filters-${tipodivulgacao}`, JSON.stringify(obj))
            } else {
                sessionStorage.setItem(`filters`, JSON.stringify(obj))
            }
        }

        config.filters.forEach(filter => {
            if (filter[1]) {
                let parameters = []

                let obj = {
                    'filtro.tipodivulgacao': tipodivulgacao,
                    [`filtro.${config.tipoCliente}id`]: config.id,
                    'maximo': 999999,
                    'pagina': 1
                }

                filter[1].forEach(name => {
                    obj[`filtro.${name}`] = sessionStorage.getItem(`filtro.${name}`)
                })

                parameters.push(`${filter[0]}=true`, obj)
                this.createUrl(tipodivulgacao, parameters, callback, true)
            }
        })
    }

    /**
	 * join json
	 */
    createUrl(tipodivulgacao, parameters, callback, dynamic) {
        const search = new JetSearch({
            baseUrl: `${config.filterBaseUrl}?`,
            parameters: parameters,
            joinWith: '=',
            concatenateWith: '&',
            onComplete: url => this.loadFilters(tipodivulgacao, url, callback, dynamic)
        })
    }

    /**
	 * load all filters
	 */
    loadFilters(tipodivulgacao, url, callback, dynamic) {
        this.loader = new JetLoader({
            url: url,
            onSuccess: data => {
                let storageFilters

                if (tipodivulgacao) {
                    storageFilters = sessionStorage.getItem(`filters-${tipodivulgacao}`)
                } else {
                    storageFilters = sessionStorage.getItem(`filters`)
                }

                data = this.joinJson(data.data)

                if (dynamic) {
                    this.dynamicsFilters.push(Object.keys(data)[0])
                }

                if (storageFilters) {
                    // data = {...storage, ...data}
                    data = Object.assign(JSON.parse(storageFilters), data)
                }
                
                if (tipodivulgacao) {
                    sessionStorage.setItem(`filters-${tipodivulgacao}`, JSON.stringify(data))
                } else {
                    sessionStorage.setItem(`filters`, JSON.stringify(data))
                }
                
                if (Object.keys(data).length === config.filters.length) {
                    callback(data)
                }
            }
        })
    }

    /**
	 * join json
	 */
    joinJson(data) {
        let json = {}
        
        for (let key in data) {
            const name = key.toLowerCase()
            
            if (data[key] && data[key].resultado) {
                const value = this.combineJson(data[key].resultado)

                json[name] = value
            }
        }

        return json
    }

    /**
	 * combine json
	 */
    combineJson(data) {
        let json = {}
        
        data.forEach(obj => {
            for (let key in obj) {
                if (!json[key]) {
                    json[key] = []
                }
                
                json[key].push(obj[key])
            }
        })
        
        return json
    }

    /**
	 * update filter
	 */
    createFilters(callback) {
        const tipodivulgacao = sessionStorage.getItem('filtro.tipodivulgacao')
        const storageFilters = JSON.parse(sessionStorage.getItem(`filters-${tipodivulgacao}`))
        this.dynamicsFilters = []

        if (storageFilters && Object.keys(storageFilters).length !== config.filters.length) {
            sessionStorage.removeItem(`filters-${tipodivulgacao}`)
        }
        
        if (this.loader) {
            this.loader.abort()
        }

        this.filtersUrl(callback)
        this.dynamicFiltersUrl(callback)
    }

    /**
	 * check filter
	 */
    checkFilter(name) {
        let filter = sessionStorage.getItem(name)

        if (filter) {
            if (name === 'filtro.tipodivulgacao') {
                if (filter === 'a') {
                    filter = 'comprar alugar'
                } else if (filter === 'v') {
                    filter = 'comprar'
                } else if (filter === 'l') {
                    filter = 'alugar'
                } else {
                    filter = 'temporada'
                }
            } else if (name === 'filtro.vagagaragem' || name === 'filtro.vagaini') {
                    filter = filter - 2
            } else if (name === 'filtro.finalidade') {
                if (filter === 'r') {
                    filter = 'residenciais'
                } else if (filter === 'c') {
                    filter = 'comerciais'
                } else {
                    filter = 'ambos'
                }
            } else if (name === 'filtro.mobiliado') {
                if (filter) {
                    filter = 'mobiliado'
                }
            } else if (name === 'filtro.condominio') {
                if (filter) {
                    return filter = 'em condominio'
                }
            } else if (name === 'filtro.cobertura') {
                if (filter) {
                    filter = 'cobertura'
                }
            }
        } else {
            filter = ''
        }

        return filter
    }

    /**
	 * create path
	 */
    createPath(search) {
        return new JetSearch({
            button: '.search__btn',
            baseUrl: `${this.page}/`,
            concatenateWith: '-',
            parameters: [
                sessionStorage.getItem('filtro.tiposimoveis'),
                this.checkFilter('filtro.finalidade'),
                this.checkFilter('filtro.mobiliado'),
                this.checkFilter('filtro.condominio'),
                this.checkFilter('filtro.cobertura'),
                this.checkFilter('filtro.tipodivulgacao'),
                sessionStorage.getItem('filtro.cidade'),
                sessionStorage.getItem('filtro.bairro'),
                sessionStorage.getItem('filtro.estado'),
                [sessionStorage.getItem('filtro.quarto'), 'quartos'],
                [sessionStorage.getItem('filtro.quartoini'), 'ou mais quartos'],
                [sessionStorage.getItem('filtro.suite'), 'suites'],
                [sessionStorage.getItem('filtro.suiteini'), 'ou mais suites'],
                [sessionStorage.getItem('filtro.banheiro'), 'banheiros'],
                [sessionStorage.getItem('filtro.banheiroini'), 'ou mais banheiros'],
                [this.checkFilter('filtro.vagagaragem'), 'vagas'],
                [this.checkFilter('filtro.vagaini'), 'ou mais vagas'],
                ['de', sessionStorage.getItem('filtro.valorminimo')],
                ['ate', sessionStorage.getItem('filtro.valormaximo')],
                ['de', `${sessionStorage.getItem('filtro.areautilminima')}m2`],
                ['ate', `${sessionStorage.getItem('filtro.areautilmaxima')}m2`],
                ['de', `${sessionStorage.getItem('filtro.areatotalminima')}m2 total`],
                ['ate', `${sessionStorage.getItem('filtro.areatotalmaxima')}m2 total`],
            ],
            query: {
                'foto': sessionStorage.getItem('filtro.comfoto'),
                'regiao': sessionStorage.getItem('filtro.regiaocidade'),
                'cat': sessionStorage.getItem('filtro.categoriaid'),
                'ord': this.checkFilter('ordenacao'),
                'ascdesc': this.checkFilter('ascdesc')
            },
            alternative: {
                'referencia': [
                    ['referencia', sessionStorage.getItem('filtro.referencia')]
                ],
                'edificio': [
                    ['edificio', sessionStorage.getItem('filtro.edificio')]
                ],
                'endereco': [
                    ['endereco', sessionStorage.getItem('filtro.endereco')]
                ]
            },
            regex: [
                [/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, ' '], // remove special characters
                // [/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' '], // remove special characters
                [/\s+/g, '-'], // replace all spaces to '-'
                [/ç/g, 'c'], // replace 'ç' to 'c'
                [/[àáâãäå]/g, 'a'], // remove all accents
                [/[èéêë]/g, 'e'],
                [/[ìíîï]/g, 'i'],
                [/[òóôõö]/g, 'o'],
                [/[ùúûü]/g, 'u']
            ],
            onComplete: url => {
                if (search) {
                    router.listen(url)
                }
            }
        })
    }

    /**
	 * create path & search
	 */
    search() {
        this.createPath(true)
    }

    /**
	 * add options
	 */
    addData(data) {
        data.filter.remove()
        data.filter.add(data)
        data.filter.update()
    }

    /**
	 * erase all filters storages
	 */
    removeStorage() {
        const search = new JetSearch

        search.removeStorage('session', 'filtro', 'filtro.tipodivulgacao')
    }

}