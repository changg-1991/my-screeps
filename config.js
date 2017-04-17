var config = new Object();

// Creep
config.creep = new Object();
config.creep._0Claimer = require('creep.0.claimer');
config.creep._0Exploiter = require('creep.0.exploiter');
// Room 1
config.creep._1DiggerLeft = require('creep.1.digger.left');
config.creep._1CarrierLeft = require('creep.1.carrier.left');
config.creep._1DiggerRight = require('creep.1.digger.right');
config.creep._1CarrierDown = require('creep.1.carrier.down');
config.creep._1Upgrader = require('creep.1.upgrader');
config.creep._1Builder = require('creep.1.builder');
config.creep._1Eva = require('creep.1.eva');
config.creep._1Artillery = require('creep.1.artillery');
config.creep._1Security = require('creep.1.security');
config.creep._1Avenger = require('creep.1.avenger');
config.creep._1Stealler = require('creep.1.stealler');
config.creep._1Reserver = require('creep.1.reserver');
config.creep._1Repairer = require('creep.1.repairer');
config.creep._1DiggerUp = require('creep.1.digger.up');
config.creep._1CarrierUp = require('creep.1.carrier.up');
// Room 2
config.creep._2Digger = require('creep.2.digger');
config.creep._2Farmer = require('creep.2.farmer');
config.creep._2Builder = require('creep.2.builder');
config.creep._2Repairer = require('creep.2.repairer');
config.creep._2Carrier = require('creep.2.carrier');
config.creep._2Upgrader = require('creep.2.upgrader');
// Room 3
config.creep._3DiggerRight = require('creep.3.digger.right');
config.creep._3Builder = require('creep.3.builder');
config.creep._3Upgrader = require('creep.3.upgrader');
config.creep._3Repairer = require('creep.3.repairer');
config.creep._3CarrierRight = require('creep.3.carrier.right');

// Structure
config.structure = new Object();
config.structure.link = require('structure.link');
config.structure.tower = require('structure.tower');

// Object Id
Memory.objectId = new Object();
Memory.objectId._1SourceLeft = '5873bb8a11e3e4361b4d602a';
Memory.objectId._1SourceRight = '5873bb8a11e3e4361b4d602b';
Memory.objectId._1SourceSteal = '5873bb8a11e3e4361b4d6028';
Memory.objectId._2Source = '5873bb8a11e3e4361b4d602e';
Memory.objectId._3SourceRight = '5873bbb811e3e4361b4d65b5';

Memory.objectId._1ContainerLeft = '58da2768a3467e793134676f';
Memory.objectId._1ContainerUp = '58eda1d060a8ee98057be586';
Memory.objectId._2ContainerLeft = '58de653068259520574e024c';

Memory.objectId._1Storage = '58e5620346189d7d36531063';
Memory.objectId._2Storage = '58e79fe0bca059b021f8d443';

Memory.objectId._1LinkLeft = '58e5981373632c3f3c64ff53';
Memory.objectId._1LinkRight = '58e4a05c5191d96b2e9ad865';
Memory.objectId._1LinkDown = '58e3d21f298292fe252676f7';
Memory.objectId._2LinkLeft = '58ea2075a72631fe48c93314';
Memory.objectId._2LinkRight = '58e9d9d3d233d37b682eb041';


module.exports = config;