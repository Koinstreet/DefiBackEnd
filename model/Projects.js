const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	requirements: {
		type: String,
		trim: true,
	},
	likelihood_to_hire: {
		type: String,
		trim: true,
	},
	tech_stack: {
		type: String,
		trim: true,
	},
	type_of_business: {
		type: String,
		trim: true,
	},
	industry_of_business: {
		type: String,
		trim: true,
	},
	deployment_deadline: {
		type: Date,
	},
	estimated_budget_range: {
		type: Number,
	},
	additional_details: {
		type: String,
		trim: true,
	},
});

module.exports = mongoose.model('Projects', projectsSchema);
