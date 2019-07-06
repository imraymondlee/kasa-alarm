const express = require('express');
const { Client } = require('tplink-smarthome-api');
const _ = require('lodash');
const bodyParser = require('body-parser')

let timer;

let endAlarmTime;
let startAlarmTime;
let nextIncrementTime;
let currentBrightness;

//temporary values are set for testing
const brightnessIncrement = 10;
const timeIncrement = 10;
const startingBrightness = 0;
const bulbIP = '192.168.1.139';

let app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/show-alarms', (req, res) => {
	console.log(endAlarmTime);
	if(endAlarmTime != undefined){
		res.send(endAlarmTime.toLocaleString());
	}else{
		res.send('No alarms have been set.');
	}
});


// Input wake up time. 
// Start time will start 30 minutes prior to wake up time.
// Every 3 minutes, will increase by 10 for 30 minutes.
app.post('/set-alarm', (req, res) => {
	//Take in string in format of 1/9/2019, 8:46:30 PM
	let body = _.pick(req.body, ['endAlarmTime']);

	endAlarmTime = new Date(body.endAlarmTime);
	startAlarmTime = new Date(endAlarmTime - 30*1000).toLocaleString(); // subtract 30 s
	//startAlarmTime = new Date(currentDate - 30*60*1000); // subtract 30 minutes
	nextIncrementTime = startAlarmTime;
	currentBrightness = startingBrightness;

	updateTime();
	res.send('Alarm Set!');
});


app.post('/delete-alarm', (req, res) => {
	console.log('*****Alarm deleted*****')
	endAlarmTime = 'No alarms have been set.'
	clearTimeout(timer);
	res.send('Alarm deleted!');
});

app.post('/bulb-on', (req, res) => {
	bulbOn();
	res.status(200).send('Bulb On!');
});

app.post('/bulb-off', (req, res) => {
	bulbOff();
	res.status(200).send('Bulb Off!');
});

const client = new Client();

bulb = client.getBulb({host: bulbIP});

const updateTime = () => {
	let date = new Date();

	console.log('CURRENT TIME: ' + date.toLocaleString());
	timer = setTimeout(updateTime, 1000);

	console.log('nextIncrementTime: ' + nextIncrementTime);
	console.log('currentBrightness: ' + currentBrightness);
	console.log('-----------------------------------------------');

	 if(date.toLocaleString() == startAlarmTime){
		bulb.lighting.setLightState({on_off: true, brightness: currentBrightness}).then((state) => {
			console.log(state);
		});
		nextIncrementTime = new Date(nextIncrementTime);
		//10s for testing
		nextIncrementTime.setSeconds(nextIncrementTime.getSeconds() + timeIncrement);
		// nextIncrementTime.setMinutes(nextIncrementTime.getMinutes() + timeIncrement);
		nextIncrementTime = nextIncrementTime.toLocaleString();

		currentBrightness = currentBrightness + brightnessIncrement;
		console.log('***********Lights On****************');
	}


	if(date.toLocaleString() == nextIncrementTime){
		bulb.lighting.setLightState({brightness: currentBrightness}).then((state) => {
			console.log('Current Brightness: ' + currentBrightness);
		});
		nextIncrementTime = new Date(nextIncrementTime);
		//10s for testing		
		nextIncrementTime.setSeconds(nextIncrementTime.getSeconds() + timeIncrement);
		// nextIncrementTime.setMinutes(nextIncrementTime.getMinutes() + timeIncrement);		
		nextIncrementTime = nextIncrementTime.toLocaleString();

		currentBrightness = currentBrightness + brightnessIncrement;
		console.log('***********Brightness Increased****************');
	}

	if(date.toLocaleString() == endAlarmTime.toLocaleString()){
		bulb.lighting.setLightState({on_off: false}).then((state) => {
			console.log(state);
		});
		currentBrightness = startingBrightness;
		console.log('***********Alarm Stopped****************');
		clearTimeout(timer);
	}

}

const bulbOff = () => {
	bulb.lighting.setLightState({on_off: false}).then((state) => {
		console.log(state);
	});
}

const bulbOn = () => {
	bulb.lighting.setLightState({on_off: true, brightness: 100}).then((state) => {
		console.log(state);
	});
}

app.listen(8000, () => {
	console.log('Server started on port 8000.')
})