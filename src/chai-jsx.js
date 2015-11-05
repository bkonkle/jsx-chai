import {isElement} from 'react-addons-test-utils';

export default function chaiJsx({Assertion}) {

  Assertion.addProperty('jsx', function() {
    this.assert(
      isElement(this._obj),
      'expected #{this} to be a JSX element',
      'expected #{this} not to be a JSX element',
    )
  })

  Assertion.addMethod('equalJsx', function(jsx) {

  })

  Assertion.addMethod('containJsx', function(jsx) {

  })

}
