class Location {
    constructor(res) {
        this.id = res.location_id
        this.address1 = res.street_1
        this.address2 = res.street_2
        this.zipCode = res.zip
        this.name = res.name
        this.areaCode = res.phone_area_code
        this.phoneNumber = res.phone_number
        this.phoneExtension = res.phone_extension
        this.handicapAccessFlag = res.handicap_access
        this.hours = res.hours
        this.lat = res.lat
        this.long = res.long
    }

    static get(res) {
        let locationList = []
        res.forEach(r => {
            const t = new Location(r)
            locationList.push(t)
        })
        return locationList
    }
}

module.exports = Location