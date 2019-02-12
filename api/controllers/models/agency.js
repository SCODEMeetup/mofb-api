class Agency {
    constructor(res) {
        this.id = res.AGENCY_ID;
        this.name = res.NAME;
        this.locationId = res.LOCATION_ID;
        this.taxonomyId = res.TAXON_ID;
    }

    static getList(res) {
        let agencyList = [];
        res.forEach(r => {
            const t = new Agency(r);
            agencyList.push(t);
        });
        return agencyList;
    }

    static getObject(res) {
        return new Agency(res);
    }
}

module.exports = Agency;