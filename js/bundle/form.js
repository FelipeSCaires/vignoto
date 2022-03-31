class Form {

    /**
     * create a form
     */
     constructor() {
        this.init()
    }

    /**
     * form
     */
    form() {
        const forms = document.querySelectorAll('form[id]')
        
        forms.forEach(form => {
            this[`inputsFile${form.id}`] = form.querySelectorAll('[type="file"]')
            this[`inputsRequired${form.id}`] = [...this[`inputsFile${form.id}`]].map(input => input.required)
            
            form.addEventListener('submit', this.submit.bind(this, form))
            this.fileAttachment(form)
        })
    }

    /**
     * submit form
     */
    submit(form) {
        event.preventDefault()
        this.inputFileManager(form)

        const id = form.id
        const data = new FormData(form)
        const formContent = form.querySelector('.form__content')
        const sending = form.querySelector('.form__sending')
        
        formContent.classList.add('form__content--hidden')
        sending.classList.add('form__sending--active')
        this.updateFormData(form, data)

        const loader = new JetLoader({
            url: `${global.base}form/${id}.php`,
            method: 'post',
            body: data,
            onSuccess: () => this.submitSuccess(form)
        })
    }

    /**
     * submit form success
     */
    submitSuccess(form) {
        const sending = form.querySelector('.form__sending')
        const success = form.querySelector('.form__success')

        sending.classList.remove('form__sending--active')
        success.classList.add('form__success--active')
        this.inputFileManager(form)
        this.successButton(form)
        this.resetInputFile(form)
        this.clearFileList(form)
        form.reset()
    }

    /**
     * submit success button
     */
    successButton(form) {
        const button = form.querySelector('.form__success-btn')

        button.addEventListener('click', this.successButtonHandler.bind(this, form))
    }
    
    /**
     * submit success button handler
     */
    successButtonHandler(form) {
        const formContent = form.querySelector('.form__content')
        const sending = form.querySelector('.form__sending')
        const success = form.querySelector('.form__success')

        formContent.classList.remove('form__content--hidden')
        sending.classList.remove('form__status--active')
        success.classList.remove('form__success--active')
    }

    /**
     * input file management
     */
    inputFileManager(form) {
        this[`inputsFile${form.id}`].forEach(input => {
            input.disabled = !input.disabled
        })
    }

    /**
     * file attachment
     */
    fileAttachment(form) {
        this[`inputsFile${form.id}`].forEach(input => {
            const inputName = input.name
            const isRequired = input.required
            this[`fileList${inputName}`] = {}

            input.addEventListener('change', this.fileAttachmentHandler.bind(this, input, inputName, isRequired))
        })
    }

    /**
     * file attachment handler
     */
    fileAttachmentHandler(input, inputName, isRequired) {
        const list = input.nextElementSibling
        const files = [...input.files]
        
        files.forEach(file => {
            const name = file.name.replace(/[/[ .]/g, '-')
            const item = this.fileTemplate(file, name)
            this[`fileList${inputName}`][name] = file
            
            list.append(item)
            this.fileDelete(input, item, this[`fileList${inputName}`], name, isRequired)
        })
        
        input.value = ''

        this.checkDisabled(input, this[`fileList${inputName}`], isRequired)
    }

    /**
     * update form data
     */
    updateFormData(form, data) {
        this[`inputsFile${form.id}`].forEach(input => {
            const inputName = input.name

            Object.values(this[`fileList${inputName}`]).forEach(file => data.append(inputName, file))
        })
    }

    /**
     * file template
     */
    fileTemplate(file, name) {
        const li = document.createElement('li')
        const button = document.createElement('button')
        const text = document.createElement('div')
        const img = document.createElement('img')

        li.className = 'form__input-file-item'
        button.className = 'form__input-file-btn'
        button.id = name
        text.className = 'form__input-file-text'
        text.innerHTML = file.name
        img.className = 'form__input-file-icon'
        img.src = 'svg/trash.svg'

        button.appendChild(text)
        button.appendChild(img)
        li.appendChild(button)

        return li
    }

    /**
     * delete files attachment
     */
    fileDelete(input, item, fileList, name, isRequired) {
        const button = item.querySelector('button')

        item.addEventListener('click', this.fileDeleteHandler.bind(this, input, button, fileList, name, isRequired))
    }
    
    fileDeleteHandler(input, button, fileList, name, isRequired) {
        delete fileList[name]
        button.parentElement.remove()

        this.checkDisabled(input, fileList, isRequired)
    }

    /**
     * reset input file
     */
    resetInputFile(form) {
        this[`inputsFile${form.id}`].forEach((input, index) => {
            const isRequired = this[`inputsRequired${form.id}`][index]

            if (isRequired) {
                input.required = true
            }
        })
    }

    /**
     * clear file list
     */
    clearFileList(form) {
        this[`inputsFile${form.id}`].forEach(input => {
            const list = input.nextElementSibling

            list.innerHTML = ''
        })
    }

    /**
     * check disabled
     */
    checkDisabled(input, fileList, isRequired) {
        if (isRequired) {
            const hasFile = Object.keys(fileList)[0]

            input.required = !hasFile
        }
    }

    /**
	 * initialize instance
	 */
    init() {
        this.form()
    }

}