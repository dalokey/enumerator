"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enum = exports.Enumerator = void 0;
/**
 * This class contains enumeration features
 */
class Enumerator {
}
exports.Enumerator = Enumerator;
_a = Enumerator;
/**
 * Used to get an enum element by its name.
 * Will return the first element found if there are more than one with the same name.
 * @param type The enum class type
 * @param name The name of the enum element
 * @param defaultValue The default enum element returned if the return value is undefined
 * @example
 * let blueEnum = Enumerator.getByName(ColourType, "blue");
 * @returns enum element found | enum if provided | undefined
 */
Enumerator.getByName = (type, name, defaultValue) => {
    var _b;
    if (!(name === null || name === void 0 ? void 0 : name.trim())) {
        return defaultValue;
    }
    return (_b = _a.getAll(type).find(x => x.Name == name)) !== null && _b !== void 0 ? _b : defaultValue;
};
/**
 * Used to get an enum element by its value.
 * Will return the first element found if there are more than one with the same value.
 * @param type The enum class type
 * @param value The value of the enum element
 * @param defaultValue The default enum element returned if the return value is undefined
 * @example
 * let blueEnum = Enumerator.getByValue(ColourType, 1002);
 * @returns enum element found | enum if provided | undefined
 */
Enumerator.getByValue = (type, value, defaultValue) => {
    var _b;
    if (!value) {
        return defaultValue;
    }
    return (_b = _a.getAll(type).find(x => x.Value == value)) !== null && _b !== void 0 ? _b : defaultValue;
};
/**
 * Used to check if an enum element with the provided name exists.
 * @param type The enum class type
 * @param name The name of the enum element
 * @example
 * let blueEnum = Enumerator.isNameValid(ColourType, "blue");
 * @returns boolean
 */
Enumerator.isNameValid = (type, name) => {
    return _a.getAll(type).find(x => x.Name == name) ? true : false;
};
/**
 * Used to check if an enum element with the provided value exists.
 * @param type The enum class type
 * @param value The value of the enum element
 * @example
 * let blueEnum = Enumerator.isValueValid(ColourType, 1002);
 * @returns boolean
 */
Enumerator.isValueValid = (type, value) => {
    return _a.getAll(type).find(x => x.Value == value) ? true : false;
};
/**
 * Used to get an array containing all the enum elements.
 * @param type The enum class type
 * @example
 * let listOfColourEnums = Enumerator.getAll(Colour);
 * @returns Array of enum elements
 */
Enumerator.getAll = (type) => {
    let propertyNames = Object.getOwnPropertyNames(type);
    let enums = [];
    let _type = type;
    for (let i = 0; i < propertyNames.length; i++) {
        let propertyName = propertyNames[i];
        if (_type[propertyName] instanceof _type) {
            enums.push(_type[propertyName]);
        }
    }
    return enums;
};
/**
 * Representation of an Enum class. This class can be implemented by other classes to allow the use of this package's features
 */
class Enum {
    /**
     * Represents the derived class constructor
     * @param Name The enum element's name. The assigned value can not be changed once the enum element is created
     * @param Value The enum element's value. The assigned value can not be changed once the enum element is created
     */
    constructor(Name, Value) {
        this.Name = Name;
        this.Value = Value;
        /**
         * This function can be used to check if enum elements are equal
         * @param other The other enum to check against
         * @example
         * let isRedMyFavoriteColour = Colour.Red.equal(colour);
         * @returns boolean
         */
        this.equals = (other) => {
            if (!other) {
                return false;
            }
            ;
            return this == other;
        };
    }
}
exports.Enum = Enum;
