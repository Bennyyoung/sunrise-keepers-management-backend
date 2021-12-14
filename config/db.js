const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');


const connectDB = async () => {
	const CONNECTION_URL = 'mongodb+srv://sunrise-keepers:sunrise-keepers@cluster0.kxwtn.mongodb.net/sunrise-keepers?retryWrites=true&w=majority'
	try {
		await mongoose.connect(CONNECTION_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');

		mongoose.set('useFindAndModify', false);
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;