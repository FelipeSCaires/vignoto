class SearchIndex extends Filters {

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
            element: '.search-index__type',
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
                super.createPath()
            }
        })
    }

    /**
	 * tipoimovel filter
	 */
    tipoimovel(data) {
        const tipoimovelFilter = new JetSelect({
            element: '.search-index__property',
            name: 'filtro.tiposimoveis',
            optionsText: data.tipoImovelDescricao, 
            optionsValue: data.tipoImovelDescricao,
            label: 'Tipo',
            tags: true,
            tagsTarget: '.list__tags',
            onClickTag: () => super.search(),
            onChange: () => super.createPath()
        })
    }

    /**
	 * cidade filter
	 */
    cidade(data) {
        const cidadeFilter = new JetSelect({
            element: '.search-index__city',
            name: 'filtro.cidade',
            optionsText: data.cidadeNome,
            optionsValue: data.cidadeNome,
            label: 'Cidade',
            tags: true,
            tagsTarget: '.list__tags',
            onClickTag: () => super.search(),
            onChange: () => super.createPath()
            
        })
    }

    /**
	 * create filters
	 */
    filters(data) {
        this.imovelpara()
        this.tipoimovel(data.searchtipoimoveis)
        this.cidade(data.searchcidades)
    }

    /**
	 * initialize instance
	 */
    init() {
        super.createFilters(this.filters.bind(this))
        super.createPath()
    }

}