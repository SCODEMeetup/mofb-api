class Taxonomy {
    constructor(res) {
        this.id = res.TAXON_ID;
        this.code = res.TAXONOMY_CODE;
        this.description = res.DESCRIPTION;
        this.level = res.TAXONOMY_LEVEL;
        this.parentCategoryId = res.TAXON_ID_SUBCAT_OF;
    }

    static get(res) {
        let taxonomyList = [];
        res.forEach(r => {
            const t = new Taxonomy(r);
            taxonomyList.push(t);
        });
        return taxonomyList;
    }
}

module.exports = Taxonomy;