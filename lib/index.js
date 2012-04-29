var resourceful = require('resourceful');

resourceful.use('couchdb', {database: 'dolphins'} );

var Dolphin = resourceful.define('dolphin', function () {

  this.string('name');
  this.number('age');
  this.array('habits')

  this.prototype.acquire = function (habit) {
    this.habits.unshift(habit);
  };

  this.prototype.quit = function (habit) {
    this.habits.pop(habit);
  };

});

Dolphin.create({name: 'Gidget', age: 72, habits: []}, function (err, result) {
  if (err) {
    throw new(Error)(err)
  } else {
    result.save(function (err) {
      if (!err) {
        getResult(result)
        console.log ("Created " + result.name + " the " + result.resource + "\n")
      }
    });
  }
});

function getResult(result) {
  Dolphin.get(result._id, function (err, result) {
    changeHabits(result)
  });
}

function changeHabits(result) {
  startSmoking(result)
  startVodkaShots(result)
  quitSmoking(result)
  startSurfing(result)
  console.log("\nHealthier " + result.name)
  console.dir(result)
  Dolphin.save(result)
}

function startSmoking(result) {
  result.acquire('smoking')
  console.log("\n" + result.name + " acquires a bad habit, " + result.habits[0] +"\n")
  console.dir(result)
}

function startVodkaShots(result) {
  result.acquire('Vodka Shots')
  console.log("\n" + result.name + " acquires another habit, " + result.habits[1] +"\n")
  console.dir(result)
}

function quitSmoking(result) {
  result.quit('smoking')
  console.log("\n" + result.name + " quits smoking")
  console.dir(result)
}

function startSurfing(result) {
  result.acquire('surfing')
  console.log("\n" + result.name + " starts surfing")
  console.dir(result)
}
