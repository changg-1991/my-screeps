var config = new Object();

config.creep = new Object();
// Room 1
config.creep._1DiggerLeft = require('creep.1.digger.left');
config.creep._1CarrierLeft = require('creep.1.carrier.left');
config.creep._1DiggerRight = require('creep.1.digger.right');
config.creep._1CarrierDown = require('creep.1.carrier.down');
config.creep._1Upgrader = require('creep.1.upgrader');
config.creep._1Builder = require('creep.1.builder');
config.creep._1Eva = require('creep.1.eva');
config.creep._1Artillery = require('creep.1.artillery');
config.creep._1Claimer = require('creep.1.claimer');
config.creep._1Exploiter = require('creep.1.exploiter');
config.creep._1Security = require('creep.1.security');
config.creep._1Avenger = require('creep.1.avenger');
// Room 2
config.creep._2Farmer = require('creep.2.farmer');
config.creep._2Builder = require('creep.2.builder');
config.creep._2Repairer = require('creep.2.repairer');
config.creep._2Carrier = require('creep.2.carrier');
config.creep._2Upgrader = require('creep.2.upgrader');


module.exports = config;