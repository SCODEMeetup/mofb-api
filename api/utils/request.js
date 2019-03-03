const request = require("request");
var cache = require('../../cache');

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
        cache.get(uri, (_err, val) => {
            if (val) {
                res.send(val);
            }
            else {
                const options = getRequestOptions(uri);
                const callBack = function (body) {
                    const result = mapper ? mapper(body.result.records) : body.result.records;
                    cache.set(uri, result, cache.TTL_SECS_DEFAULT);
                    res.send(result);
                }
                sendRequest(options, res, callBack);
            }
        });
    },

    /**
     * Handle request for single object GET
     * @param uri URI for request
     * @param res Response
     * @param mapper Maps data set to object
     */
    getObject: function (uri, res, mapper) {
        cache.get(uri, (_err, val) => {
            if (val) {
                res.send(val);
            }
            else {
                const options = getRequestOptions(uri);
                sendRequest(options, res, function (body) {
                    if (body.result.records.length === 0) {
                        res.status(404).send("No results for query");
                    } else {
                        const result = mapper(body.result.records);
                        cache.set(uri, result[0], cache.TTL_SECS_DEFAULT);
                        res.send(result[0]);
                    }
                });
            }
        });
    }
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

function sendRequest(options, res, callback) {
    request(options, function (_error, response, body) {
        console.log("statusCode:", response && response.statusCode);
        if (!body.success) {
            handleError(body, res);
        } else {
            callback(body);
        }
    });
}

function handleError(body, response) {
    if (body.error) {
        Object.keys(body.error).forEach(key => {
            console.log(key + ": " + body.error[key]);
        });
        response.status(400).send("Could not complete request");
    } else {
        response.status(500).send("Internal server error");
    }
}