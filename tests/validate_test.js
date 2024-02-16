
describe("Name validator", function() {

  describe("It should test if is empty", function() {

    it("should return true if name is empty", function() {

      expect(checkIfIsEmpty("  ")).toBe(true);

    });

  });

});

describe("Number validator", function() {

  describe("It should test if phonenumber is numbers", function() {

    it("should return true if name is in numbers", function() {

      expect(checkNumber(123456789)).toBe(true);

    });

  });

});

describe("Number validator", function() {

  describe("It should test if phonenumber is empty", function() {

    it("should return true if name is not empty", function() {

      expect(checkIfIsEmpty2(" ")).toBe(true);

    });

  });

});

describe("Number validator", function() {

  describe("It should test if phonenumber is numbers", function() {

    it("should return true if name is in numbers", function() {

      expect(checkNumber(123456789)).toBe(true);

    });

  });

});

describe("Message validator", function() {

  describe("It should test if message is empty", function() {

    it("should return true if name is not empty", function() {

      expect(checkIfIsEmpty3(" ")).toBe(true);

    });

  });

});