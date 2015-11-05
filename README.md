# chai-jsx

[![Version][version-svg]][package-url] [![Build Status][travis-svg]][travis-url] [![License][license-image]][license-url] [![Downloads][downloads-image]][downloads-url]

A port of Algolia's [expect-jsx][expect-jsx] for the [Chai][chai] assertion
library.

It uses [algolia/react-element-to-jsx-string][react-element-to-jsx-string] in
the background to turn React elements into formatted strings.

## Setup

    npm install expect-jsx --save-dev

## Assertions

* expect(ReactComponent|JSX).to.be.jsx
* expect(ReactComponent|JSX).to.not.be.jsx
* expect(ReactComponent|JSX).to.equalJsx(ReactComponent|JSX)
* expect(ReactComponent|JSX).to.not.equalJsx(ReactComponent|JSX)
* expect(ReactComponent|JSX).to.containJsx(ReactComponent|JSX)
* expect(ReactComponent|JSX).to.not.containJsx(ReactComponent|JSX)

## Usage

Here's an example using [mochajs/mocha](https://github.com/mochajs/mocha).

```js
import chai, {expect} from 'chai'
import chaiJsx from 'chai-jsx'
import React from 'react'

chai.use(chaiJsx)

class TestComponent extends React.Component {}

describe('expect-jsx', () => {

  it('works', () => {
    expect(<div/>).to.equalJsx(<div/>)
    // ok

    expect(<div a="1" b="2"/>).to.equalJsx(<div/>)
    // Error: Expected '<div\n  a="1"\n  b="2"\n/>' to equal '<div />'

    expect(<span/>).to.not.equalJsx(<div/>)
    // ok

    expect(<div><TestComponent/></div>).to.containJsx(<TestComponent/>)
    // ok
  })

})
```

It looks like this when ran:

![Screenshot when using mocha][screenshot]

## A note about functions

`to.equalJsx` will not check for function references, it only checks that if a
`function` was expected somewhere, there's also a function in the actual data.

It's your responsibility to then unit test those functions.

[travis-svg]: https://img.shields.io/travis/bkonkle/chai-jsx/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/bkonkle/chai-jsx
[license-image]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/chai-jsx.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=chai-jsx
[version-svg]: https://img.shields.io/npm/v/chai-jsx.svg?style=flat-square
[package-url]: https://npmjs.org/package/chai-jsx
[screenshot]: ./screenshot.png
[expect-jsx]: https://github.com/algolia/expect-jsx
[chai]: http://chaijs.com
[react-element-to-jsx-string]: https://github.com/algolia/react-element-to-jsx-string
