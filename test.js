var should = require('should'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  filterProperties = require('./index');

describe("mongoose-filter-properties", function () {
  describe("A model with no filters defined", function () {
    it("should return all properties", function () {
      var noFilterSchema = new Schema({
        name: String,
        email: String,
        isAdmin: Boolean
      });
      noFilterSchema.plugin(filterProperties);
      
      var NoFilter = mongoose.model('NoFilter', noFilterSchema);
      
      var noFilter = new NoFilter({ name: "Foo", email: "foo@example.com" });
      noFilter.filter('readable', function (err, noFilter) {
        noFilter.name.should.equal("Foo");
        noFilter.email.should.equal("foo@example.com");
      });
    });
  });
});