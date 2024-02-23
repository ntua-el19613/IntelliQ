const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	Parameter1:{
		type:'string',
		alias:['healthcheck','resetall','questionnaire_upd','resetq',
		'questionnaire','question','doanswer','getsessionanswers','getquestionanswers','admin'],
		desc: 'The command of'
	}
};

const commands = {
	help: { desc: `Print help info` },
	healthcheck:{ desc:'Confirms end-to-end Connectivity' },
	questionnaire_upd:{desc:'Uploads a new Questionnaire'},
	resetall:{desc:'resets all data'},
	resetq:{desc:'deletes all answers of specific questionnaire'},
	questionnaire:{desc:'Display questionnaire'},
	question:{desc:'Display info about question'},
	doanswer:{desc:'Answer the question'},
	getsessionanswers:{desc:'Display answers of a specific session'},
	getquestionanswers:{desc:'display answers of specific question'}
};

const helpText = meowHelp({
	name: `cli42`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
