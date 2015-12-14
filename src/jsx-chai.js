import {isElement} from 'react-addons-test-utils'
import collapse from 'collapse-white-space'
import reactElementToJSXString from 'react-element-to-jsx-string'

export default function jsxChai({Assertion}, {inspect}) {

  Assertion.addProperty('jsx', function addJsx() {
    this.assert(
      isElement(this._obj),
      'expected #{this} to be a JSX element',
      'expected #{this} not to be a JSX element'
    )
  })

  function jsxMethod(func) {
    return function jsxMethodWrapper(_super) {
      return function jsxMethodInner(jsx) {
        if (!isElement(this._obj)) {
          return _super.apply(this, arguments)
        }

        const expected = collapse(reactElementToJSXString(jsx))
        const actual = collapse(reactElementToJSXString(this._obj))

        return func.call(this, {jsx, expected, actual})
      }
    }
  }

  function jsxEql({expected, actual}) {
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

  function overwriteInclude(name) {
    Assertion.overwriteChainableMethod(
      name,
      jsxMethod(jsxInclude),
      function includeWrapper(_super) {
        return function includeInner() {
          return _super.apply(this, arguments)
        }
      }
    )
  }

  Assertion.overwriteMethod('eql', jsxMethod(jsxEql))
  Assertion.overwriteMethod('eqls', jsxMethod(jsxEql))

  overwriteInclude('include')
  overwriteInclude('contain')
  overwriteInclude('includes')
  overwriteInclude('contains')

}
