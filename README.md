# jsx-chai

[![Version][version-svg]][package-url] [![Build Status][travis-svg]][travis-url] [![License][license-image]][license-url] [![Downloads][downloads-image]][downloads-url]

A port of Algolia's [expect-jsx][expect-jsx] for the [Chai][chai] assertion
library.

It uses [algolia/react-element-to-jsx-string][react-element-to-jsx-string] in
the background to turn React elements into formatted strings.

**What's different from chai-jsx?** The *chai-jsx* project was started after
this one, but it made it to npm faster. This project was renamed to *jsx-chai*,
and has a few key differences:

* The `jsx` flag is not necessary when checking equality. If the value is a JSX
  element and the `deep` flag is enabled (either by using it explicitly, or by
  using `eql` instead of `equal`) then JSX comparison is performed.
* A `to.be.jsx` assertion is included.
* A browser bundle is included in the *dist* folder.


## Installation

First make sure you have the peerDependencies installed:

    npm install react

Then install *jsx-chai*:

    npm install jsx-chai --save-dev

## Assertions

JSX comparison will kick in on deep equality checks, but normal strict equality
will apply when the 'deep' flag is not used.

```javascript
    expect(<Component/>).to.be.jsx
    expect('Component').to.not.be.jsx
    expect(<Component/>).to.deep.equal(<Component/>)
    expect(<Component prop='value'/>).to.not.deep.equal(<Component prop='other-value'/>)
    expect(<Component/>).to.eql(<Component/>)
    expect(<Component prop='value'/>).to.not.eql(<Component otherProp='value'/>)
    expect(<Component><h1>Title</h1></Component>).to.include(<h1>Title</h1>)
    expect(<Component><h1>Title</h1></Component>).to.not.include(<div/>)
```

Note: `include.keys()` calls will look for normal object properties, and will
not use JSX comparison.

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
    expect(<div/>).to.deep.equal(<div/>)
    // ok

    expect(<div a="1" b="2"/>).to.deep.equal(<div/>)
    // Error: Expected '<div\n  a="1"\n  b="2"\n/>' to equal '<div />'

    expect(<span/>).to.not.deep.equal(<div/>)
    // ok

    expect(<div><TestComponent/></div>).to.include(<TestComponent/>)
    // ok
  })

})
```

It looks like this when ran:

![Screenshot when using mocha][screenshot]

## A note about functions

`to.deep.equal` and `to.eql` will not check for function references, it only
checks that if a `function` was expected somewhere, there's also a function in
the actual data.

It's your responsibility to then unit test those functions.

## A note about the browser bundle

If you're using the browser bundle in *dist* with standard browser globals,
make sure you are using the un-minified development version of React with
addons. This library uses React.addons.TestUtils, which is not available in the
production build or the build without addons.

[travis-svg]: https://img.shields.io/travis/bkonkle/jsx-chai/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/bkonkle/jsx-chai
[license-image]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/jsx-chai.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=jsx-chai
[version-svg]: https://img.shields.io/npm/v/jsx-chai.svg?style=flat-square
[package-url]: https://npmjs.org/package/jsx-chai
[screenshot]: ./screenshot.png
[expect-jsx]: https://github.com/algolia/expect-jsx
[chai]: http://chaijs.com
[react-element-to-jsx-string]: https://github.com/algolia/react-element-to-jsx-string
