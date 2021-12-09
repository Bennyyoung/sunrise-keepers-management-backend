const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect('mongodb+srv://sunrise-keepers:sunrise-keepers@cluster0.kxwtn.mongodb.net/sunrise-keepers?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			// useCreateIndex: true,
			// useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
