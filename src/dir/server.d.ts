import * as express from 'express';
/**
 * The server
 *
 * @class Server
 *
 */
export declare class Server {
    private port;
    app: express.Application;
    /**
     * Bootstrap the application.
     * @class Server
     * @method Bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    static bootstrap(): Server;
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor();
    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    api(): void;
    /**
     * Configure applicationIndexRoute
     *
     * @class Server
     */
    config(): void;
    private listen;
    /**
     * Create router
     *
     * @class Server
     * @method config
     * @return void
     */
    private routes;
}
