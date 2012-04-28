var resourceful = require('resourceful');

resourceful.use('couchdb', {database: 'dolphins'} );

var Dolphin = resourceful.define('dolphin', function () {

  this.string('name');
  this.string('age');
  this.array('habits')

  this.prototype.acquire = function (habit) {
    this.habits.unshift(habit);
  };

  this.prototype.quit = function (habit) {
    this.habits.pop(habit);
  };

});

var dolphin = new(Dolphin)({
  name:      'Gidget',
  age:       72
});

console.dir(dolphin)
console.log("\ndolphin acquires a bad habit\n")
dolphin.acquire('smoking')
console.dir(dolphin)
console.log("\ndolphin acquires another bad habit\n")
dolphin.acquire('Vodka shots')
console.dir(dolphin)
console.log("\ndolphin quits smoking and starts surfing\n")
dolphin.quit('smoking')
dolphin.acquire('surfing')
console.dir(dolphin)
console.log("\nHealthier dolphin\n")


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
