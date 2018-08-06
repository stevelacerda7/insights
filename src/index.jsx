import React from 'react';
import { checkNux, constants as c } from './constants';

require('./styles/index.css');

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.displayName = n.__(c.display_name, 't');
  }

  render() {
    return (
        <div style={{flex: 1, position: "relative", width: "100%", height: "100%"}}>
          {this.props.children}
        </div>
    );
  }
}

module.exports = Main;