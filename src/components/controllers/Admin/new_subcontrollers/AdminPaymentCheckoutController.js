import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { isMobile } from 'react-device-detect';

const  scriptLoaded = false;
let scriptLoading = false;

class AdminPaymentCheckoutController extends React.component {
  static defaultProps = {
    className: 'StripeCheckout',
    label: 'Pay With Card',
    locale: 'auto',
    ComponentClass: 'span',
    reconfigureOnUpdate: false,
    triggerEvent: 'onClick',
  }

  static _isMounted =false;

  state = {
    open: false,
    buttonActive: false,
  }

  componentDidMount = () => {
      this._isMounted = true;
      if (scriptLoaded) {
        return this.updateStripeHandler();
      }

      if (scriptLoading) {
        return;
      }

      scriptLoading = true;


    const script = document.createElement('script');
    if (typeof this.props.onScriptTagCreated === 'function') {
      this.props.onScriptTagCreated(script);
    }
    script.src = 'https://checkout.stripe.com/checkout.js';
    script.async = 1;

    this.loadPromise = (() => {
      const canceled = false;
      const promise = new Promise((resolve, reject) => {
        script.onload = () => {
            scriptLoaded = true;
        };
      });
    });
  }
}
