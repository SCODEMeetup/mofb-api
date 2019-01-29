const request = require("request");

module.exports = {
    getPagingParams: function (req) {
        const limit = req.query.limit || 100;
        const pageNumber = req.query.pageNumber || 1;

        const offset = limit * (pageNumber - 1);
        return {
            offset,
            limit
        }
    },
    getRequestUri: function (req, uri, params) {
        const {
            offset,
            limit
        } = this.getPagingParams(req);
        let requestUri = uri + `&offset=${offset}&limit=${limit}`;
        if (params) {
            requestUri = `${requestUri}&${params}`;
        }
        return requestUri;
    },
    sendRequest: function (uri, res) {
        const options = {
            body: {},
            headers: {
                "Content-Type": "application/json"
            },
            json: true,
            method: "GET",
            uri
        };

        request(options, function (error, response, body) {
            console.log("statusCode:", response && response.statusCode);
            if (error || !body.success) {
                Object.keys(body.error).forEach(key => {
                    console.log(key + ": " + body.error[key]);
                });
                res.status(400).send("Could not complete request");
            } else {
                res.send(body.result.records);
            }
        });
    }
}