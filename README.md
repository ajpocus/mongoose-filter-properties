# mongoose-filter-properties
filter properties by readable/writeable flags, protecting your models

## Intro

You can install mongoose-filter-properties via npm:

    npm install mongoose-filter-properties
    
This module allows you to explicitly filter readable/writeable attributes on your models. This is useful if you want to quickly filter user input, or expose a limited subset of properties to the user. You can find examples below, in the "Usage" section.

## Usage

In your model file, require the module like so:

    var filterProperties = require('mongoose-filter-properties');
    
In the model definition, you can define readable/writeable properties like this:

    var userSchema = new mongoose.Schema({
      name: { type: String, writeable: false },
      email: { type: String, readable: false }
    }, { safe: true });
    
    userSchema.plugin(filterProperties);
    var User = mongoose.model('User', userSchema);

Please note, that "readable" and "writeable" are simply filters. You can always assign a value to these fields. These properties only come into effect if you call the "filter" method, like so:

    var user = new User({ name: "Foo Bar", email: "foo@example.com" });
    user.filter('readable', function (err, user) {
      console.log(user);    // "email" will not be visible
    });
    
    var userParams = req.body.user;
    User.filter(userParams, "writeable", function (err, userParams) {
      // userParams is safe to assign, even if the user injected some protected value
    });

## Testing

Since this is a relatively small and simple module, I wrote a couple of minimal tests in `test.js`. You can run the tests like so:

    mocha ./test.js