/**
 * Represents an enum object
 */
interface IEnumObject<T> {
    [key: string]: any,
    Name: string,
    Value: T | null,
}

/**
 * Defines a generalised function that expects a value types or class to have equal instances.
 */
interface IEquatable<T, TValue> {
    equals(other: Enumerator<T, TValue>): boolean,
}

/**
 * Represents an enum class/element constructor
 */
interface IConstructor<T, TValue> {
    new(n: string, v: TValue) : T,
}

/**
 * This class contains enumeration features
 */
export abstract class Enumerator<TK, TKValue> implements IEquatable<TK, TKValue>{
    
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
    public static getByName = <T, TValue>(type: IConstructor<T, TValue>, name: string, defaultValue?: Enum<T, TValue>)
            : Enum<T, TValue> | undefined => {
        if (!name?.trim()) {
            return defaultValue;
        }

        return this.getAll(type).find(x => x.Name == name) ?? defaultValue;
    }

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
    public static getByValue = <T, TValue>(type: IConstructor<T, TValue>, value: TValue, defaultValue?: Enum<T, TValue>)
            : Enum<T, TValue> | undefined => {
        if (!value) {
            return defaultValue;
        }

        return this.getAll(type).find(x => x.Value == value) ?? defaultValue;
    }

    /**
     * Used to check if an enum element with the provided name exists.
     * @param type The enum class type 
     * @param name The name of the enum element
     * @example
     * let blueEnum = Enumerator.isNameValid(ColourType, "blue");
     * @returns boolean
     */
    public static isNameValid = <T, TValue>(type: IConstructor<T, TValue>, name: string): boolean => {
        return this.getAll(type).find(x => x.Name == name) ? true : false;
    }

    /**
     * Used to check if an enum element with the provided value exists.
     * @param type The enum class type 
     * @param value The value of the enum element
     * @example
     * let blueEnum = Enumerator.isValueValid(ColourType, 1002);
     * @returns boolean
     */
    public static isValueValid = <T, TValue>(type: IConstructor<T, TValue>, value: TValue): boolean => {
        return this.getAll(type).find(x => x.Value == value) ? true : false;
    }

    /**
     * Used to get an array containing all the enum elements.
     * @param type The enum class type
     * @example
     * let listOfColourEnums = Enumerator.getAll(Colour);
     * @returns Array of enum elements
     */
    public static getAll  = <T, TValue>(type: IConstructor<T, TValue>): Enum<T, TValue>[] => {
        let propertyNames = Object.getOwnPropertyNames(type);
        let enums: Enum<T, TValue>[] = [];

        let _type: any = type;

        for (let i = 0; i < propertyNames.length; i++) {
            let propertyName = propertyNames[i];

            if (_type[propertyName] instanceof _type) {
                enums.push(_type[propertyName]);
            }
        }

        return enums;
    }

    /**
     * This function can be used to check if enum elements are equal
     * @param other The other enum to check against
     * @example
     * let isRedMyFavoriteColour = Colour.Red.equal(colour);
     * @returns boolean
     */
    public abstract equals(other: Enum<TK, TKValue>): boolean;
}

/**
 * Representation of an Enum class. This class can be implemented by other classes to allow the use of this package's features
 */
export abstract class Enum<T, TValue> implements Enumerator<T, TValue>, IEnumObject<TValue>{
    /**
     * Represents the derived class constructor
     * @param Name The enum element's name. The assigned value can not be changed once the enum element is created 
     * @param Value The enum element's value. The assigned value can not be changed once the enum element is created
     */
    constructor(public readonly Name: string, public readonly Value: TValue){
    }

    /**
     * This function can be used to check if enum elements are equal
     * @param other The other enum to check against
     * @example
     * let isRedMyFavoriteColour = Colour.Red.equal(colour);
     * @returns boolean
     */
    equals = (other: Enum<T, TValue>): boolean => {
        if (!other) { return false };
        return this == other;
    }
}