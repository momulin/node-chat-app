var moment = require('moment');

// var date = new Date();
//
// console.log(date.getMonth());

// var date = moment();
// date.add(100,'year').subtract(9,'months');
// console.log(date.format('MMM Do, YYYY'));

// 10:35 am

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var date = moment(someTimestamp);
console.log(date.format('MMM Do, YYYY h:mm a'));
