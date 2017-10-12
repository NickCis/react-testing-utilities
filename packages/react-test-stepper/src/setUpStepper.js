import React from 'react';

const setUpStepper = (render, steps) => {
  class Stepper extends React.Component {
    componentDidMount() {
      this.next();
    }

    componentDidUpdate() {
      this.next();
    }

    next() {
      const nextStep = steps.shift();
      // eslint-disable-next-line react/prop-types
      if (nextStep) nextStep.call(this, this.props, this);
    }

    render() {
      return render.call(this, this);
    }
  }

  return Stepper;
};

export default setUpStepper;
