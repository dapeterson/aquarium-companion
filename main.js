

// Companion App
// Written by Daniel Peterson for CS 160



let deviceURL = "";

import { feed_screen_template } from "feed_screen";
import { tank_screen_template } from "tank_screen";
import { data_screen_template } from "data_screen";
import { schedule_screen_template } from "schedule_screen";


// Skins
let whiteSkin = new Skin({ fill:"white" });
let blueSkin = new Skin({ fill: "#4286f4" });
// Styles
let titleStyle = new Style( { font: "bold 20px", color:"white" } );
let buttonStyle = new Style({font: '16px', color: 'white'});


// Main screen navigation buttons
let feed_button = new Container({
	top: 15, height: 25, width: 100, skin: blueSkin, active: true,
	contents: [new Label({ string: 'Feed', style: buttonStyle })],
	behavior: Behavior ({
		onTouchBegan: function(content, id, x, y, ticks) {
			//if (deviceURL != "") new Message(deviceURL + "getFood").invoke(Message.JSON).then(json => { foodCount = json.count });
		},
		onTouchEnded: function(content, id, x, y, ticks) {
			application.distribute("onFeedOpen");			
		}
	})
});

let tank_button = new Container({
	top: 8, height: 25, width: 100, skin: blueSkin, active: true,
	contents: [new Label({ string: 'Tank', style: buttonStyle })],
	behavior: Behavior ({
		onTouchBegan: function(content, id, x, y, ticks) {
			//if (deviceURL != "") new Message(deviceURL + "getTank").invoke(Message.JSON).then(json => { foodCount = json.count });
		},
		onTouchEnded: function(content, id, x, y, ticks) {
			application.distribute("onTankOpen");			
		}
	})
});

let data_button = new Container({
	top: 8, height: 25, width: 100, skin: blueSkin, active: true,
	contents: [new Label({ string: 'Data', style: buttonStyle })],
	behavior: Behavior ({
		onTouchBegan: function(content, id, x, y, ticks) {
			//if (deviceURL != "") new Message(deviceURL + "getData").invoke(Message.JSON).then(json => { foodCount = json.count });
		},
		onTouchEnded: function(content, id, x, y, ticks) {
			application.distribute("onDataOpen");			
		}
	})
});

let schedule_button = new Container({
	top: 8, height: 25, width: 100, skin: blueSkin, active: true,
	contents: [new Label({ string: 'Schedule', style: buttonStyle })],
	behavior: Behavior ({
		onTouchBegan: function(content, id, x, y, ticks) {
			//if (deviceURL != "") new Message(deviceURL + "getData").invoke(Message.JSON).then(json => { foodCount = json.count });
		},
		onTouchEnded: function(content, id, x, y, ticks) {
			application.distribute("onScheduleOpen");			
		}
	})
});


// Main screen definition
let main_screen = new Column({
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,
	contents: [
		new Container({
			left: 0, right: 0, height: 30, skin: blueSkin,
			contents: [
				new Label({ string: 'Aquarium', style: titleStyle })
			]
		}),
		new Picture({ top: 25, height: 110, url: 'assets/aquarium_stream.png'}),
		feed_button,
		tank_button,
		data_button,
		schedule_button
	]
});


// Handlers for connection
Handler.bind("/discover", Behavior({
    onInvoke: function(handler, message){
        deviceURL = JSON.parse(message.requestText).url;
    }
}));

Handler.bind("/forget", Behavior({
    onInvoke: function(handler, message){
        deviceURL = "";
    }
}));

var current_screen = main_screen;

// Application behavior definition
var ApplicationBehavior = Behavior.template({
	onLaunch: function() {
		application.discover("aquarium.device.app");
        application.add(current_screen);
	},
    onQuit: function(application) {
        application.forget("aquarium.device.app");
    },
    onFeedOpen: function() {
    	application.remove(current_screen);
    	current_screen = new feed_screen_template();
		application.add(current_screen);
	},
	onTankOpen: function() {
    	application.remove(current_screen);
    	current_screen = new tank_screen_template();
		application.add(current_screen);
	},
	onDataOpen: function() {
    	application.remove(current_screen);
    	current_screen = new data_screen_template();
		application.add(current_screen);
	},
	onScheduleOpen: function() {
    	application.remove(current_screen);
    	current_screen = new schedule_screen_template();
		application.add(current_screen);
	},
	onBack: function() {
		application.remove(current_screen);
		current_screen = main_screen;
		application.add(current_screen);
	}
});

application.behavior = new ApplicationBehavior();




