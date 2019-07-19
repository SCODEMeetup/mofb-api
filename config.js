const config = {
    test_env: "test",
    test_port: 3001,
    development: {
        host: "https://data.smartcolumbusos.com",
        agency_location_resource: "570a8e02_fb0e_4cee_895b_3b32bd740650",
        service_location_resource: "ec24773c_7cff_4589_9e2f_bcdeb5cdfd48",
        taxonomy_resource: "371dd944_411c_4851_a065_9f3f605ddfb9",
        service_taxonomy_resource: "2a919af7_12d3_47a4_b86a_56692e2e1623",
        agency_service_resource: "49b19dab_a7a8_4049_add2_7a0a1f0cce07",
        agency_resource: "6425f64b_f162_4cd4_b271_5038b6752df5"
    },
    test: {
        host: "testHost",
        agency_location_resource: "testAgencyLocationResource",
        service_location_resource: "testServiceLocationResource",
        taxonomy_resource: "testTaxonomyResource",
        service_taxonomy_resource: "testServiceTaxonomyResource",
        agency_service_resource: "testAgencyServiceResource",
        agency_resource: "testAgencyResource"
    }
};

module.exports = config;