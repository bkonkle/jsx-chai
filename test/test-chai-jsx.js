import chai, {AssertionError, expect} from 'chai'
import chaiJsx from '../src/chai-jsx'
import React from 'react'

chai.use(chaiJsx)

class SonicScrewdriver extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
  }

  render() {
    return <div>Hi! {this.props.name}</div>
  }

}

describe('chai-jsx', () => {

  describe('expect().to.be.jsx', () => {

    it('should not throw an error if the object is a JSX element', () => {
      expect(
        () => expect(<SonicScrewdriver/>).to.be.jsx
      ).to.not.throw()
    })

    it('should throw an error if the object is not a JSX element', () => {
      expect(
        () => expect('SonicScrewdriver').to.be.jsx
      ).to.throw(AssertionError)
    })

  })

  describe('expect().to.not.be.jsx', () => {

    it('should throw an error if the object is a JSX element', () => {
      expect(
        () => expect(<SonicScrewdriver/>).to.not.be.jsx
      ).to.throw(AssertionError)
    })

    it('should not throw an error if the object is not a JSX element', () => {
      expect(
        () => expect('SonicScrewdriver').to.not.be.jsx
      ).to.not.throw()
    })

  })

  describe('expect().to.equalJsx()', () => {

    it('should not throw an error if the JSX is equal', () => {
      expect(
        () => expect(<SonicScrewdriver/>).to.equalJsx(<SonicScrewdriver/>)
      ).to.not.throw()
    })

    it('should throw an error if the JSX is not equal', () => {
      expect(
        () => expect(<SonicScrewdriver active={true}/>).to.equalJsx(<SonicScrewdriver/>)
      ).to.throw(AssertionError)
    })

  })

  describe('expect().to.not.equalJsx()', () => {

    it('should throw an error if the JSX is equal', () => {
      expect(
        () => expect(<SonicScrewdriver/>).to.not.equalJsx(<SonicScrewdriver/>)
      ).to.throw(AssertionError)
    })

    it('should not throw an error if the JSX is not equal', () => {
      expect(
        () => expect(<SonicScrewdriver active={true}/>).to.not.equalJsx(<SonicScrewdriver/>)
      ).to.not.throw()
    })

  })

  describe('expect().to.conatinJsx()', () => {

    it('should not throw an error if the subject contains the given JSX')

    it('should throw an error if the subject does not contain the given JSX')

  })

  describe('expect().to.not.conatinJsx()', () => {

    it('should throw an error if the subject contains the given JSX')

    it('should not throw an error if the subject does not contain the given JSX')

  })

})
