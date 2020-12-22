const { DateTime } = require("luxon");

module.exports = (value) => {
    const dateObject = DateTime.fromISO(value).toFormat('dd LLLL yyyy');
    return dateObject;
};
