# Enzyme React 16 adapter setup

Easy way to setup enzyme for React 16 in Jest.

## Instalation

```bash
# Using yarn
yarn add --dev enzyme react-test-renderer enzyme-adapter-react-16 enzyme-react-16-adapter-setup

# Or using npm
npm install --dev enzyme react-test-renderer enzyme-adapter-react-16 enzyme-react-16-adapter-setup
```

## Setup

The idea of this package is to make a file in order to set up enzyme.

The easyest way is to use jest's `setupFiles`. Make sure your `package.json` includes the following:

```json
{
  // ...
  "jest": {
    // ...
    "setupFiles": [
      "raf/polyfill",
      "enzyme-react-16-adapter-setup"
    ]
  }
}
```

**Note:** The example also adds _requestAnimationFrame_ polyfill, if you are testing with _jsdom_, probabably you'll need it. In order to install it just do the following:

```bash
# Using yarn
yarn add --dev raf

# Or using npm
npm install --dev raf
```

### Create React App

If you are using _Create React App_, you won't be able to use jest's `setupFiles`. You'll need to create the file `src/setupTests.js` with the following content:

```js
// src/setupTests.js
import 'raf/polyfill';
import 'enzyme-react-16-adapter-setup';
```

**Note:** You'll also have to add a _requestAnimationFrame_ polyfill as _jsdom_ doesn't provide one:
```bash
# Using yarn
yarn add --dev raf

# Or using npm
npm install --dev raf
```
