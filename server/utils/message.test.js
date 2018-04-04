var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage',()=>{
it('should generate correct message object',()=>{
  var from = 'fromtest';
  var text = 'texttest'
  var message = generateMessage(from,text);
  expect(message).toMatchObject({from,text});
  expect(typeof message.createAt).toBe('number');
  });
});
