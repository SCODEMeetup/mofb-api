class Agency {
    constructor(res) {
        this.id = String(res.agency_id)
        this.name = res.name
        this.locationId = String(res.location_id)
        this.taxonomyId = res.taxon_id
    }

    static get(res) {
        let agencyList = [];
        res.forEach(r => {
            const t = new Agency(r);
            agencyList.push(t);
        });
        return agencyList;
    }
}

module.exports = Agency;