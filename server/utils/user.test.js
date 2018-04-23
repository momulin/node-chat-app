const expect = require('expect');

const {Users} = require('./user');

describe('Users',()=>{

  beforeEach(()=>{
      users = new Users();
      users.users = [{
        id:'1',
        name:'Mike',
        room:'testroom'
      },{
        id:'2',
        name:'Jen',
        room:'testroom2'
      },{
        id:'3',
        name:'Julie',
        room:'testroom'
      }];
  });

  it('should add new user',()=>{
    var users = new Users();
    var user = {
      id:'123',
      name:'test',
      room:'testroom'
    };
    users.addUser(user.id,user.name,user.room);


    expect(users.users).toMatchObject([user]);
  });

  it('should remove a user',()=>{
    var userId = '1';
    users.removeUser(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user',()=>{
    var userId = '99';
    user = users.removeUser(userId);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user',()=>{
    var userId = '2';
    var user = users.getUser(userId);
    expect(user.id).toEqual(userId);
  });

  it('should not find user',()=>{
    var userId = '99';
    var user = users.getUser(userId);
    expect(user).toBeFalsy();
  });



  it('should return names for node course',()=>{
    var userList = users.getUserList('testroom');
    expect(userList).toEqual(['Mike','Julie']);
  });



});
