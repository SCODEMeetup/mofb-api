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
     * Handle request for list of objects
     * @param uri URI for request
     * @param res Response
     * @param mapper Maps data set to object
     */
    getList: function (uri, res, mapper) {
        const options = getRequestOptions(uri);
        const callBack = function(body) {
            const result = mapper ? mapper(body.result.records) : body.result.records;
            res.send(result);
        }
        sendRequest(options, callBack);
    },

    /**
     * Handle request for single object GET
     * @param uri URI for request
     * @param res Response
     * @param mapper Maps data set to object
     */
    getObject: function (uri, res, mapper) {
        const options = getRequestOptions(uri);
        sendRequest(options, function(body) { 
            res.send(mapper(body.result.records[0])); 
        });
    },
}

function getRequestOptions(uri) {
    return {
        body: {},
        headers: {
            "Content-Type": "application/json"
        },
        json: true,
        method: "GET",
        uri
    };
}

function sendRequest(options, callback) {
    request(options, function (error, response, body) {
        console.log("statusCode:", response && response.statusCode);
        if (error || !body.success) {
            Object.keys(body.error).forEach(key => {
                console.log(key + ": " + body.error[key]);
            });
            res.status(400).send("Could not complete request");
        } else {
            callback(body);
        }
    });
}
