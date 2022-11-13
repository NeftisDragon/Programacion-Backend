const {
    default: mongoose
} = require("mongoose");

module.exports = class Database {
    constructor() {
        this.connectDB();
    }

    connectDB() {
        const URL = process.env.URL;
        mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to database.');
    }
}

const settings = {
    mysql: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 4000,
            user: 'root',
            password: '',
            database: 'project'
        }
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: './src/databases/mydb.sqlite'
        },
        useNullAsDefault: true
    }
}
module.exports = settings;