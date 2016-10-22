'use strict';


var Cylon = require('Cylon');


Cylon.robot({
  connections: {
    ardrone: {
      adaptor: 'ardrone',
      port: '192.168.1.1'
    },
    leapmotion: {
      adaptor: 'leapmotion'
    }
  },
  devices: {
    drone: {
      driver: 'ardrone',
      connection: 'ardrone'
    },
    leapmotion: {
      driver: 'leapmotion',
      connection: 'leapmotion'
    }
  },
  work: function(my) {
    my.leapmotion.on('frame', function(frame) {
      console.log(frame.toString());
      if(frame.hands.length > 0) {
        my.drone.takeoff();

        after((10).seconds(), function() {
          my.drone.land();
        });

        after((10).seconds(), function() {
          my.drone.stop();
        });
      }
    });

  }
}).start();
