const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const dbConnection  = async  () => {


        try {

            await mongoose.connect(
                process.env.DB_CONNECT, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
            console.log('DB CONNECT')

        } catch (e) {
            console.log(e)
            throw new Error('error  init database')
        }
}

module.exports = {
    dbConnection
}
