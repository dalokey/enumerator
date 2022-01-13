/**
 * Represents an enum object
 */
interface IEnumObject<T> {
    [key: string]: any;
    Name: string;
    Value: T | null;
}
/**
 * Defines a generalised function that expects a value types or class to have equal instances.
 */
interface IEquatable<T, TValue> {
    equals(other: Enumerator<T, TValue>): boolean;
}
/**
 * Represents an enum class/element constructor
 */
interface IConstructor<T, TValue> {
    new (n: string, v: TValue): T;
}
/**
 * This class contains enumeration features
 */
export declare abstract class Enumerator<TK, TKValue> implements IEquatable<TK, TKValue> {
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
    static getByName: <T, TValue>(type: IConstructor<T, TValue>, name: string, defaultValue?: Enum<T, TValue> | undefined) => Enum<T, TValue> | undefined;
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
    static getByValue: <T, TValue>(type: IConstructor<T, TValue>, value: TValue, defaultValue?: Enum<T, TValue> | undefined) => Enum<T, TValue> | undefined;
    /**
     * Used to check if an enum element with the provided name exists.
     * @param type The enum class type
     * @param name The name of the enum element
     * @example
     * let blueEnum = Enumerator.isNameValid(ColourType, "blue");
     * @returns boolean
     */
    static isNameValid: <T, TValue>(type: IConstructor<T, TValue>, name: string) => boolean;
    /**
     * Used to check if an enum element with the provided value exists.
     * @param type The enum class type
     * @param value The value of the enum element
     * @example
     * let blueEnum = Enumerator.isValueValid(ColourType, 1002);
     * @returns boolean
     */
    static isValueValid: <T, TValue>(type: IConstructor<T, TValue>, value: TValue) => boolean;
    /**
     * Used to get an array containing all the enum elements.
     * @param type The enum class type
     * @example
     * let listOfColourEnums = Enumerator.getAll(Colour);
     * @returns Array of enum elements
     */
    static getAll: <T, TValue>(type: IConstructor<T, TValue>) => Enum<T, TValue>[];
    /**
     * This function can be used to check if enum elements are equal
     * @param other The other enum to check against
     * @example
     * let isRedMyFavoriteColour = Colour.Red.equal(colour);
     * @returns boolean
     */
    abstract equals(other: Enum<TK, TKValue>): boolean;
}
/**
 * Representation of an Enum class. This class can be implemented by other classes to allow the use of this package's features
 */
export declare abstract class Enum<T, TValue> implements Enumerator<T, TValue>, IEnumObject<TValue> {
    readonly Name: string;
    readonly Value: TValue;
    /**
     * Represents the derived class constructor
     * @param Name The enum element's name. The assigned value can not be changed once the enum element is created
     * @param Value The enum element's value. The assigned value can not be changed once the enum element is created
     */
    constructor(Name: string, Value: TValue);
    /**
     * This function can be used to check if enum elements are equal
     * @param other The other enum to check against
     * @example
     * let isRedMyFavoriteColour = Colour.Red.equal(colour);
     * @returns boolean
     */
    equals: (other: Enum<T, TValue>) => boolean;
}
export {};
