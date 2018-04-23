var expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString',()=>{
  it('should reject non-string value',()=>{
    var testString = 1;
    expect(isRealString(testString)).toBe(false);
  });

  it('should reject string with only space',()=>{
    var testString = "   ";
    expect(isRealString(testString)).toBe(false);
  })

  it('should allow string with non-space characters',()=>{
    var testString = "    test   ";
    expect(isRealString(testString)).toBe("test");
  })
});
