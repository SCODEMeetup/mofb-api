const request = require("request");
const Cache = require('../../cache');
/**
 * Utility Service class for external requests
 */
class RequestUtils {
    static instance() {
        if(!this.INSTANCE) {
            this.INSTANCE = new RequestUtils();
            this.INSTANCE.cache = Cache.instance();
        }
        return this.INSTANCE;
    }

    /**
     * Override cache for request utils
     * @param {Cache} cache 
     */
    setCache(cache) {
        this.cache = cache;
    }

    /**
     * Gets paging params from request or sets defaults if not present
     * @param req Request
     */
    getPagingParams(req) {
        const limit = req.query.limit || 100;
        const pageNumber = req.query.pageNumber || 1;

        const offset = limit * (pageNumber - 1);
        return {
            offset,
            limit
        }
    }

    /**
     * Handle request for list of objects
     * @param uri URI for request
     * @param res Response
     * @param mapper Maps data set to object
     */
    getList(uri, res, mapper) {
        const cached = this.cache.get(uri);
        if (cached) {
            res.send(cached);
        }
        else {
            this.handleRequest(uri, res, this.handleListResponse(uri, res, mapper));
        }
    }

    /**
     * Handle request for single object GET
     * @param uri URI for request
     * @param res Response
     * @param mapper Maps data set to object
     */
    getObject(uri, res, mapper) {
        const cached = this.cache.get(uri);
        if (cached) {
            res.send(cached);
        }
        else {
            this.handleRequest(uri, res, this.handleObjectResponse(uri, res, mapper));
        }
    }

    /**
     * Handles request
     * @param {string} uri URI for request
     * @param {Response} res Response object
     * @param {Function} callBack Callback function
     */
    handleRequest(uri, res, callBack) {
        const options = getRequestOptions(uri);
        sendRequest(options, res, callBack);
    }

    /**
     * Callback to handle requests for lists
     * @param {string} uri URI for request
     * @param {Response} res Response object
     * @param {Function} mapper Mapper function for results
     */
    handleListResponse(uri, res, mapper) {
        return body => {
            const result = mapper ? mapper(body.result.records) : body.result.records;
            this.cache.set(uri, result, this.cache.TTL_SECS_DEFAULT);
            res.send(result);
        };
    }

    /**
     * Callback to handle requests for single objects
     * @param {string} uri URI for request
     * @param {Response} res Response object
     * @param {Function} mapper Mapper function for result
     */
    handleObjectResponse(uri, res, mapper) {
        return body => {
            if (body.result.records.length === 0) {
                res.status(404).send("No results for query");
            } else {
                const result = mapper(body.result.records);
                this.cache.set(uri, result[0], this.cache.TTL_SECS_DEFAULT);
                res.send(result[0]);
            }
        }
    }
}

module.exports = RequestUtils;

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