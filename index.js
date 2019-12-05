const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect.then(db => {
  console.log("---> Connected correctly to server");

  Dishes.create({
    name: "Uthapizza",
    description: "test"
  })
    .then(dish => {
      console.log("---> successfully completed");

      console.log(dish);

      console.log("---> returning find command");
      return Dishes.findByIdAndUpdate(
        dish._id,
        {
          $set: { description: "Updated test" }
        },
        { new: true }
      );
    })
    .then(dish => {
      console.log(dish);

      console.log("---> pushing comment into array");

      dish.comments.push({
        rating: 5,
        comment: "I'm getting a sinking feeling!",
        author: "Leonardo di Carpaccio"
      });

      return dish.save();
    })
    .then(dish => {
      console.log(dish);

      console.log("---> returning remove command");
      return Dishes.remove({});
    })
    .then(() => {
      console.log("---> returning mongoose close command");

      return mongoose.connection.close();
    })
    .catch(err => {
      console.log(err);
    });
});
