class Client {

    /**
     * create a client
     */
    constructor(parameters) {
        this.inputUser = document.querySelector('.client__id')
        this.inputPassword = document.querySelector('.client__password')
        this.sliderContainer = document.querySelector('.client__slider-container')
        this.enterBtn = document.querySelector('.client__btn')
        this.exitBtn = document.querySelector('.client__logout')
        this.recoverPasswordBtn = document.querySelector('.client__recover-password')
        this.inputCurrentPassword = document.querySelector('.client__current-password')
        this.inputNewPassword = document.querySelector('.client__new-password')
        this.inputConfirmPassword = document.querySelector('.client__confirm-password')
        this.changePasswordBtn = document.querySelector('.client__btn-password')
        this.welcome = document.querySelector('.client__welcome')

        this.init(parameters)
    }

    /**
	 * get user submit
	 */
    getUserSubmit() {
        const form = document.querySelector('.client__get-user')
        
        if (form) {
            form.addEventListener('submit', event => {
                event.preventDefault()

                const data = new FormData(form)
                const value = data.get('user')

                this.getUser(value)
            })
        }
    }

    /**
	 * get user load
	 */
    getUser(id) {
        return new JetLoader({
            url: `${config.pcoBaseUrl}api/usuarios/accounts?model.usuario=${id}`,
            onSuccess: data => this.user(data),
            onError: () => this.loginError('Usuário inexistente')
        })
    }

    /**
	 * get user
	 */
    user(data) {
        const container = document.querySelector('.client__user-box')

        container.innerHTML = ''
        
        for (let key in data) {
            container.insertAdjacentHTML('beforeend', `<button class="client__user-box-item" data-id="${data[key].ClienteReferencia}">${data[key].ClienteNome}<br>${data[key].ClienteEmail}</button>`)
        }

        this.sliderContainer.style.transform = 'translateX(-33.333333%)'
        this.setUserButton()
    }

    /**
	 * set user
	 */
    setUserButton() {
        const buttons = document.querySelectorAll('.client__user-box-item')

        buttons.forEach(button => {
            button.addEventListener('click', event => {
                event.stopImmediatePropagation()

                const id = button.dataset.id

                this.inputUser.value = id
                this.sliderContainer.style.transform = 'translateX(-66.666666%)'
            })
        })
    }

    /**
	 * login button event
	 */
    loginButton() {
        if (this.enterBtn) {
            this.enterBtn.addEventListener('click', () => {
                const user = this.inputUser.value
                const password = this.inputPassword.value
                const isUserValid = this.inputUser.checkValidity()
                const isPasswordValid = this.inputPassword.checkValidity()
                const fields = document.querySelector('.client__login')
                const preloader = document.querySelector('.client__preloader')
                
                if (isUserValid && isPasswordValid) {
                    this.loginAuth(user, password)
                    fields.classList.add('client__login--active')
                    preloader.classList.add('client__preloader--active')
                }
            })
        }
    }

    /**
	 * make login
	 */
    loginAuth(user, password) {
        return new JetLoader({
            url: `${config.pcoBaseUrl}token`,
            method: 'post',
            header: {'content-type': 'application/x-www-form-urlencoded'},
            body: `username=${user}&password=${password}&grant_type=password&empresa=${config.idCliente}`,
            onSuccess: data => this.login(user, data.access_token),
            onError: () => this.loginError('Usuário ou senha incorreta')
        })
    }

    /**
	 * login success
	 */
    login(user, token) {
        const body = new FormData()

        body.append('idcliente', config.idCliente)
        body.append('username', user)
        body.append('token', token)

        sessionStorage.setItem('token', token)

        const loader = new JetLoader({
            url: `${global.base}form/login.php`,
            method: 'post',
            body: body,
            onSuccess: data => {
                if (data === 'pageProprietario') {
                    router.listen(config.pageProprietario)
                } else if (data === 'pageInquilino') {
                    router.listen(config.pageInquilino)
                } else if (data === 'pageProprietarioIr') {
                    router.listen(config.pageProprietarioIr)
                } else if (data === 'inquilinoIr') {
                    router.listen(config.pageInquilinoIr)
                } else {
                    router.listen(`${config.pageAviso}?msn=doc`)
                }
            },
            onError: () => this.loginError('Usuário ou senha incorreta.')
        })
    }

    /**
	 * login success error
	 */
    loginError(message) {
        const fields = document.querySelector('.client__login')
        const preloader = document.querySelector('.client__preloader') 
        const icon = document.querySelector('.client__preloader-icon')
        const text = document.querySelector('.client__preloader-text')
        const oldText = text.innerHTML

        icon.style.display = 'none'
        text.innerHTML = message
        
        setTimeout(() => {
            fields.classList.remove('client__login--active')
            preloader.classList.remove('client__preloader--active')
            icon.style.display = 'flex'
            text.innerHTML = oldText
        }, 3000)
    }

