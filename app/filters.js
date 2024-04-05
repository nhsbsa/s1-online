module.exports = function (env) { /* eslint-disable-line no-unused-vars */
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  const filters = {};

  filters.isNaN = function(num) {
    if (isNaN(num)){
      return false;
    }
    return true;
  }

  filters.date = function(date) {
    console.log(date);
    try {
      return new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'long', day: 'numeric'}).format(date);
    } catch (error) {
      return error.message.split(':')[0]
    }
  }
  
  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */


filters.ninetyDaysFromNow = function() {
  try {
      const today = new Date();
      const ninetyDaysLater = new Date(today.setDate(today.getDate() + 90));

      return new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }).format(ninetyDaysLater);
  } catch (error) {
      return error.message.split(':')[0];
  }
};
filters.twoDaysFromNow = function() {
  try {
      const today = new Date();
      const twoDaysLater = new Date(today.setDate(today.getDate() + 2));

      return new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }).format(twoDaysLater);
  } catch (error) {
      return error.message.split(':')[0];
  }
};
filters.formatDate = function(dateString) {
  try {
      // Split the input date string into day, month, and year
      const [day, month, year] = dateString.split(' ');

      // Convert numerical month to letters
      const monthInLetters = getMonthInLetters(month);

      // Return the formatted date
      return `${day} ${monthInLetters} ${year}`;
  } catch (error) {
      return error.message.split(':')[0];
  }
};

function getMonthInLetters(month) {
  // Convert numerical month to letters
  const monthsInLetters = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Ensure month is a valid number
  const monthIndex = parseInt(month, 10);
  if (isNaN(monthIndex) || monthIndex < 1 || monthIndex > 12) {
      throw new Error('Invalid month');
  }

  return monthsInLetters[monthIndex - 1];
}

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters;
};
