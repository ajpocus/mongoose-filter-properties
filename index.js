exports = module.exports = function mongooseFilterProperties(schema, opts) {
  schema.static('filter', function (properties, filterType, cb) {
    filterProperties(properties, filterType, function (err, properties) {
      return cb(err, properties);
    });
  });
  
  schema.method('filter', function (filterType, cb) {
    var properties = this;
    filterProperties(properties, filterType, function (err, properties) {
      return cb(err, properties);
    });
  });
  
  function filterProperties(properties, filterType, cb) {
    // Ensure filterType is present. Should be 'w', 'r', 'readable', or
    // 'writeable'. Otherwise an error will be thrown.
    if (!filterType) { return cb(null, properties); }
    if (filterType === 'w') { filterType = 'writeable'; }
    if (filterType === 'r') { filterType = 'readable'; }
    if (filterType !== "readable" && filterType !== 'writeable') {
      return cb(null, properties);
    }
    console.log(schema);
    // Ensure 'properties' is an object. Otherwise, an error will be thrown.
    // This is for cases where the method is called as a static.
    if (typeof properties !== 'object') {
      throw new Error("The first parameter must be an object.");
    }
    
    // Default behavior is a blacklist; properties without a filterType
    // attribute are passed through. I'll add a whitelist mode to the schema
    // options at some point.
    for (prop in schema.tree) {
      var treeProp = schema.tree[prop];
      if (typeof treeProp[filterType] !== 'undefined') {
        console.log('filtertype present');
        console.log(filterType);
        if (treeProp[filterType] === false) {
          delete properties[prop];
        }
      }
    }
    
    return cb(null, properties);
  }
};