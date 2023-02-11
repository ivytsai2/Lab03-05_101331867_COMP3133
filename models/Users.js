const mongoose = require('mongoose')

// custom validations
const validateEmail = function(email) {
    var re = /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;
    return re.test(email)
}

// alphabets and spaces only
const validateCity = function(city) {
    var re = /^[a-zA-Z ]*$/;
    return re.test(city)
}

// 12345-1234 (DDDDD-DDDD, D = digit)
const validateZipCode = function(zipcode) {
    var re = /^(\d{5})-(\d{4})$/;
    return re.test(zipcode)
}

// 1-123-123-1234 (D-DDD-DDD-DDDD, D = digit)
const validatePhone = function(phone) {
    var re = /^\d((-(\d{3})){2})-(\d{4})$/;
    return re.test(phone)
}

// start with http or https
const validateURL = function(url) {
    var re = /^https?/;
    return re.test(url)
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 4
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: [validateEmail, "Please enter a valid email!"]
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        suite: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true,
            validate: [validateCity, "Only alphabets and spaces are allowed!"]
        },
        zipcode: {
            type: String,
            required: true,
            trim: true,
            validate: [validateZipCode, "Please enter in the format of DDDDD-DDDD, D = digit"]
        },
        geo: {
            lat: {
                type: String,
                required: true,
                trim: true
            },
            lng: {
                type: String,
                required: true,
                trim: true
            }
        }
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        validate: [validatePhone, "Please enter in the format of D-DDD-DDD-DDDD, D = digit"]
    },
    website: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: [validateURL, "Please enter a valid URL that starts with http or https!"]
    },
    company: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        catchPhrase: {
            type: String,
            required: true,
            trim: true
        },
        bs: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        }
    }
})

/*
// capitalize
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const capitalizeEachWord = (str) => {
    var capitalizedStr = ""
    var strArray = str.split(" ")
    strArray.forEach(str => {
        capitalizedStr += capitalize(str) + " "
    });
}


UserSchema.pre('save', function (next) {
    // capitalize
    //this.username.charAt(0).toUpperCase() + this.username.slice(1).toLowerCase();
    capitalizeEachWord(this.name)
    capitalize(this.email)
    capitalizeEachWord(this.address.street)
    capitalizeEachWord(this.address.suite)
    capitalizeEachWord(this.address.city)
    capitalize(this.company.catchPhrase)
    next();
  });
*/

const User = mongoose.model("user", UserSchema)
module.exports = User