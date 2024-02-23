#!'C:\\Program Files\\nodejs\\node.exe'

/**
 * cli42
 * The CLI of our app
 *
 * @author Team42 <none>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
//Δεν το χρησιμοποιησα
//const axios=require('axios');
//Library για string operations
var S=require('string');

const input = cli.input;
const flags = cli.flags;
const MyURLGet='https://localhost:9103/intelliq_api/';
const MyURLPost='https://localhost:9103/admin/';

const mycommands = {
	//Με την δομη του dothe,μπορω να ομαδοποιησω την λειτουργια του script
	//Σε περιπτωσεις οπου η λειτουργια ειναι ιδια,δηλαδη σε εντολες
	//με ιδιο πληθος ορισματων
	help: { 
		dothe:-1,
		desc: `Print help info` 
	},
	healthcheck:{ 
		dothe:0,
		method:'get', 
		desc:'Confirms end-to-end Connectivity' 
	},
	resetall:{
		dothe:0,
		method:'post',
		desc:'resets all data'
	},
	questionnaire_upd:{
		dothe:1,
		method:'post',
		syntaxcheck:'--source',
		desc:'Uploads a new Questionnaire'
	},
	resetq:{
		dothe:1,
		method:'post',
		syntaxcheck:'--questionnaire_id',
		desc:'deletes all answers of specific questionnaire'
	},
	questionnaire:{
		dothe:1,
		method:'get',
		syntaxcheck:'--questionnaire_id',
		desc:'Display questionnaire'
	},
	question:{
		dothe:2,
		method:'get',
		syntaxcheck1:'--questionnaire_id',
		syntaxcheck2:'--question_id',
		desc:'Display info about question'
	},
	doanswer:{
		dothe:4,
		method:'post',
		option:'--newsessionid',
		syntaxcheck1:'--questionnaire_id',
		syntaxcheck2:'--question_id',
		syntaxcheck3:'--session_id',
		syntaxcheck4:'--option_id',
		desc:'Answer the question'
	},
	getsessionanswers:{
		dothe:2,
		method:'get',
		syntaxcheck1:'--questionnaire_id',
		syntaxcheck2:'--session_id',
		desc:'Display answers of a specific session'
	},
	getquestionanswers:{
		dothe:2,
		method:'get',
		syntaxcheck1:'--questionnaire_id',
		syntaxcheck2:'--question_id',
		desc:'display answers of specific question'
	},
	mydebug:{
		dothe:-1,
		option:'--method',
		method:'',
		desc:'Run a specific url request to the server'
	},
	Dothis: function(thecommand){
		//Η eval παιρνει string και το μετατρεπει σε κωδικα.Με αυτο τον τροπο μπορω
		//να περασω την μεταβλητη στην μεθοδο
		return Object.getOwnPropertyDescriptor(eval('this.'+thecommand), 'dothe').value;
	}
};

const optionspost={
	protocol:'https:',
	hostname:'localhost',
	method:'POST',
	port:9103,
	path:'',

}

const { clear, debug } = flags;

const https = require('node:https');
const { exit } = require('node:process');
const { check } = require('prettier');
const { convertArrayToCSV } = require('convert-array-to-csv');

//SOS
//Να κανω Testing για CLI,unit και Functional

//Να βαλω στο readme αυτα:
//npm i body-parser convert-array-to-csv cors dotenv ejs express fs morgan mysql nodemon package path jest-environment-jsdom convert-array-to-csv react-scripts

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);

	//Proper syntax check procedure
	var checksyntax=false;
	if((process.argv.length<3)||(process.argv.length>13)||(Object.hasOwn(mycommands,process.argv[2])!=1)) {
		//console.log('stage1');
		checksyntax=true;
	}
	else{
		//delving down to command specifics
		//For 1 parameter
		if(process.argv.length==7){
				if((process.argv[3].localeCompare(eval('mycommands.'+process.argv[2]+'.syntaxcheck'))!=0)||(process.argv[4]<0)) {
					//console.log('yup,wrong command');
					checksyntax=true;
				}
		}
		//for 2 parameters
		else if(process.argv.length==9){
				if((process.argv[3].localeCompare(eval('mycommands.'+process.argv[2]+'.syntaxcheck1'))!=0)||
				(process.argv[5].localeCompare(eval('mycommands.'+process.argv[2]+'.syntaxcheck2'))!=0)||
				(process.argv[4]<0)||(process.argv[6]<0)) {
					//console.log('stage 3');
					checksyntax=true;
				}
		}
		//for doanswer
		else if((process.argv.length==11)||(process.argv.length==4)){
			//Αμα δεν χρησιμοποιει το option --newsessionid
			if(process.argv[3].localeCompare('--newsessionid')!=0){
				if((process.argv[3].localeCompare(eval('mycommands.'+process.argv[2]+'.syntaxcheck1'))!=0)||
					(process.argv[5].localeCompare(eval('mycommands.'+process.argv[2]+'.syntaxcheck2'))!=0)||
					(process.argv[7].localeCompare(eval('mycommands.'+process.argv[2]+'.syntaxcheck3'))!=0)||
					(process.argv[9].localeCompare(eval('mycommands.'+process.argv[2]+'.syntaxcheck4'))!=0)||
					(process.argv[4]<0)||(process.argv[6]<0)||(process.argv[8]<0)||(process.argv[10]<0)){
						checksyntax=true;
				}
			}
		}
		
	}
	//check the --format option if the commands are not admin or doanswer
	if((process.argv[2]!="healthcheck")&&(process.argv[2]!="doanswer")&&(process.argv[2]!="questionnaire_upd")&&
	(process.argv[2]!="resetall")&&(process.argv[2]!="resetq")){
		if(process.argv[process.argv.length-2].localeCompare('--format')!=0||
		((process.argv[process.argv.length-1].localeCompare('json')!=0)&&(process.argv[process.argv.length-1].localeCompare('csv')!=0))){
			checksyntax=true;
		}	
	}
	
	//If the syntax is wrong
	if (checksyntax==true){
		console.log("Incorrect Syntax,you should try:\n\nnode se2242 scope --param1 value1 [--param2 value2 ...] --format fff");
		console.log("\nExample:\nnode se2242.js questionnaire --questionnaire_id 0 --format json\n")
		return 1;
	}
	//Syntax check ends

	//Form the url.The method in mycommands object just refers to whether we use /intelliq_api or /admin
	let actualurl='';
	if (eval('mycommands.'+process.argv[2]+'.method.localeCompare("get")==0')) actualurl=MyURLGet;
	else if ((eval('mycommands.'+process.argv[2]+'.method.localeCompare("post")==0'))||(process.argv[2].localeCompare('healthcheck')==0)) actualurl=MyURLPost;
	
	if(mycommands.Dothis(process.argv[2])==-1){
		//for mydebug
		url=process.argv[5];
		if (process.argv[4].localeCompare('get')==0) mycommands.mydebug.method='get';
		else if (process.argv[4].localeCompare('post')==0) mycommands.mydebug.method='Post';
	}
	else if (mycommands.Dothis(process.argv[2])==0){
		//for no parameters
		url=actualurl+process.argv[2];
	}
	else if(mycommands.Dothis(process.argv[2])==1){
		//for 1 parameter

		//Specific treatment for questionnaire_upd
		if(process.argv[2].localeCompare('questionnaire_upd')==0){
			url=actualurl+process.argv[2]+'/'+process.argv[4].replaceAll('/','-_-');
		}
		else url=actualurl+process.argv[2]+'/'+process.argv[4];
	}
	else if(mycommands.Dothis(process.argv[2])==2){
		//for 2 parameters
		url=actualurl+process.argv[2]+'/'+process.argv[4]+'/'+process.argv[6];
	}
	else if(mycommands.Dothis(process.argv[2])==4){
		//for doanswer,it uses intelliq_api instead of admin
		url=MyURLGet+process.argv[2]+'/'+process.argv[4]+'/'+process.argv[6]+'/'+process.argv[8]+'/'+process.argv[10];
	}

	//Προσπερναει το self signed certificate
	process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

	//if cli is run with command 'doanswer' and option '--newsessionid'
	if((process.argv[2].localeCompare('doanswer')==0)&&(process.argv[3].localeCompare('--newsessionid')==0)){
		optionspost.path='/intelliq_api/newsession';
		const post = https.request(optionspost);
		post.on('error', (error) => {
    		console.log('An error', error);
			exit(1);
		});
		post.end()
		const request = https.request("https://localhost:9103/intelliq_api/lastsession", (response) => {
    		let data = '';
    		response.on('data', (chunk) => {
    	    	data = data + chunk.toString();
    		});
    		response.on('end', () => {
				const body=JSON.parse(data);
				console.log("Use this sessionid to fill the questionnaire:",body[0].e_id);
    		});
		})
  
		request.on('error', (error) => {
    		console.log('An error', error);
		});
  
		request.end() 
		
	}
	else{
		//Check if it is a /intelliq_api request or a /admin request
		if(eval('mycommands.'+process.argv[2]+'.method.localeCompare("get")==0')){
			//add correct format to url
			
			if (process.argv[process.argv.length-1]=="json") url=url+"?format=json";
			else url=url+"?format=csv";

			const request = https.request(url, (response) => {
				//Αρχικοποιει την μεταβλητη
    			let data = '';
				//Αμα εχει πληροφορια,προσθεσε την στο data
    			response.on('data', (chunk) => {
    	    		data = data + chunk.toString();
    			});
				//Οταν τελειωσεις να λαμβανεις πληροφοριες κανε αυτο
    			response.on('end', () => {
					if(process.argv[process.argv.length-1]=="csv"){
						console.log(data);
					}
					else{
						const body=JSON.parse(data);
						//Με το stringify εμφανιζονται JSON objects μεσα στο object,αφου τα μετατρεψει σε string
						console.log(JSON.stringify(body,null,3));
					}
    			});
			})

			request.on('error', (error) => {
    			console.log('An error', error);
			});
  
			request.end()
		}
		else{
			optionspost.path=url;
			const request=https.request(optionspost,(response)=>{
				let data='';
				response.on(data,(chunk)=>{
					data=data+chunk.toString();
				});
				response.on('end',()=>{
					const body=JSON.parse(data);
					console.log(JSON.stringify(body,null,3));
				});
			});
			request.on('error',(error)=>{
				console.log('An error happened:',error)
			});
			request.end()
		}
	}
})();
