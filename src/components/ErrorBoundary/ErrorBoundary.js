import React, { Component } from 'react';
import './ErrorBoundary.css';
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  componentDidCatch(error) {
    this.setState({
      error: `${error.name}: ${error.message}`,
    });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <>
          <div className='error-title'>Oops something went wrong!</div>
          <div className='error-msg'>{error}</div>
        </>
      );
    } else {
      return <>{this.props.children}</>;
    }
  }
}

export default ErrorBoundary;
