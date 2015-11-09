import chai, {AssertionError, expect} from 'chai'
import jsxChai from '../src/jsx-chai'
import React from 'react'

chai.use(jsxChai)

class SonicScrewdriver extends React.Component {}

describe('chai-jsx', () => {

  describe('expect().to.be.an.element', () => {

    it('should not throw an error if the object is a JSX element', () => {
      expect(
        () => expect(<SonicScrewdriver/>).to.be.an.element
      ).to.not.throw()
    })

    it('should throw an error if the object is not a JSX element', () => {
      expect(
        () => expect('SonicScrewdriver').to.be.an.element
      ).to.throw(AssertionError)
    })

  })

  describe('expect().to.not.be.an.element', () => {

    it('should throw an error if the object is a JSX element', () => {
      expect(
        () => expect(<SonicScrewdriver/>).to.not.be.an.element
      ).to.throw(AssertionError)
    })

    it('should not throw an error if the object is not a JSX element', () => {
      expect(
        () => expect('SonicScrewdriver').to.not.be.an.element
      ).to.not.throw()
    })

  })

  describe('expect().jsx.to.equal()', () => {

    it('should not throw an error if the JSX is equal', () => {
      expect(
        () => expect(<SonicScrewdriver/>).jsx.to.equal(<SonicScrewdriver/>)
      ).to.not.throw()
    })

    it('should throw an error if the JSX is not equal', () => {
      expect(
        () => expect(<SonicScrewdriver active={true}/>).jsx.to.equal(<SonicScrewdriver/>)
      ).to.throw(AssertionError)
    })

    it('should allow normal expect().to.equal() calls to work', () => {
      expect(
        () => expect('TARDIS').to.equal('TARDIS')
      ).to.not.throw()
    })

    it('should reject objects that are not JSX elements', () => {
      expect(
        () => expect('TARDIS').jsx.to.equal(<SonicScrewdriver/>)
      ).to.throw(AssertionError)
    })

  })

  describe('expect().jsx.to.not.equal()', () => {

    it('should throw an error if the JSX is equal', () => {
      expect(
        () => expect(<SonicScrewdriver/>).jsx.to.not.equal(<SonicScrewdriver/>)
      ).to.throw(AssertionError)
    })

    it('should not throw an error if the JSX is not equal', () => {
      expect(
        () => expect(<SonicScrewdriver active={true}/>).jsx.to.not.equal(<SonicScrewdriver/>)
      ).to.not.throw()
    })

  })

  describe('expect().jsx.to.include()', () => {

    it('should not throw an error if the subject contains the given JSX', () => {
      expect(
        () => expect(<div><SonicScrewdriver/></div>).jsx.to.include(<SonicScrewdriver/>)
      ).to.not.throw()
    })

    it('should throw an error if the subject does not contain the given JSX', () => {
      expect(
        () => expect(<div><SonicScrewdriver/></div>).jsx.to.include(<SonicScrewdriver active={true}/>)
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

    it('should reject objects that are not JSX elements', () => {
      expect(
        () => expect('TARDIS').jsx.to.include(<SonicScrewdriver/>)
      ).to.throw(AssertionError)
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
