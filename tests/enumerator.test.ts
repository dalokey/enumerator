import { expect } from "chai";
import { Enumerator, Enum } from '../src';

describe("Enumerator unit tests", (): void => {
    class ColourType extends Enum<ColourType, number> {
        static Red: ColourType = new ColourType("red", 1001);
        static Blue: ColourType = new ColourType("blue", 1002);
        static Green: ColourType = new ColourType("Green", 1003);

        getName = (): string => {
            return this.Name;
        }

        static favoriteColour = (e: number): ColourType => {
            if (e <= 50) {
                return ColourType.Red
            } else {
                return ColourType.Blue
            }
        }
    }

    class BodyPart extends Enum<BodyPart, number>{
        static Hand: BodyPart = new BodyPart("red", 1001);
        static HandColour: BodyPart = new BodyPart("red", 1001);
    }

    describe(".Name", (): void => {
        it("returns the correct enum name", ():void => {
            let actual = ColourType.Red.Name;

            expect(actual).is.equal("red");
        });
    });

    describe(".Value", (): void => {
        it("returns the correct enum value", ():void => {
            let actual = ColourType.Blue.Value;

            expect(actual).is.equal(1002);
        });
    });

    describe("getAll()", (): void => {
        it("returns the correct number of enums", (): void => {
            let actual = Enumerator.getAll(ColourType);

            expect(actual.length).is.equal(3);
        });
    });

    describe("getByName()", (): void => {
        it("returns the enum when the name is valid", (): void => {
            let actual = Enumerator.getByName(ColourType, "blue");

            expect(actual).is.equal(ColourType.Blue);
        });

        it("returns undefined when the name is invalid and no default value is passed", (): void => {
            let actual = Enumerator.getByName(ColourType, "purple");

            expect(actual).is.equal(undefined);
        });

        it("returns the default value when the name is invalid and the default value is passed", (): void => {
            let actual = Enumerator.getByName(ColourType, "purple", ColourType.Blue);

            expect(actual).is.equal(ColourType.Blue);
        });
    });

    describe("getByValue()", (): void => {
        it("returns the enum when the value is valid", (): void => {
            let actual = Enumerator.getByValue(ColourType, 1001);

            expect(actual).is.equal(ColourType.Red);
        });

        it("returns undefined when the value is invalid and no default value is passed", (): void => {
            let actual = Enumerator.getByValue(ColourType, 2001);

            expect(actual).is.equal(undefined);
        });

        it("returns the default value when the value is invalid and the default value is passed", (): void => {
            let actual = Enumerator.getByValue(ColourType, 2001, ColourType.Blue);

            expect(actual).is.equal(ColourType.Blue);
        });
    });

    describe("equal()", (): void => {
        it("returns true when enums are equal", (): void => {
            let blueEnum = ColourType.Blue;
            let actual = ColourType.Blue.equals(blueEnum);

            expect(actual).is.true;
        });

        it("returns false when enums are not equal", (): void => {
            let redEnum = ColourType.Red;
            let actual = ColourType.Blue.equals(redEnum);

            expect(actual).is.false;
        });

        it("returns false when enums have the same name and value but have different classes", (): void => {
            let bodyEnum = BodyPart.Hand;
            let actual = ColourType.Red.equals(bodyEnum);

            expect(actual).is.false;
        });
    });

    describe("isNameValid()", (): void => {
        it("returns true when the name provided has a valid enum", (): void => {
            let actual = Enumerator.isNameValid(ColourType, "blue");

            expect(actual).is.true;
        });

        it("returns false when the name provided does not has a valid enum", (): void => {
            let actual = Enumerator.isNameValid(ColourType, "purple");

            expect(actual).is.false;
        });
    });

    describe("isValueValid()", (): void => {
        it("returns true when the value provided has a valid enum", (): void => {
            let actual = Enumerator.isValueValid(ColourType, 1001);

            expect(actual).is.true;
        });

        it("returns false when the value provided does not has a valid enum", (): void => {
            let actual = Enumerator.isValueValid(ColourType, 8991);

            expect(actual).is.false;
        });
    });

    describe("custom feature - getName()", (): void => {
        it("returns the correct name of a an enum", (): void => {
            let actual = ColourType.Red.getName();

            expect(actual).is.equals("red");
        });
    });

    describe("custom feature - favoriteColour()", (): void => {
        it("returns the correct colour", (): void => {
            let actual = ColourType.favoriteColour(300);

            expect(actual.Name).is.equals("blue");
        });
    });
});