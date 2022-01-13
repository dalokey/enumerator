# @dalokey/enumerator
A container for a finite set of elements that provides various enumeration functionality.

## Installation
Listed on [npm](https://www.npmjs.com/package/@dalokey/enumerator), and can be installed by running:
```bash
npm i -S @dalokey/enumerator
```

## Summary
Enumeration is commonly used to refer to a __finite__ set of elements in a collection.

This package provides a few functions that can be very helpful when handling the elements in the collection.

Furthermore, Unlike the typeScript enum, when implementing this package's `Enum` class, it is possible to extend the class by adding functions and properties that can handle very specific cases. This encourages a domain driven development (DDD) approach as the logic for an enum can be contained in a specific domain.

## Usage
To better understand the usage of this package, an enumeration of colour codes will be used as an example.

First create the colour class, which will inherit the `Enum<T, TValue>` class. `T` is the Colour Enum class type itself, and `TValue` is the type for the `Value` property of each enum element. Therefore,`class Colour extends Enum<Colour, number>` will contains a list of Colour enums that have numbers as values.
```ts
class Colour extends Enum<Colour, number> {
    static Red: Colour = new Colour("red", 1001);
    static Blue: Colour = new Colour("blue", 1002);
    static Green: Colour = new Colour("Green", 1003);

    // custom features, including functions and properties
}
```

As shown on this code snippet `Colour` is the Enum class, and to add an enum element, a public **static** property is instantiated with name and value. It is important for these enums to be __**`static`**__.

Now it is possible to use all of this package's features.

These features are separated into three types: __*Element*__, __*Enumerator*__, and __*Custom*__ features

___
### Element features
The element features are accessed directly from the enum elements. They include:

#### `.Name` and `.Value` - getting the name and value of enum element
These are just properties to get the `Name` and `Value` of an enum element:
```ts
let name = Colour.Red.Name; // "red"
let value = Colour.Red.Value; // 1001
```

#### `.equals(Enum)` - check if an enum element is equal to another enum element
The `equal()` function is used to check if the enum element is equal to another. This can be very handy in many cases. The example below shows a function returning a value and then we check if it is the expected value.
```ts
let getFavoriteColour = (e: number): Colour => {
    if (e <= 50) {
        return Colour.Red
    } else {
        return Colour.Blue
    }
}

let myFavoriteColour = getFavoriteColour(8);

let isRedMyFavoriteColour = Colour.Red.equals(myFavoriteColour); // true
```

___
### Enumerator features
All the enumerator features are static and can be accessed from the __`Enumerator`__ class provided by this package.

#### `Enumerator.getAll(Enum)` - getting all the enum elements
The `getAll()` function is used to get an array containing all the **`static`** enum elements.
```ts
let listOfColourEnums = Enumerator.getAll(Colour); // [Colour{Name: 'red', Value: 1001}, Colour{Name: 'blue', Value: 1002}, ...]
```

#### `Enumerator.getByName(Enum, "name", defaultEnum)` - getting an enum element by name
The `getByName()` function is used to get an enum element by its name. This will return the first enum element it finds if there are more than one with the same name.
```ts
let blueEnum = Enumerator.getByName(ColourType, "blue"); // Colour{Name: 'blue', Value: 1002}
```

#### `Enumerator.getByValue(Enum, TValue, , defaultEnum)` - getting an enum element by value
The `getByValue()` function is used to get an enum element by its value. This will return the first enum element it finds if there are more than one with the same value.
```ts
let blueEnum = Enumerator.getByValue(ColourType, 1002); // Colour{Name: 'blue', Value: 1002}
```

#### `Enumerator.isNameValid(Enum, "name")` - check if an enum element exists with the provided name
The `isNameValid()` function is used to check if an enum element with the provided name exists
```ts
let blueEnum = Enumerator.isNameValid(ColourType, "blue"); // true
```

#### `Enumerator.isValueValid(Enum, TValue)` - check if an enum element exists with the provided value
The `isValueValid()` function is used to check if an enum element with the provided value exists
```ts
let blueEnum = Enumerator.isValueValid(ColourType, 1002); // true
```
___
### Custom features
As the name suggests, custom features are created in the Enum class or inherited from a base class. This encourages a domain driven development (DDD) approach as the logic for this enum class can be contained in a specific domain.

The following shows some features added to the Colour2 enum class.
```ts
class Colour2 extends Enum<Colour2, string> {
    static White: Colour2 = new Colour2("red", 1001);
    static Blue: Colour2 = new Colour2("blue", 1002);
    static Green: Colour2 = new Colour2("Green", 1003);

    getName = (): string => {
        return this.Name;
    }

    static favoriteColour = (e: number): Colour2 => {
        if (e <= 50) {
            return Colour2.Red
        } else {
            return Colour2.Blue
        }
    }
}
```

And to call the custom method, the following is used
```ts
let myFavoriteColour = Colour2.favoriteColour(200); // Colour2{Name: 'blue', Value: 1002}
let nameOfColourRed = Colour2.Red.getName(); // "red"
```

___
__*Please feel free to suggest any features and let us discuss how to evolve this package together!*__