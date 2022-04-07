class List {

    /**
     * create a list
     */
    constructor() {
        this.init()
    }

    /**
     * close search
     */
    closeSearch() {
        const input = document.querySelector('#jetwindow-search')
        const btn = document.querySelector('.search__btn')

        btn.addEventListener('click', () => {
            input.checked = false
        })
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
                active: sessionStorage.getItem('pagina'),
                total: container.dataset.total,
                left: {'568': 2, '0': 1},
                right: {'568': 2, '0': 1},
                onComplete: () => router.updateLinks()
            })
        }
    }

    mapButton() {
        const button = document.querySelector('.list__map-btn')

        if (button) {
            button.addEventListener('click', this.mapButtonHandler.bind(this))
        }
    }

    mapButtonHandler() {
        const list = document.querySelector('.list')

        const urls = [
            'css/leaflet.min.css',
            'js/leaflet.min.js'
        ]
        
        if (this.map) {
            list.classList.toggle('list--map-opened')
            this.checkMapButton(list)
        } else {
            this.loadScript(urls, () => {
                const tipodivulgacao = sessionStorage.getItem('filtro.tipodivulgacao')
                const storage = sessionStorage.getItem(`map-${tipodivulgacao}`)

                list.classList.add('list--map-opened')

                if (storage) {
                    this.data = JSON.parse(storage)
                    this.createMap()
                } else {
                    this.loadData()
                }
            })
        }
    }

    checkMapButton(list) {
        setTimeout(() => {
            const buttonText = document.querySelectorAll('.list__map-btn-text')
            
            buttonText.forEach(text => {
                if (list.classList.contains('list--map-opened')) {
                    text.innerHTML = 'Fechar mapa'
                } else {
                    text.innerHTML = 'Imóveis no mapa'
                }
            })
        }, 100)
    }

    /**
	 * inject & load script
	 */
    loadScript(scripts, callback) {
        const promises = scripts.map(url => this.createTag(url))
    
        Promise.all(promises).then(callback)
    }

    createTag(url) {
        return new Promise(resolve => {
            const extension = url.split('.').pop()
            const type = extension === 'js' ? 'script' : 'link'
            const parameter = extension === 'js' ? 'src' : 'href'
            const tag = document.createElement(type)
            const oldTag = document.querySelector(`${type}[${parameter}="${url}"]`)

            oldTag && oldTag.remove()
            tag[parameter] = url

            if (extension === 'css') {
                tag.rel = 'stylesheet'
            }

            document.body.appendChild(tag)
            tag.onload = () => resolve(url)
        })
    }

    createMap() {
        const list = document.querySelector('.list')
        const arrayLatLng = this.data.map(item => [item.lat, item.lng])
        this.map = L.map('map')

        const urls = ['js/leaflet.markercluster.min.js']

        this.loadScript(urls, () => {
            this.clusters = L.markerClusterGroup({chunkedLoading: true})
    
            this.createTile()
            this.data.forEach(item => this.createMarker(item, this.createIcon(item.tipoImovelPadrao)))
            this.map.addLayer(this.clusters)
            this.checkMapButton(list)
            this.removeHashLink()
            setTimeout(() => this.map.fitBounds(arrayLatLng), 1000)
            router.updateLinks()
        })

    }

    updateMap() {
        const list = document.querySelector('.list')
        
        this.checkMapButton(list)
        if (list.classList.contains('list--map-opened')) {
            this.createMap()
        }
    }

    loadData() {
        const loader = new JetLoader({
            url: `${config.imoveisBaseUrl}?filtro.${config.tipoCliente}id=${config.id}&filtro.tipodivulgacao=${sessionStorage.getItem('filtro.tipodivulgacao')}&pagina=1&maximo=999999`,
            onSuccess: data => {
                const tipodivulgacao = sessionStorage.getItem('filtro.tipodivulgacao')

                this.getMapData(data)
                sessionStorage.setItem(`map-${tipodivulgacao}`, JSON.stringify(this.data))
                this.createMap()
            }
        })
    }

    getMapData(data) {
        const buscaId = data.data.buscaImovelId
        const result = data.data.resultado
        this.data = []

        for (let key in result) {
            const item = result[key]
            const tipoimovel = this.cleanUrl(item.tipoImovelDescricao)
            const quartos = item.imovelQuartos ? `-${item.imovelQuartos}-quartos` : ''
            const bairro = item.imovelEnderecoBairro ? `-${this.cleanUrl(item.imovelEnderecoBairro)}` : ''
            const cidade = item.imovelEnderecoCidade ? `-${this.cleanUrl(item.imovelEnderecoCidade)}` : ''
            const vagas = item.imovelVagas ? '-com-garagem' : ''
            const area = item.imovelAreaUtil ? `-${Math.floor(item.imovelAreaUtil)}m2` : ''
            const valorVenda = item.imovelValorVenda
            const valorLocacao = item.imovelValorAluguel - item.imovelValorMultaDesconto
            let valor = `-venda-locacao-rs-${valorVenda}-rs-${valorLocacao}`

            if (item.imovelVenda && !item.imovelLocacao) {
                valor = `-venda-rs-${valorVenda}`
            } else if (!item.imovelVenda && item.imovelLocacao) {
                valor = `-locacao-rs-${valorLocacao}`
            }
            
            const url = `${config.pageImovel}/${tipoimovel}${quartos}${bairro}${cidade}${vagas}${area}${valor}?id=${item.clienteId}&ref=${item.imovelReferencia}&search=${buscaId}`
            
            const imovel = {
                'referencia': item.imovelReferencia,
                'img': item.urlFotoPrincipalMedia,
                'tipoimovel': item.tipoImovelDescricao,
                'tipoImovelPadrao': item.tipoImovelPadrao,
                'tipoendereco': item.imovelTipoEndereco,
                'endereco': item.imovelEndereco,
                'estado': item.imovelEnderecoEstado,
                'cidade': item.imovelEnderecoCidade,
                'bairro': item.imovelEnderecoBairro,
                'banheiro': item.imovelBanheiros || 0,
                'quarto': item.imovelQuartos,
                'vaga': item.imovelVagas > 2 ? item.imovelVagas - 2 : 0,
                'areaTotal': item.imovelAreaTotal,
                'areaUtil': item.imovelAreaUtil,
                'valorVenda': item.imovelVenda ? item.imovelValorVenda : '',
                'valorLocacao': item.imovelLocacao ? item.imovelValorAluguel - item.imovelValorMultaDesconto : '',
                'lat': item.imovelEnderecoLatitude,
                'lng': item.imovelEnderecoLongitude,
                'url': url,
            }
            
            this.data.push(imovel)
        }
    }

    /**
	 * clean string
	 */
    cleanUrl(string) {
        string = string.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, ' ')
        string = string.replace(/\s+/g, '-')
        string = string.toLowerCase()

        return string
    }

    createTile() {
        const mapApi = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
        
        L.tileLayer(mapApi, {
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(this.map)
    }

    createMarker(item, icon) {
        this.clusters.addLayer(
            L.marker([item.lat, item.lng], {icon: icon})
            .bindPopup(this.createPopUp(item))
            .on('click', () => {
                setTimeout(() => {
                    this.removeHashLink()
                    router.updateLinks()
                })
            })
        )
    }

    createIcon(icon) {
        return L.icon({
            iconUrl: `svg/${icon}.svg`,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        })
    }

    createPopUp(item) {
        return `<a href="${item.url}">
            <img class="list__map-img" src="${item.img}" width="150" height="50">
            <div class="list__map-content">
                ${item.referencia}
                <strong class="list__map-type">${item.tipoimovel}</strong>
                ${item.tipoendereco}. ${item.endereco}<br>
                ${item.bairro} - ${item.cidade}/${item.estado}
                <div class="list__map-price">
                    ${item.valorVenda ?
                        `Venda: <strong>R$ ${item.valorVenda.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong>`
                    : ''}
                    ${item.valorLocacao ?
                        `Locação: <strong>R$ ${item.valorLocacao.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong>`
                    : ''}
                </div>
                ${item.areaTotal > 0 ?
                    `<div class="list__map-feature">
                        <span class="list__map-feature-icon"><img src="svg/area.svg"></span>
                        ${item.areaTotal.toLocaleString('pt-BR')}m² total
                    </div>`
                : ''}
                ${item.areaUtil > 0 ?
                    `<div class="list__map-feature">
                        <span class="list__map-feature-icon"><img src="svg/area.svg"></span>
                        ${item.areaUtil.toLocaleString('pt-BR')}m² útil
                    </div>`
                : ''}
                ${item.banheiro > 0 ?
                    `<div class="list__map-feature">
                        <span class="list__map-feature-icon"><img src="svg/bathroom.svg"></span>
                        ${item.banheiro} banheiro(s)
                    </div>`
                : ''}
                ${item.vaga > 0 ?
                    `<div class="list__map-feature">
                        <span class="list__map-feature-icon"><img src="svg/garage.svg"></span>
                        ${item.vaga} vaga(s)
                    </div>`
                : ''}
                ${item.quarto > 0 ?
                    `<div class="list__map-feature">
                        <span class="list__map-feature-icon"><img src="svg/bedroom.svg"></span>
                        ${item.quarto} quarto(s)
                    </div>`
                : ''}
            </div>
        </a>`
    }

    removeHashLink() {
        const links = document.querySelectorAll('.list__map a[href]')

        links.forEach(link => {
            if (link.href.includes('#')) {
                link.removeAttribute('href')
            }
        })
    }

    closeMap() {
        const button = document.querySelector('.list__map-close')
        const list = document.querySelector('.list')

        button.addEventListener('click', () => {
            list.classList.remove('list--map-opened')
            this.checkMapButton(list)
        })
    }

    /**
	 * create no result slider
	 */
    noResult() {
        const container = document.querySelector('.list__no-result')

        if (container) {
            const slider = new JetSlider({
                element: '.list__no-result',
                prev: '.list__no-result-prev',
                next: '.list__no-result-next',
                slidesToShow: {
                    0: 1,
                    568: 2,
                    821: 3,
                    1081: 4
                },
                slidesToScroll: {
                    0: 1,
                    568: 2,
                    821: 3,
                    1081: 4
                },
                speed: 650,
                gap: 30,
                pagination: '.list__no-result-pagination'
            })
        }
    }

    /**
	 * initialize instance
	 */
    init() {
        router.updateLinks()
        new SearchList
        this.closeSearch()
        this.pagination()
        this.updateMap()
        this.mapButton()
        this.closeMap()
        this.noResult()
    }

}