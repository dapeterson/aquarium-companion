

// Skins
let whiteSkin = new Skin({ fill:"white" });
let blueSkin = new Skin({ fill: "#4286f4" });
// Styles
let titleStyle = new Style( { font: "bold 20px", color:"white" } );
let buttonStyle = new Style({font: '16px', color: 'white'});
let textStyle = new Style({font: '16px', color: 'black'});


export var data_screen_template = Column.template($ => ({
   left: 0, right: 0, top: 0, bottom: 0,
   skin: whiteSkin,
   contents: [
       new Container({
			left:0, right:0, height: 30, skin: blueSkin,
			contents: [
				new Container({
					left: 0, right: 180, top: 0, bottom: 0, skin: blueSkin, active: true,
					contents: [
						new Label({ string: '<BACK', style: buttonStyle })
					],
					behavior: Behavior ({
						onTouchEnded: function(content, id, x, y, ticks) {
							application.distribute("onBack");
						}
					})
				}),
				new Label({ string: 'Data', style: titleStyle })
			]
		}),
		// Contents of the food screen
		new Label({ top: 10, string: 'Data screen', style: textStyle }),
   ]
}));

