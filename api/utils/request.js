const request = require("request");

module.exports = {
    /**
     * Gets paging params from request or sets defaults if not present
     * @param req Request
     */
    getPagingParams: function (req) {
        const limit = req.query.limit || 100;
        const pageNumber = req.query.pageNumber || 1;

        const offset = limit * (pageNumber - 1);
        return {
            offset,
            limit
        }
    },
    /**
     * Handle request
     * @param uri URI for request
     * @param res Response
     */
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