import express from "express";
import path from "path";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const PUBLIC_PATH = path.join(__dirname, '../public/');

class Server {
    private app: express.Express;

    constructor () {
        this.app = express();
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/public/', express.static(PUBLIC_PATH));
    };

    private middlewares () {
        this.app.use(cookieParser());
        this.app.use(
            cors({
              origin: process.env.FRONTEND_URL,
              credentials: true
            })
        );

        this.app.use((_, res, next) => {
            res.setHeader('X-Frame-Options', 'SAMEORIGIN');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Content-Security-Policy',
                "default-src 'self'; " +
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3000; " +
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
                "font-src 'self' http://localhost:3000; " +
                "img-src 'self' http://localhost:3000 blob: data:; " +
                "connect-src 'self' blob: data:; " +
                "frame-src 'self';"
              );
            next();
        });
    };

    private routes () {
        // this.app.use(this.paths.authentication, authenticationRouter);

        this.app.use((_, res) => {
            res.sendFile(path.join(PUBLIC_PATH, 'app.html'));
        });
    };

    public start () {
        this.middlewares();
        this.routes();

        const PORT = this.app.get('port');

        this.app.listen(PORT, () => {
            console.log(`Servidor iniciado en el puerto ${PORT}`);
        });
    };
};

export default new Server();