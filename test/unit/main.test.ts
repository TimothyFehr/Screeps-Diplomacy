import {assert} from "chai";
import {diplomacy} from "../../src/main";
import {Game, Memory} from "./mock"

describe("main", () => {
  before(() => {
    // runs before all test in this block
  });

  beforeEach(() => {
    // runs before each test in this block
    // @ts-ignore : allow adding Game to global
    global.Game = _.clone(Game);
    // @ts-ignore : allow adding Memory to global
    global.Memory = _.clone(Memory);
  });

  it("should export the diplomacy function", () => {
    assert.isTrue(typeof diplomacy === "function");
  });

  it("should return void when called with no context", () => {
    assert.isUndefined(diplomacy());
  });

  it("Automatically delete memory of missing creeps", () => {
    Memory.creeps.persistValue = "any value";
    Memory.creeps.notPersistValue = "any value";

    Game.creeps.persistValue = "any value";

    diplomacy();

    assert.isDefined(Memory.creeps.persistValue);
    assert.isUndefined(Memory.creeps.notPersistValue);
  });
});
