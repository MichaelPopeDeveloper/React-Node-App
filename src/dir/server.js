"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var user_1 = require("./routes/user");
var mongoose_1 = require("mongoose");
/**
 * The server
 *
 * @class Server
 *
 */
var Server = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    function Server() {
        this.port = 3001;
        // create expressjs application.
        this.app = express();
        // configure application.
        this.config();
        // add routes
        this.routes();
        this.listen();
        // add api
        this.api();
    }
    /**
     * Bootstrap the application.
     * @class Server
     * @method Bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    Server.prototype.api = function () {
        // empty for now
    };
    /**
     * Configure applicationIndexRoute
     *
     * @class Server
     */
    Server.prototype.config = function () {
        // add static paths
        this.app.use(express.static(path.join(__dirname, 'public')));
        // use logger middleware
        this.app.use(logger('dev'));
        // use json form parser middleware
        this.app.use(bodyParser.json());
        // use query string parser middleware
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));
        mongoose_1.connect('mongodb://localhost:27017/note-app', { useNewUrlParser: true })
            .then(function () { return console.log('Connected to MongoDB'); })
            .catch(function (err) { return console.log(err); });
        // use cookie parser middleware
        // this.app.use(cookieParser("SECRET_GOES_HERE"));
        // use override middleware
        // this.app.use(methodOverride());
        // catch 404 and forward to error handler
        // this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        //     err.status = 404;
        //     next(err);
        // });
        // error handling
        // this.app.use(errorHandler());
    };
    // public routes() {
    //     // empty for now
    // }
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Listening on port " + _this.port);
        });
    };
    /**
     * Create router
     *
     * @class Server
     * @method config
     * @return void
     */
    Server.prototype.routes = function () {
        // use router middleware
        this.app.use('/user', user_1.userRoute);
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map