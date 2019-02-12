class Location {
    constructor(res) {
        this.id = res.LOCATION_ID;
        this.address1 = res.STREET_1;
        this.address2 = res.STREET_2;
        this.zipCode = res.ZIP;
        this.name = res.NAME;
        this.areaCode = res.PHONE_AREA_CODE;
        this.phoneNumber = res.PHONE_NUMBER;
        this.phoneExtension = res.PHONE_EXTENSION;
        this.handicapAccessFlag = res.HANDICAP_ACCESS;
        this.hours = res.HOURS;
    }

    static getList(res) {
        let locationList = [];
        res.forEach(r => {
            const t = new Location(r);
            locationList.push(t);
        });
        return locationList;
    }
}

module.exports = Location;