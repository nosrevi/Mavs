$(function() {// Init controller
var controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    duration: $('section').height(),
    triggerHook: 0,
    reverse: true
  }
});

/*
scene_object = {
  '[scene-name]' : {
    '[target-scene-id]' : '[anchor-href-value]'
  }
}
*/

// var tween = TweenMax.to('#start h1', 1, {
//     transform: 'translateY(10px) scale(2)',
//   });
var mavsIntro = new TimelineMax();
mavsIntro
// .from('#pin1', 1, {yPercent: 50,xPercent:100,ease:Power4.easeInOut})
.to('#pin1', 0.5, {opacity: 0.5, rotationX:90, scale: 5, ease: Power4.easeOut});

new ScrollMagic.Scene({
		duration: '70%'
	})
	.setTween(mavsIntro)
	.triggerElement('#start')
  .addIndicators()
	.addTo(controller);

var scenes = {
  // 'intro': {
  //   'anchor': '#start',
    // 'tweens': [
    //   tween
    // ],
  // },
  // 'scene2': {
  //   'anchor': '#s1617',
  // },
  // 'scene3': {
  //   'section-2': 'anchor2'
  // },
  // 'scene4': {
  //   'section-3': 'anchor3'
  // },
  // 'scene3': {
  //   'pin': '#pin1'
  // }

}

for(var key in scenes) {
  // skip loop if the property is from prototype
  if (!scenes.hasOwnProperty(key)) continue;

  var obj = scenes[key];

  // for (var prop in obj) {
    // skip loop if the property is from prototype
  if (obj.hasOwnProperty('anchor')) {
    new ScrollMagic.Scene({ triggerElement: obj['anchor']})
        .setClassToggle('#'+obj['anchor'], 'active')
        // .setTween(obj['tweens'][0])
        .addIndicators()
        .addTo(controller);
  } else if (obj.hasOwnProperty('pin')) {
    new ScrollMagic.Scene({
      triggerElement: '#pin1',
      // triggerElement: obj['pin'],
      duration: $(window).height() - 200,
      triggerHook: 0,
      reverse: true
    })
    .setPin('#pin1')
    .addIndicators()
    .addTo(controller);
  }

  // }
}

// define movement of panels
var wipeAnimation = new TimelineMax()
	.fromTo("#s1617", 1, {x: "0%"}, {x: "-50%", ease: Linear.easeNone});
// 	.fromTo("section.red",    1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone})
// 	.fromTo("section.blue", 1, {y: "-100%"}, {y: "0%", ease: Linear.easeNone});
//
new ScrollMagic.Scene({
				triggerElement: "#s1617",
				triggerHook: "onLeave",
				duration: "200%"
			})
			.setPin("#s1617")
			.setTween(wipeAnimation)
			.addIndicators()
			.addTo(controller);


// Change behaviour of controller
// to animate scroll instead of jump
controller.scrollTo(function(target) {

  TweenMax.to(window, 0.5, {
    scrollTo : {
      y : target,
      autoKill : true // Allow scroll position to change outside itself
    },
    ease : Cubic.easeInOut
  });

});


//  Bind scroll to anchor links using Vanilla JavaScript
var anchor_nav = document.querySelector('.anchor-nav');

anchor_nav.addEventListener('click', function(e) {
  var target = e.target,
      id     = target.getAttribute('href');

  if(id !== null) {
    if(id.length > 0) {
      e.preventDefault();
      controller.scrollTo(id);

      if(window.history && window.history.pushState) {
        history.pushState("", document.title, id);
      }
    }
  }
});
});
