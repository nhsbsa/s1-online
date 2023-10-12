function Country(code, name) {     
    this.code  = code  || null;  // Accept name and age in the constructor
    this.name = name || null;
}

Country.prototype.getCode = function() {
    return this.code;
}

Country.prototype.set = function(code) {
    this.code = code;
}

Country.prototype.getName = function() {
    return this.name;
}

Country.prototype.setName = function(name) {
    this.name = name;
}

Country.prototype.fill = function(newFields) {
    for (var field in newFields) {
        if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
            if (this[field] !== 'undefined') {
                this[field] = newFields[field];
            }
        }
    }
};

module.exports = Country;