/* eslint-disable react/no-multi-comp */
import chai, {AssertionError, expect} from 'chai'
import jsxChai from '../src/jsx-chai'
import React from 'react'

chai.use(jsxChai)

class SonicScrewdriver extends React.Component {}

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

  describe('expect().to.deep.equal()', () => {

    it('should not throw an error if the JSX is equal', () => {
      expect(
        () => expect(<SonicScrewdriver/>).to.deep.equal(<SonicScrewdriver/>)
      ).to.not.throw()
    })

    it('should throw an error if the JSX is not equal', () => {
      expect(
        () => expect(<SonicScrewdriver active={true}/>).to.deep.equal(<SonicScrewdriver/>)
      ).to.throw(AssertionError)
    })

    it('should allow normal expect().to.deep.equal() calls to work', () => {
      expect(
        () => expect('TARDIS').to.deep.equal('TARDIS')
      ).to.not.throw()
    })

  })

  describe('expect().to.not.deep.equal()', () => {

    it('should throw an error if the JSX is equal', () => {
      expect(
        () => expect(<SonicScrewdriver/>).to.not.deep.equal(<SonicScrewdriver/>)
      ).to.throw(AssertionError)
    })

    it('should not throw an error if the JSX is not equal', () => {
      expect(
        () => expect(<SonicScrewdriver active={true}/>).to.not.deep.equal(<SonicScrewdriver/>)
      ).to.not.throw()
    })

  })

  describe('expect().to.include()', () => {

    it('should not throw an error if the subject contains the given JSX', () => {
      expect(
        () => expect(<div><SonicScrewdriver/></div>).to.include(<SonicScrewdriver/>)
      ).to.not.throw()
    })

    it('should throw an error if the subject does not contain the given JSX', () => {
      expect(
        () => expect(<div><SonicScrewdriver/></div>).to.include(<SonicScrewdriver active={true}/>)
      ).to.throw(AssertionError)
    })

    it('should allow normal expect().to.include() calls to work', () => {
      expect(
        () => expect('Time And Relative Dimension in Space').to.include('Dimension')
      ).to.not.throw()
    })

    it('should allow normal expect().to.include.keys() calls to work', () => {
      expect(
        () => expect({test: 'value'}).to.include.keys('test')
      ).to.not.throw()

      expect(
        () => expect({test: 'value'}).to.include.keys('otherTest')
      ).to.throw(AssertionError)
    })

    it('should not fail for whitespace', () => {
      const whole = (
        <div>
          <span>
            <a>
              Foo
            </a>
          </span>
        </div>
      )
      const part = (
        <a>
          Foo
        </a>
      )

      expect(
        () => expect(whole).to.include(part)
      ).to.not.throw()
    })

    it('uses the underlying JSX object to determine if jsx-chai should be used', () => {
      class Component {
        render() {
          return <span>Left</span>
        }
      }

      const result = Component.prototype.render()

      expect(
        () => expect(result).to.include('Left')
      ).to.not.throw()
    })

  })

  describe('expect().jsx.to.not.include()', () => {

    it('should throw an error if the subject contains the given JSX', () => {
      expect(
        () => expect(<div><SonicScrewdriver/></div>).jsx.to.not.include(<SonicScrewdriver/>)
      ).to.throw(AssertionError)
    })

    it('should not throw an error if the subject does not contain the given JSX', () => {
      expect(
        () => expect(<div><SonicScrewdriver/></div>).jsx.to.not.include(<SonicScrewdriver active={true}/>)
      ).to.not.throw()
    })

  })

})