    /**
	 * auto login
	 */
    autoLogin() {
        const parameters = new URLSearchParams(window.location.search)

        if (parameters.get('id')) { 
            this.inputUser.value = parameters.get('id')
            this.inputPassword.value = parameters.get('pwd')
            this.loginAuth(parameters.get('id'), parameters.get('pwd'))
        }
    }

    /**
	 * make logout
	 */
    logout() {
        if (this.exitBtn) {
            this.exitBtn.addEventListener('click', () => {
                const body = new FormData()

                body.append('idcliente', config.idCliente)

                const loader = new JetLoader({
                    url: `${global.base}form/logout.php`,
                    method: 'post',
                    body: body,
                    onSuccess: () => {
                        router.listen(config.pageSouCliente)
                    }
                })
            })
        }
    }

    /**
	 * change password button event
	 */
    recoverPasswordButton() {
        if (this.recoverPasswordBtn) {
            this.recoverPasswordBtn.addEventListener('click', () => {
                const user = this.inputUser.value
                const isValid = this.inputUser.checkValidity()
                
                if (isValid) {
                    this.recoverPassword(user)
                } else {
                    // this.enterBtn.click()
                }
            })
        }
    }

    /**
	 * change password
	 */
    recoverPassword(user) {
        return new JetLoader({
            url: `${config.pcoBaseUrl}api/usuarios/recuperarsenha?usuario=${user}&empresa=${config.idCliente}`,
            method: 'post',
            header: {'authorization': `bearer ${sessionStorage.getItem('token')}`},
            onSuccess: data => this.recoverPasswordSuccess(data),
            onError: () => this.loginError()
        })
    }

    /**
	 * change password success
	 */
    recoverPasswordSuccess(data) {
        this.loginError('Sua senha foi envida para seu email!')
        router.listen(config.pageSouCliente)
    }

    /**
	 * change password button event
	 */
    changePasswordButton() {
        if (this.changePasswordBtn) {
            this.changePasswordBtn.addEventListener('click', () => {
                const currentPassword = this.inputCurrentPassword.value
                const newPassword = this.inputNewPassword.value
                const confirmPassword = this.inputConfirmPassword.value
                const isCurrentPasswordValid = this.inputCurrentPassword.checkValidity()
                const isNewPasswordValid = this.inputNewPassword.checkValidity()
                const isConfirmPasswordValid = this.inputCurrentPassword.checkValidity()
                
                if (isCurrentPasswordValid && isNewPasswordValid && isConfirmPasswordValid) {
                    this.changePassword(currentPassword, newPassword, confirmPassword)
                }
            })
        }
    }

    /**
	 * change password
	 */
    changePassword(currentPassword, newPassword, confirmPassword) {
        return new JetLoader({
            url: `${config.pcoBaseUrl}api/usuarios/trocarsenha?senha=${currentPassword}&senhaNova=${newPassword}&confirmarSenha=${confirmPassword}`,
            method: 'post',
            header: {'authorization': `bearer ${sessionStorage.getItem('token')}`},
            onSuccess: data => this.changePasswordSuccess(data),
            onError: () => this.loginError()
        })
    }

    /**
	 * change password success
	 */
    changePasswordSuccess(data) {
        // console.log('Senha alterada!')
        router.listen(config.pageSouCliente)
    }

    /**
	 * boleto button
	 */
    boletoBtns() {
        const btns = document.querySelectorAll('.client__download')

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const codigo = btn.dataset.codigo
                const token = btn.dataset.token

                this.boleto(codigo, token)
            })
        })
    }

    /**
	 * fetch boleto
	 */
    boleto(codigo, token) {
        return new JetLoader({
            url: `${config.pcoBaseUrl}api/prestacao-contas/inquilinos/boleto/${codigo}/pdf`,
            header: {'authorization': `bearer ${token}`},
            onSuccess: data => this.boletoSuccess(data, codigo)
        })
    }

    /**
	 * download boleto
	 */
    boletoSuccess(data, codigo) {
        const blob = new Blob([data], {type: 'application/pdf'})
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')

        link.href = url
        link.download = `boleto-${codigo}.pdf`
        document.querySelector('body').appendChild(link)
        link.click()
        window.URL.revokeObjectURL(url)
        link.remove()
    }

    printButton() {
        const button = document.querySelector('.client__print')

        if (button) {
            button.addEventListener('click', () => this.print())
        }
    }

    print() {
        const toPrint = document.querySelector('#toPrint')
        const newWindow = window.open('')

        setTimeout(() => {
            newWindow.document.write(`<style>body{font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif}</style>`)
            newWindow.document.write(toPrint.innerHTML)
            newWindow.print()
            newWindow.close()
        }, 30)
    }

    /**
	 * initialize instance
	 */
    init(parameters) {
        this.autoLogin()
        this.getUserSubmit()
        this.loginButton()
        this.logout()
        this.recoverPasswordButton()
        this.changePasswordButton()
        this.boletoBtns()
        this.printButton()
    }

}