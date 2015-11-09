# jsx-chai

[![Version][version-svg]][package-url] [![Build Status][travis-svg]][travis-url] [![License][license-image]][license-url] [![Downloads][downloads-image]][downloads-url]

A port of Algolia's [expect-jsx][expect-jsx] for the [Chai][chai] assertion
library.

It uses [algolia/react-element-to-jsx-string][react-element-to-jsx-string] in
the background to turn React elements into formatted strings.

## Setup

    npm install jsx-chai --save-dev

## Assertions

    expect(ReactComponent|JSX).to.be.an.element
    expect(ReactComponent|JSX).to.not.be.an.element
    expect(ReactComponent|JSX).jsx.to.equal(ReactComponent|JSX)
    expect(ReactComponent|JSX).jsx.to.not.equal(ReactComponent|JSX)
    expect(ReactComponent|JSX).jsx.to.include(ReactComponent|JSX)
    expect(ReactComponent|JSX).jsx.to.not.include(ReactComponent|JSX)

## Usage

Here's an example using [mochajs/mocha](https://github.com/mochajs/mocha).

```js
import chai, {expect} from 'chai'
import jsxChai from 'jsx-chai'
import React from 'react'

chai.use(jsxChai)

class TestComponent extends React.Component {}

describe('jsx-chai', () => {

  it('works', () => {
    expect(<div/>).jsx.to.equal(<div/>)
    // ok

    expect(<div a="1" b="2"/>).jsx.to.equal(<div/>)
    // Error: Expected '<div\n  a="1"\n  b="2"\n/>' to equal '<div />'

    expect(<span/>).jsx.to.not.equal(<div/>)
    // ok

    expect(<div><TestComponent/></div>).jsx.to.include(<TestComponent/>)
    // ok
  })

})
```

It looks like this when ran:

![Screenshot when using mocha][screenshot]

## A note about functions

`jsx.to.equal` will not check for function references, it only checks that if a
`function` was expected somewhere, there's also a function in the actual data.

It's your responsibility to then unit test those functions.

[travis-svg]: https://img.shields.io/travis/bkonkle/jsx-chai/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/bkonkle/jsx-chai
[license-image]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/jsx-chai.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=jsx-chai
[version-svg]: https://img.shields.io/npm/v/jsx-chai.svg?style=flat-square
[package-url]: https://npmjs.org/package/jsx-chai
[screenshot]: ./screenshot.png
[expect-jsx]: https://github.com/algolia/expect-js
[chai]: http://chaijs.com
[react-element-to-jsx-string]: https://github.com/algolia/react-element-to-jsx-string