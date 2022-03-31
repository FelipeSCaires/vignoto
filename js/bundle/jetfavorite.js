/**
 * @name * JetFavorite
 * @file * jetfavorite.js
 * @author * Paper Plane Design Studio® <http://www.paperplane.com.br>
 * @description * javascript module to get, add & delete favorite items
 * @license * Todos os direitos reservados - Paper Plane Design Studio®
 * @version * 1.0
 */



class JetFavorite {

    /**
	 * create jetfavorite
	 * @param {object} options - optional settings object
	 */
    constructor(options) {
        this.config = JetFavorite.extend(options)
        this.idParameter = this.config.idType === 'cliente' ? 'filtro.clienteid=' : 'filtro.parceriaid='
        this.baseUrl = this.config.favoriteApi
        this.baseUrlLogin = this.config.loginApi
        this.baseUrlSearch = `${this.baseUrl}/pesquisar?${this.idParameter}${this.config.id}&pagina=1&maximo=999999`
        this.baseUrlDeleteAll = `${this.baseUrl}/excluirtodos/${this.config.id}`
        this.activeClass = `${this.config.favorite.substr(1)}--checked`
        this.tokenStorage = `favorite-token-${this.config.id}`
        this.userStorage = `favorite-user-${this.config.id}`
        this.total = 0

        this.config.onInit()
        this.init()
	}
	
	/**
	 * overrides default settings with custom ones
	 * @param {object} options - optional settings object
	 * @returns {object} - custom jetfavorite settings
	 */
	static extend(options) {
		const settings = {
            form: '',
            pageLink: '',
			favorite: '',
            deleteAll: '',
			counter: '',
            loginApi: 'https://casasoftautorizacao.azurewebsites.net/api/v1/Account/external/login/portal',
            favoriteApi: 'https://portalapi.casasoftsig.com/api/v3/imoveisfavoritos',
            key: '1add169cbb1244d1aaadad282dc16425',
            idType: 'cliente',
            id: '',
            onInit: () => {},
            onLogin: () => {},
            onNoLogin: () => {},
            onClick: (button, total) => {},
            onChange: (total) => {},
			onAdd: () => {},
			onRemove: () => {},
            onRemoveAll: () => {},
            onError: (name) => {}
		}

		for (const key in options) {
			settings[key] = options[key]
		}

		return settings
    }

    /**
     * submit the sign in form
     * & get the data
     */
    loginSubmit() {
        const forms = typeof this.config.form === 'string' ? document.querySelectorAll(this.config.form) : this.config.form

        forms.forEach(form => {
            form.addEventListener('submit', event => {
                event.preventDefault()

                const data = new FormData(form)

                if (!data.get('nome')) {
                    data.append('nome', '')
                }
        
                if (!data.get('sobrenome')) {
                    data.append('sobrenome', '')
                }
        
                if (!data.get('telefone')) {
                    data.append('telefone', '')
                }
        
                data.append('keySecret', this.config.key)
        
                if (this.config.idType === 'cliente') {
                    data.append('clienteId', this.config.id)
                    data.append('parceriaId', '')
                } else {
                    data.append('clienteId', '')
                    data.append('parceriaId', this.config.id)
                }
        
                data.append('moduloId', 1)

                this.login(data)
            })
        })
    }

