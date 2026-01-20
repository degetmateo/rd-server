import postgres from "postgres";

class Database {
    private connection: postgres.Sql<any>;

    constructor () {
        this.connection = postgres({
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            database: process.env.DATABASE_NAME,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            ssl: "require"
        });
    };

    public query () {
        return this.connection;
    };

    public async init () {
        try {
            console.log('🟨 | Conectandose a la base de datos...');
            await this.connection`SELECT 1`;
            console.log('🟩 | Base de datos Postgres conectada.');
        } catch (error) {
            console.error('🟥 | Error: ', error);
            console.log('🟨 | Reintentando conexion a la base de datos en 10 segundos...');

            setTimeout(async () => {
                this.init();
            }, 10000);
        }
    };
};

export default new Database();