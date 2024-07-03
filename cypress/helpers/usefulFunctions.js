let assert = require('assert');

module.exports = {

  generateRandomStringLettersOnly(length){
        var result           = '';
        var characters       = 'abcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
  },

  assertFieldMaxLength(element, expectedMaxLength){
    let actualMaxLength = element.getAttribute('maxlength');
    assert.ok (actualMaxLength == expectedMaxLength,
      `FAIL! We were expecting a Max Length of ${expectedMaxLength} but the Actual Max Length = ${actualMaxLength}`);
  },

  convertDateStringtoDateObject(dateString){
    //This function expects a date string in this format: 14/06/2024 20:52:22', it converts it to this format: '2024/06/14 20:52:22'
    //It then converts the string into an actual date object
    var dateAndTimeSplit = dateString.split(" ");
    var dateParts = dateAndTimeSplit[0].split("/");
    var reformattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]} ${dateAndTimeSplit[1]}`;
    var convertedDate = new Date(reformattedDate);
    return convertedDate;
  }

};
