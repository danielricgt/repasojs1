import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
// import logo from './../../assets/universidad-logo.png';

// render if Auth Layout
const AuthLayoutContent = (props) => {
  document.body.classList.remove('bg-primary');
  document.body.style.backgroundColor = '#f8f8fa'
  return <React.Fragment>
    <div id="wrapper">
      <Topbar />
      <Sidebar />
      <div className="content-page">
        <div className="content">
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  </React.Fragment>
}

// render if Non-Auth Layout
const NonAuthLayoutContent = (props) => {
  return <React.Fragment>
    {props.children}
  </React.Fragment>
}

class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const path = this.props.location.pathname
    return (
      <React.Fragment>      
        {/* <AuthLayoutContent {...this.props} /> */}
        { path ? <AuthLayoutContent {...this.props} /> : <NonAuthLayoutContent {...this.props} />}
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  };
}

export default withRouter(connect(mapStatetoProps)(Layout));
