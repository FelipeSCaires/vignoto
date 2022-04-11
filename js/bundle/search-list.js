class SearchList extends Filters {

    /**
     * create search
     */
    constructor(filters) {
        super(config.pageImoveis)
        this.init()
    }

    /**
	 * imovelpara filter
	 */
    imovelpara() {
        const imovelparaFilter = new JetSelect({
            element: '.search__type',
            name: ['filtro.tipodivulgacao'],
            optionsText: ['Comprar', 'Alugar'],
            optionsValue: ['v', 'l'],
            label: 'Selecione',
            tags: true,
            tagsTarget: '.list__tags',
            onClickTag: () => super.search(),
            onChange: () => {
                super.removeStorage()
                super.createFilters(this.filters.bind(this))
                this.referenciaFilter.empty()
                this.enderecoFilter.empty()
                super.createPath()
            }
        })
    }

    /**
	 * tipoimovel filter
	 */
    tipoimovel(data) {
        const tipoimovelFilter = new JetSelect({
            element: '.search__property',
            name: 'filtro.tiposimoveis',
            optionsText: data.tipoImovelDescricao, 
            optionsValue: data.tipoImovelDescricao,
            type: 'multiple',
            deselectAll: 'Limpar seleção',
            label: 'Selecione',
            tags: true,
            tagsTarget: '.list__tags',
            onDeselectAll: () => super.createPath(),
            onClickTag: () => super.search(),
            onChange: () => super.createPath()
        })
    }

    /**
	 * valor mínimo filter
	 */
    valorMinimo() {
        let text
        let value

        if (sessionStorage.getItem('filtro.tipodivulgacao') === 'v') {
            text = ['De R$ 50.000', 'De R$ 100.000', 'De R$ 150.000', 'De R$ 200.000', 'De R$ 250.000', 'De R$ 300.000', 'De R$ 400.000', 'De R$ 500.000',  'De R$ 600.000', 'De R$ 700.000', 'De R$ 800.000', 'De R$ 900.000', 'De R$ 1.000.000']
            value = [50000, 100000, 150000, 200000, 250000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000]
        } else {
            text = ['Até R$ 400', 'Até R$ 800', 'Até R$ 1.000', 'Até R$ 1500', 'Até R$ 2.000', 'Até R$ 3.000', 'Até R$ 4.000', 'Até R$ 5.000', 'Até R$ 6.000', 'Até R$ 7.000', 'Até R$ 8.000', 'Até R$ 9.000', 'Até R$ 10.000', 'Até R$ 15.000']
            value = [400, 800, 1000, 1500, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 15000]
        }    

        const valorMinimoFilter = new JetSelect({
            element: '.search__min-price',
            name: 'filtro.valorminimo',
            optionsText: text,
            optionsValue: value,
            deselectAll: 'Limpar seleção',
            label: 'Selecione',
            onDeselectAll: () => super.createPath(),
            onClickTag: () => super.search(),
            onChange: () => super.createPath()
        })
    }

    /**
	 * valor máximo filter
	 */
    valorMaximo() {
        let text
        let value

        if (sessionStorage.getItem('filtro.tipodivulgacao') === 'v') {
            text = ['Até R$ 100.000', 'Até R$ 150.000', 'Até R$ 200.000', 'Até R$ 300.000', 'Até R$ 400.000',  'Até R$ 600.000', 'Até R$ 800.000', 'Até R$ 1.000.000', 'Até R$ 1.500.000', 'Até R$ 2.000.000', 'Até R$ 3.000.000', 'Acima de R$ 3.000.000']
            value = [100000, 150000, 200000, 300000, 400000, 600000, 800000, 1000000, 1500000, 2000000, 3000000, 999999999999]
        } else {
            text = ['Até R$ 400', 'Até R$ 800', 'Até R$ 1.000', 'Até R$ 1500', 'Até R$ 2.000', 'Até R$ 3.000', 'Até R$ 4.000', 'Até R$ 5.000', 'Até R$ 6.000', 'Até R$ 7.000', 'Até R$ 8.000', 'Até R$ 9.000', 'Até R$ 10.000', 'Até R$ 15.000', 'Acima de R$ 15.000']
            value = [400, 800, 1000, 1500, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 15000, 99999999]
        }    

        const valorMaximoFilter = new JetSelect({
            element: '.search__max-price',
            name: 'filtro.valormaximo',
            optionsText: text,
            optionsValue: value,
            deselectAll: 'Limpar seleção',
            label: 'Selecione',
            onDeselectAll: () => super.createPath(),
            onClickTag: () => super.search(),
            onChange: () => super.createPath()
        })
    }

    /**
	 * cidade filter
	 */
    cidade(data) {
        const cidadeFilter = new JetSelect({
            element: '.search__city',
            name: 'filtro.cidade',
            optionsText: data.cidadeNome,
            optionsValue: data.cidadeNome,
            type: 'multiple',
            deselectAll: 'Limpar seleção',
            label: 'Selecione',
            tags: true,
            tagsTarget: '.list__tags',
            onDeselectAll: () => {
                super.createFilters(this.filters.bind(this))
                super.createPath()
            },
            onClickTag: () => super.search(),
            onChange: () => {
                this.bairroFilter.removeStorage()
                super.createFilters(this.filters.bind(this))
                super.createPath()
            }
        })
    }

    /**
	 * bairro filter
	 */
    bairro(data) {
        if (!this.bairroFilter) {
            this.bairroFilter = new JetSelect({
                element: '.search__neighborhood',
                name: 'filtro.bairro',
                type: 'multiple',
                deselectAll: 'Limpar seleção',
                label: 'Selecione',
                sortTitle: true,
                tags: true,
                tagsTarget: '.list__tags',
                onDeselectAll: () => super.createPath(),
                onClickTag: () => super.search(),
                onChange: () => super.createPath()
            })
        }
        
        super.addData({
            filter: this.bairroFilter,
            text: data.bairroNome,
            value: data.bairroNome,
            sort: data.bairroCidade
        })
    }

    /**
	 * região filter
	 */
    regiao(data) {
        const regiaoFilter = new JetSelect({
            element: '.search__region',
            name: 'filtro.regiaocidade',
            optionsText: data.opcoes[0].split(';'),
            optionsValue: data.valor,
            deselectAll: 'Limpar seleção',
            label: 'Selecione',
            tags: true,
            tagsTarget: '.list__tags',
            onDeselectAll: () => super.createPath(),
            onClickTag: () => super.search(),
            onChange: () => super.createPath()
        })
    }

    /**
	 * quarto filter
	 */
    quarto() {
        const quartoFilter = new JetSelect({
            element: '.search__bedroom',
            name: ['filtro.quarto', 'filtro.quartoini'],
            optionsText: ['1', '2', '3', '4+'],
            optionsValue: [['1', null], ['2', null], ['3', null], [null, '4']],
            deselectAll: 'Limpar seleção',
            label: 'Selecione',
            tags: true,
            tagsOnChange: false,
            tagsTarget: '.list__tags',
            onDeselectAll: () => super.createPath(),
            onClickTag: () => super.search(),
            onChange: () => super.createPath()
        })
    }

    /**
	 * garagem filter
	 */
    garagem() {
        const garagemFilter = new JetSelect({
            element: '.search__garage',
            name: ['filtro.vagagaragem', 'filtro.vagaini'],
            optionsText: ['Sim', 'Não', '1', '2', '3', '4+'],
            optionsValue: [['1', null], ['2', null], ['3', null], ['4', null], ['5', null], [null, '6']],
            deselectAll: 'Limpar seleção',
            label: 'Selecione',
            tags: true,
            tagsOnChange: false,
            tagsTarget: '.list__tags',
            onDeselectAll: () => super.createPath(),
            onClickTag: () => super.search(),
            onChange: () => super.createPath()
        })
    }

    /**
	 * área mínima filter
	 */
    areaMinima() {
        const areaMinimaFilter = new JetSelect({
            element: '.search__min-area',
            name: 'filtro.areatotalminima',
            optionsText: ['De 60m²', 'De 100m²', 'De 200m²', 'De 300m²', 'De 400m²', 'De 500m²', 'De 600m²', 'De 700m²', 'De 800m²', 'De 900m²', 'De 1.000m²', 'De 2.000m²', 'De 3.000m²', 'De 4.000m²', 'De 5.000m²', 'De 10.000m²', 'De 20.000m²', 'De 30.000m²', 'De 40.000m²', 'De 50.000m²', 'De 100.000m²'],
            optionsValue: [60, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 10000, 20000, 30000, 40000, 50000, 100000],
            deselectAll: 'Limpar seleção',
            label: 'Selecione',
            tags: true,
            tagsTarget: '.list__tags',
            onDeselectAll: () => super.createPath(),
            onClickTag: () => super.search(),
            onChange: () => super.createPath()
        })
    }

    /**
	 * área máxima filter
	 */
    areaMaxima() {
        const areaMaximaFilter = new JetSelect({
            element: '.search__max-area',
            name: 'filtro.areatotalmaxima',
            optionsText: ['Até 100m²', 'Até 200m²', 'Até 300m²', 'Até 400m²', 'Até 500m²', 'Até 600m²', 'Até 700m²', 'Até 800m²', 'Até 900m²', 'Até 1.000m²', 'Até 2.000m²', 'Até 3.000m²', 'Até 4.000m²', 'Até 5.000m²', 'Até 10.000m²', 'Até 20.000m²', 'Até 30.000m²', 'Até 40.000m²', 'Até 50.000m²', 'Até 100.000m²', 'Acima de 100.000m²'],
            optionsValue: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 10000, 20000, 30000, 40000, 50000, 100000, 9999999999],
            deselectAll: 'Limpar seleção',
            label: 'Selecione',
            tags: true,
            tagsTarget: '.list__tags',
            onDeselectAll: () => super.createPath(),
            onClickTag: () => super.search(),
            onChange: () => super.createPath()
        })
    }

    /**
	 * mobiliado filter
	 */
    mobiliado() {
        const mobiliadoFilter = new JetCheckbox({
            element: '.search__furnished',
            name: 'filtro.mobiliado',
            optionsText: ['Mobiliado'],
            optionsValue: ['1'],
            tags: true,
            tagsOnChange: false,
            tagsTarget: '.list__tags',
            onClickTag: () => super.search(),
            onChange: () => super.createPath()
        })
    }

    /**
	 * condomínio filter
	 */
    condominio() {
        const condominioFilter = new JetCheckbox({
            element: '.search__condominium',
            name: 'filtro.condominio',
            optionsText: ['Condomínio'],
            optionsValue: ['1'],
            tags: true,
            tagsOnChange: false,
            tagsTarget: '.list__tags',
            onClickTag: () => super.search(),
            onChange: () => super.createPath()
        })
    }

    /**
	 * referência filter
	 */
    referencia() {
        this.referenciaFilter = new JetInput({
            element: '.search__reference',
            name: 'filtro.referencia',
            placeholder: 'Digite a referência do imóvel',
            tags: true,
            tagsTarget: '.list__tags',
            onClickTag: () => {
                sessionStorage.setItem('filtro.tipodivulgacao', config.imovelpara)
                super.search()
            },
            onKeyUp: () => super.createPath(),
            onPaste: () => super.createPath(),
            onEmpty: () => super.createPath()
        })
    }

    /**
	 * endereço filter
	 */
    endereco() {
        this.enderecoFilter = new JetInput({
            element: '.search__address',
            name: 'filtro.endereco',
            placeholder: 'Digite o nome da rua',
            tags: true,
            tagsTarget: '.list__tags',
            onClickTag: () => {
                sessionStorage.setItem('filtro.tipodivulgacao', config.imovelpara)
                super.search()
            },
            onKeyUp: () => super.createPath(),
            onPaste: () => super.createPath(),
            onEmpty: () => super.createPath()
        })
    }

    /**
	 * ordenar filter
	 */
    ordenar() {
        const ordenarFilter = new JetSelect({
            element: '.list__order',
            name: ['ordenacao', 'ascdesc'],
            optionsText: ['Maior preço', 'Menor preço', 'Maior área total', 'Menor área total'],
            optionsValue: [['imovelvalor', 'desc'], ['imovelvalor', 'asc'], ['imovelareatotal', 'desc'], ['imovelareatotal', 'asc']],
            deselectAll: 'Limpar seleção',
            label: 'Selecione',
            onDeselectAll: () => super.search(),
            onChange: () => super.search()
        })
    }

    /**
	 * create filters
	 */
    filters(data) {
        this.imovelpara()
        this.tipoimovel(data.searchtipoimoveis)
        this.valorMinimo()
        this.valorMaximo()
        this.cidade(data.searchcidades)
        this.bairro(data.searchbairros)
        this.regiao(data.searchregioescidades)
        this.quarto()
        this.garagem()
        this.areaMinima()
        this.areaMaxima()
        this.mobiliado()
        this.condominio()
        this.referencia()
        this.endereco()
        this.ordenar()
    }

    /**
	 * initialize instance
	 */
    init() {
        super.createFilters(this.filters.bind(this))
        super.createPath()
    }

}