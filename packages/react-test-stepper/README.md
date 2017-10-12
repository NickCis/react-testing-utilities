# Enzyme React 16 adapter setup

 A _HOC_ to step throught actions in order to test a Component.

## Instalation

```bash
# Using yarn
yarn add --dev react-test-stepper

# Or using npm
npm install --dev  react-test-stepper
```

## Use

The idea of this package is to assert conditions while making some changes or steps to a component.

The only funcion exported is `setUpStepper(renderFunction: (this) => ReactComponent, steps[]: (props, this) => null) => ReactComponent`.

This function has two arguments:

1. `renderFunction`: The function is used as the _render_ function. The _this_ object is changed to the _hoc_'s one. In addition, it receives that component's _this_ as first argument.
2. `steps`: It's an array of functions. Each function should be an step. The _this_ object is changed to the _hoc_'s one. Two arguments are passed:
  1. the `props` of the _hoc_.
  2. _hoc_'s this

The function returns a _React Component_.

**Note:** Each step is executed on _componentDidMount_ / _componentDidUpdate_ phase, so all steps should trigger that phases.

See the example.


## Examples

### React Router

A simple example is testing something that involves url triggering. The following example is done with _React Router_.

```js
import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { mount } from 'enzyme';
import { setUpStepper } from 'react-test-stepper';

describe('Testing memory router', () => {
  it('should render the correct component', done => {
    const ComponentA = jest.fn().mockReturnValue(null);
    const ComponentB = jest.fn().mockReturnValue(null);
    const steps = [
      ({ history }) => history.push('/a'),
      ({ history }) => {
        expect(ComponentA).toHaveBeenCalled();
        expect(ComponentB).not.toHaveBeenCalled();
         history.push('/b');
      },
      () => {
        expect(ComponentB).toHaveBeenCalled();
        done();
      },
    ];

    const routes = [
      {
        component: setUpStepper(t => renderRoutes(t.props.route.routes), steps),
        routes: [
          {
            component: ComponentA,
            path: '/a',
          },
          {
            component: ComponentB,
            path: '/b',
          },
        ],
      },
    ];

    mount(
      <Router>{renderRoutes(routes)}</Router>
    );
  });
});
```

### Fetching function is called

```js
import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { mount } from 'enzyme';
import { setUpStepper } from 'react-test-stepper';

describe('Component', () => {
  it('should call fetchSth when the component is mounted', done => {
    const fetchSth = jest.fn();
    class Component extends React.Component {
      componentDidMount() {
        fetchSth(this.props.arg);
      }

      render() { return null; }
    }

    const steps = [
      (props, t) => t.setState({arg: 1}),
      function() {
        expect(fetchSth).toHaveBeenLastCalledWith(1);
        // In order to trigger again Component::componentDidMount
        // (if we only change the props, Component is never unmounted, so it won't be mounted again, only it's props will change
        this.setState({arg: undefined});
      },
      (props, t) => t.setState({arg: 2}),
      () => {
        expect(fetchSth).toHaveBeenLastCalledWith(2);
        done();
      }
    ];

    const Stepper = setUpStepper(function() {
      // Initial state is null
      const { arg } = this.state || {};
      if (arg)
        return <Component arg={arg} />;
      return null;
    }, steps);

    mount(<Stepper />);
  });
});
```
