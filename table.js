var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TableSchema = new Schema(
{
	id: Number,
	regnum: Number,
	FIO: String,
	original: Boolean,
	medal: Boolean,
	withoutExams: String,
	specRight: Boolean,
	target: Boolean,
	essay: Number,
	subjectFirst: Number,
	subjectSecond: Number,
	subjectThird: Number,
	gradEssay: Number,
	achiv: Number,
	sumAchiv: Number,
	sumPoints: Number,
	formOfEduc: String,
	priority: Boolean,
	accomodation: Boolean,
	contract: Boolean,
	contractPaid: Boolean,
	discount: Number,
	returnDocs: Boolean,
	email: String,
	tel: String,
	regionOfresid: String,
	regionOfSchool: String,
	contests: String,
	secLang: String,

});
module.exports = mongoose.model('Table', TableSchema, 'tables');
