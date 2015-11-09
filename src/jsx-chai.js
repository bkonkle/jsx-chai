import {isElement} from 'react-addons-test-utils';
import reactElementToJSXString from 'react-element-to-jsx-string'

export default function jsxChai({Assertion}, {flag, inspect}) {

  Assertion.addProperty('element', function() {
    this.assert(
      isElement(this._obj),
      'expected #{this} to be a JSX element',
      'expected #{this} not to be a JSX element',
    )
  })

  Assertion.addProperty('jsx', function () {
    flag(this, 'jsx', true);
  })

  function jsxMethod(func) {
    return function(_super) {
      return function(jsx) {
        if (!flag(this, 'jsx')) {
          return _super.apply(this, arguments)
        }

        new Assertion(this._obj).to.be.an.element

        const expected = reactElementToJSXString(jsx)
        const actual = reactElementToJSXString(this._obj)

        return func.call(this, {jsx, expected, actual})
      }
    }
  }

  function jsxEqual({expected, actual}) {
    this.assert(
      actual === expected,
      'expected #{act} to equal #{exp}',
      'expected #{act} to not equal #{exp}',
      expected,
      actual,
      true
    )
  }

  function jsxInclude({expected, actual}) {
    this.assert(
      ~actual.indexOf(expected),
      `expected #{act} to contain ${inspect(expected)}`,
      `expected #{act} to not contain ${inspect(expected)}`,
      expected,
      actual
    )
  }

  function overwriteGetter(name, func) {
    const descriptor = Object.getOwnPropertyDescriptor(Assertion.prototype, name)
    const _super = descriptor.get

    Object.defineProperty(Assertion.prototype, name, {
      get: function() {
        return function(value) {
          return func(_super).call(this, value)
        }
      },
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
    })
  }

  Assertion.overwriteMethod('equals', jsxMethod(jsxEqual))
  Assertion.overwriteMethod('equal', jsxMethod(jsxEqual))
  Assertion.overwriteMethod('eq', jsxMethod(jsxEqual))

  overwriteGetter('include', jsxMethod(jsxInclude))
  overwriteGetter('contain', jsxMethod(jsxInclude))
  overwriteGetter('includes', jsxMethod(jsxInclude))
  overwriteGetter('contains', jsxMethod(jsxInclude))

}
