var should = require('should'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  filterProperties = require('./index');

describe("mongoose-filter-properties", function () {
  describe("A model with no filters defined", function () {
    it("should return all properties", function (done) {
      var noFilterSchema = new Schema({
        name: String,
        email: String,
        isAdmin: Boolean
      });
      noFilterSchema.plugin(filterProperties);
      
      var NoFilter = mongoose.model('NoFilter', noFilterSchema);
      
      var noFilter = new NoFilter({ name: "Foo", email: "foo@example.com" });
      noFilter.filter('readable', function (err, noFilter) {
        if (err) { throw err; }
        noFilter.name.should.equal("Foo");
        noFilter.email.should.equal("foo@example.com");
        done();
      });
    });
  });
  
  describe("A model with readable filters defined", function () {
    it("should not return properties that are not readable", function (done) {
      var userSchema = new Schema({
        name: String,
        email: { type: String, readable: false },
        isAdmin: { type: Boolean, default: false, readable: false }
      });
      userSchema.plugin(filterProperties);
      var User = mongoose.model('User', userSchema);
      
      var user = new User({ name: "Foo", email: "foo@example.com" });
      user.filter('readable', function (err, user) {
        if (err) { throw err; }
        should.not.exist(user.email);
        (typeof user.email).should.equal('undefined');
        done();
      });
    }); 
  });
});