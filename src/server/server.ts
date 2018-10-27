import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import { IndexRoute } from './routes/index';
import { connect } from 'mongoose';

/**
 * The server
 *
 * @class Server
 *
 */
export class Server {
  private port: number = 3001;
  public app: express.Application;

  /**
   * Bootstrap the application.
   * @class Server
   * @method Bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
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
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    // empty for now
  }

  /**
   * Configure application
   *
   * @class Server
   */
  public config() {
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

    connect('mongodb://localhost:27017/note-app', { useNewUrlParser: true })
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.log(err));

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
  }

  // public routes() {
  //     // empty for now
  // }

  private listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }

  /**
   * Create router
   *
   * @class Server
   * @method config
   * @return void
   */
  private routes() {
    // use router middleware
    this.app.use('/', IndexRoute);

  }

}
