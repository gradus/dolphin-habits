var resourceful = require('resourceful');

resourceful.use('couchdb', {database: 'dolphins'} );

var Dolphin = resourceful.define('dolphin', function () {

  this.string('name');
  this.string('age');
  this.array('habits')

  this.prototype.acquire = function (habit) {
    this.habits.push(habit);
};
  

});


var dolphin = new(Dolphin)({
  name:      'Gidget',
  age:       72
});

console.log(dolphin)

dolphin.acquire('smoking')

console.log("\ndolphin acquires a bad habit\n")
console.dir(dolphin)

Dolphin.create( function (err, dolphin) {
  console.log(err)
  if (err) { throw new(Error)(err) }
  dolphin.age++;
  dolphin.save(function (err) {
    if (!err) {
      console.log('happy birthday ' + dolphin.name + '!');
    }
  });
});
