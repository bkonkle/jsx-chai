'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = jsxChai;

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _collapseWhiteSpace = require('collapse-white-space');

var _collapseWhiteSpace2 = _interopRequireDefault(_collapseWhiteSpace);

var _reactElementToJsxString = require('react-element-to-jsx-string');

var _reactElementToJsxString2 = _interopRequireDefault(_reactElementToJsxString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function jsxChai(_ref, _ref2) {
  var Assertion = _ref.Assertion;
  var inspect = _ref2.inspect;

  Assertion.addProperty('jsx', function addJsx() {
    this.assert((0, _reactAddonsTestUtils.isElement)(this._obj), 'expected #{this} to be a JSX element', 'expected #{this} not to be a JSX element');
  });

  function jsxMethod(func) {
    return function jsxMethodWrapper(_super) {
      return function jsxMethodInner(jsx) {
        if (!(0, _reactAddonsTestUtils.isElement)(this._obj)) {
          return _super.apply(this, arguments);
        }

        var expected = (0, _collapseWhiteSpace2.default)((0, _reactElementToJsxString2.default)(jsx));
        var actual = (0, _collapseWhiteSpace2.default)((0, _reactElementToJsxString2.default)(this._obj));

        return func.call(this, { jsx: jsx, expected: expected, actual: actual });
      };
    };
  }

  function jsxEql(_ref3) {
    var expected = _ref3.expected;
    var actual = _ref3.actual;

    this.assert(actual === expected, 'expected #{act} to equal #{exp}', 'expected #{act} to not equal #{exp}', expected, actual, true);
  }

  function jsxInclude(_ref4) {
    var expected = _ref4.expected;
    var actual = _ref4.actual;

    this.assert(~actual.indexOf(expected), 'expected #{act} to contain ' + inspect(expected), 'expected #{act} to not contain ' + inspect(expected), expected, actual);
  }

  function overwriteInclude(name) {
    Assertion.overwriteChainableMethod(name, jsxMethod(jsxInclude), function includeWrapper(_super) {
      return function includeInner() {
        return _super.apply(this, arguments);
      };
    });
  }

  Assertion.overwriteMethod('eql', jsxMethod(jsxEql));
  Assertion.overwriteMethod('eqls', jsxMethod(jsxEql));

  overwriteInclude('include');
  overwriteInclude('contain');
  overwriteInclude('includes');
  overwriteInclude('contains');
}
//# sourceMappingURL=jsx-chai.js.map
