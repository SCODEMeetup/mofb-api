class Agency {
    constructor(res) {
        this.id = res.AGENCY_ID;
        this.name = res.NAME;
        this.locationId = res.LOCATION_ID;
        this.taxonomyId = res.TAXON_ID;
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