    /**
	 * public function to sign in favorites
     * @param {object} data - login form data
	 */
    login(data) {
        fetch(this.baseUrlLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `{\"email\":\"${data.get('email')}\",\"firstName\":\"${data.get('nome')}\",\"lastName\":\"${data.get('sobrenome')}\",\"telephone\":\"${data.get('telefone')}\",\"keySecret\":\"${this.config.key}\",\"clienteId\":\"${data.clienteId}\",\"parceriaId\":\"${data.parceriaId}\",\"moduloId\":\"1\"}`
        })
        .then(response => {
            if (!response.ok) {
                this.config.onError('login')

                throw new Error(`JetFavorite: An error has occured trying to return the favorites login request 😭: ${response.status}`)
            }

            return response.json()
        })
        .then(data => {
            sessionStorage.setItem(this.tokenStorage, data.data.accessToken)
            sessionStorage.setItem(this.userStorage, data.data.userToken.email)

            this.get()
            this.config.onLogin()
        })
        .catch(err => console.log(err))
    }

    /**
	 * public function to get the favorites
     * search result
	 */
    get() {
        if (sessionStorage.getItem(this.tokenStorage)) {
            fetch(`${this.baseUrlSearch}&filtro.email=${sessionStorage.getItem(this.userStorage)}`, {
                headers: {
                    'authorization': `bearer ${sessionStorage.getItem(this.tokenStorage)}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    this.config.onError('get')

                    throw new Error(`JetFavorite: An error has occured trying to return the favorites search request 😭: ${response.status}`)
                }

                return response.json()
            })
            .then(data => this.update(data))
            .catch(err => console.log(err))
        }
    }

    /**
	 * update favorite buttons & counters
     * @param {object} data - favorite json list
	 */
    update(data) {
        if (sessionStorage.getItem(this.tokenStorage)) {
            this.total = data.data.total
            const dataArray = []
            const favoriteIdArray = []
            
            for (const key of data.data.resultado) {
                let imovelPara

                if (key.imovelVenda && key.imovelLocacao) {
                    imovelPara = 'a'
                } else if (key.imovelVenda && !key.imovelLocacao) {
                    imovelPara = 'v'
                } else if (key.imovelLocacao && !key.imovelVenda) {
                    imovelPara = 'l'
                } else {
                    imovelPara = 't'
                }

                dataArray.push(`${key.clienteId},${key.imovelId},${imovelPara}`)
                favoriteIdArray.push(key.imovelFavoritoId)
            }

            this.checkButton(dataArray, favoriteIdArray)
            this.counter(data.data.total)
            this.action()
            this.pageLink()
            this.config.onChange(data)
        }
    }

    /**
	 * call the action for the
     * clicked element
	 */
    action() {
        if (this.actionElement) {
            const data = JSON.parse(this.actionElement.dataset.jetfavorite)
            
            if (!data) {
                this.deleteAll()
            } else if (this.actionElement.classList.contains(this.activeClass)) {
                this.delete(data)
            } else if (!this.actionElement.classList.contains(this.activeClass)) {
                this.add(data)
            }

            this.actionElement = null
        }
    }

    /**
	 * check button state, add or remove active class
     * & update the buton dataset
     * @param {array} data - array of favorites values
     * @param {array} favoriteId - array of favorites ids
	 */
    checkButton(data, favoriteId) {
        const buttons = typeof this.config.favorite === 'string' ? document.querySelectorAll(this.config.favorite) : this.config.favorite
        
		buttons.forEach(button => {
            const dataset = JSON.parse(button.dataset.jetfavorite)
            const check = `${dataset.clienteId},${dataset.imovelId},${dataset.imovelPara}`
            const index = data.indexOf(check)

            if (index > -1) {
                dataset.favoritoId = favoriteId[index]
                button.dataset.jetfavorite = JSON.stringify(dataset)

                button.classList.add(this.activeClass)
            } else if (button.classList.contains(this.activeClass)) {
                delete dataset.favoritoId
                button.dataset.jetfavorite = JSON.stringify(dataset)

                button.classList.remove(this.activeClass)
            }
        })
    }

    /**
	 * set the counters total value
     * @param {object} total - number of favorites
	 */
    counter(total) {
        const counters = typeof this.config.counter === 'string' ? document.querySelectorAll(this.config.counter) : this.config.counter

		counters.forEach(counter => {
            counter.innerHTML = total
        })
    }
    
    /**
	 * public function to add
     * a favorite
     * @param {object} data - favorite button dataset
	 */
	add(data) {
        if (sessionStorage.getItem(this.tokenStorage)) {
            fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `bearer ${sessionStorage.getItem(this.tokenStorage)}`,
                    'Content-Type': 'application/json'
                },
                body: `{\"clienteId\":\"${data.clienteId}\",\"imovelId\":${data.imovelId},\"imovelPara\":\"${data.imovelPara}\"}`
            })
            .then(response => {
                if (!response.ok) {
                    this.config.onError('add')

                    throw new Error(`JetFavorite: An error has occured trying to return the favorites add request 😭: ${response.status}`)
                }

                return response.json()
            })
            .then(data => {
                this.get()
                this.config.onAdd()
            })
            .catch(err => console.log(err))
        } else {
            this.config.onNoLogin()
        }
    }

    /**
	 * public function to delete
     * a favorite
     * @param {object} data - favorite button dataset
	 */
	delete(data) {
        if (sessionStorage.getItem(this.tokenStorage)) {
            fetch(`${this.baseUrl}/${data.favoritoId}`, {
                method: 'DELETE',
                headers: {'authorization': `bearer ${sessionStorage.getItem(this.tokenStorage)}`}
            })
            .then(response => {
                if (!response.ok) {
                    this.config.onError('delete')

                    throw new Error(`JetFavorite: An error has occured trying to return the favorites delete request 😭: ${response.status}`)
                }

                return response.json()
            })
            .then(data => {
                this.get()
                this.config.onRemove()
            })
            .catch(err => console.log(err))
        } else {
            this.config.onNoLogin()
        }
    }

    /**
	 * create event for favorite
     * button
	 */
	favoriteButtonEvent() {
        const buttons = typeof this.config.favorite === 'string' ? document.querySelectorAll(this.config.favorite) : this.config.favorite

		buttons.forEach(button => {
            button.addEventListener('click', this.favoriteButton.bind(this, button))
		})
    }

    /**
	 * favorite button function to add
     * & delete favorites
     * @param {event} event - click event
	 */
    favoriteButton(button) {
        event.stopImmediatePropagation()

        const data = JSON.parse(button.dataset.jetfavorite)

        if (sessionStorage.getItem(this.tokenStorage)) {
            if (button.classList.contains(this.activeClass)) {
                this.delete(data)
            } else {
                this.add(data)
            }
        } else {
            this.actionElement = button
            this.config.onNoLogin()
        }

        this.config.onClick(button, this.total)
    }

    /**
	 * public function to delete
     * all favorites
	 */
	deleteAll() {
        if (sessionStorage.getItem(this.tokenStorage)) {
            fetch(this.baseUrlDeleteAll, {
                method: 'DELETE',
                headers: {'authorization': `bearer ${sessionStorage.getItem(this.tokenStorage)}`}
            })
            .then(response => {
                if (!response.ok) {
                    this.config.onError('deleteAll')

                    throw new Error(`JetFavorite: An error has occured trying to return the favorites delete all request 😭: ${response.status}`)
                }

                return response.json()
            })
            .then(data => {
                this.get()
                this.config.onRemoveAll()
            })
            .catch(err => console.log(err))
        } else {
            this.config.onNoLogin()
        }
    }

    /**
	 * create event for delete all
     * favorites button
	 */
	deleteAllEvent() {
        const buttons = typeof this.config.deleteAll === 'string' ? document.querySelectorAll(this.config.deleteAll) : this.config.deleteAll

		buttons.forEach(button => {
            button.addEventListener('click', event => {
                event.stopImmediatePropagation()
                
                if (!sessionStorage.getItem(this.tokenStorage)) {
                    this.actionElement = button
                }

                this.deleteAll()
            })
		})
    }

    /**
	 * create favorite link
	 */
	pageLink() {
        if (this.config.pageLink) {
            const links = document.querySelectorAll(this.config.pageLink)
            const userEmail = sessionStorage.getItem(this.userStorage)
            
            links.forEach(link => {
                if (userEmail && !link.href.includes('user=')) {
                    let href = link.href.replace(/^.*\/\/[^\/]+/, '')
                    href = `${href}?user=${userEmail}`
    
                    link.href = href
                }
            })
        }
    }

	/**
	 * initialize instance
	 */
    init() {
        this.loginSubmit()
        this.favoriteButtonEvent()
        this.deleteAllEvent()
        this.get()
	}
	
}