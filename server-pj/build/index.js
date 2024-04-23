"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
//importamos las rutas
const produccionRoutes_1 = __importDefault(require("./routes/produccionRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.ruotes();
    }
    config() {
        this.app.set('port', process.env.PORT || 4000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        // this.app.use(express.json({ limit: '100mb' }));
        // this.app.use(express.urlencoded({ limit: '100mb', extended: true }));
    }
    ruotes() {
        this.app.use('/', produccionRoutes_1.default);
        // this.app.get('/',(req,res)=>{
        //     res.send('hola desde el servidor')
        // })
    }
    star() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server listening in port ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.star();
