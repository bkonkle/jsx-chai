import {isElement} from 'react-addons-test-utils';
import reactElementToJSXString from 'react-element-to-jsx-string'

export default function chaiJsx({Assertion}, {inspect}) {

  Assertion.addProperty('jsx', function() {
    this.assert(
      isElement(this._obj),
      'expected #{this} to be a JSX element',
      'expected #{this} not to be a JSX element',
    )
  })

  Assertion.addMethod('equalJsx', function(jsx) {
    new Assertion(this._obj).to.be.jsx

    const expected = reactElementToJSXString(jsx)
    const actual = reactElementToJSXString(this._obj)

    this.assert(
      actual === expected,
      'expected #{act} to equal #{exp}',
      'expected #{act} to not equal #{exp}',
      expected,
      actual,
      true
    )
  })

  Assertion.addMethod('containJsx', function(jsx) {
    new Assertion(this._obj).to.be.jsx

    const expected = reactElementToJSXString(jsx)
    const actual = reactElementToJSXString(this._obj)

    this.assert(
      ~actual.indexOf(expected),
      `expected #{act} to contain ${inspect(expected)}`,
      `expected #{act} to not contain ${inspect(expected)}`,
      expected,
      actual
    )
  })

}
