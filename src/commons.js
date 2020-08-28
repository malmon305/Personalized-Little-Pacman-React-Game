/**
 * Commons scripts by Andre Straube
 */
// eslint-disable-next-line func-names
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * (this.length - 1)))];
};
String.prototype.equalIgnoreCase = function(str) {
    return (str != null &&
        typeof str === 'string' &&
        this.toUpperCase() === str.toUpperCase());
};
