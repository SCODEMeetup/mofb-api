class Taxonomy {
  constructor(res) {
    this.id = String(res.taxon_id);
    this.code = res.taxonomy_code;
    this.description = res.description;
    this.level = String(res.taxonomy_level);
    this.parentCategoryId = String(res.taxon_id_subcat_of);
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
