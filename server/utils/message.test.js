var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
it('should generate correct message object',()=>{
  var from = 'fromtest';
  var text = 'texttest'
  var message = generateMessage(from,text);
  expect(message).toMatchObject({from,text});
  expect(typeof message.createAt).toBe('number');
  });
});

describe('generateLocationMessage',()=>{
  it('should generate currect locaiton object',()=>{
    var from = 'asd';
    var latitude = 1;
    var longitude = 1;
    var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    var message = generateLocationMessage(from,latitude,longitude);
    expect(message).toMatchObject({from,url});
    expect(typeof message.createAt).toBe('number');
  });
});
