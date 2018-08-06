import React from 'react';

import barMinMaxImage from '../../images/bar-min-max.png';
import barImage from '../../images/bar.png';
import lineAreaImage from '../../images/line-area.png';
import lineMinMaxImage from '../../images/line-min-max.png';
import lineImage from '../../images/line.png';
import pieImage from '../../images/pie.png';

const DRAGGABLE_EL_STYLE = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '3px',
  margin: '3px',
  borderRadius: '5px',
  background: '#293441',
}

export default class LeftSideBar extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const els = this.props.elTypes.map(el => {
      let image = null;

      // this needs to be updated if you add a chart, also,
      // import the image like above
      switch (el) {
        case "pie":
          image = pieImage;
          break;
        case "bar":
          image = barImage;
          break;
        case "line":
          image = lineImage;
          break;
        case "line-area":
          image = lineAreaImage;
          break;
        case "bar-min-max":
          image = barMinMaxImage;
          break;
        case "line-min-max":
          image = lineMinMaxImage;
          break;
        default: 
          image = pieImage;
      }
      
      return (
        <div
          key={Date.now() * Math.random()}
          style={ DRAGGABLE_EL_STYLE }
          data-id={ el }
          data-name={ el.replace(/-/g, ' ') }
          draggable="true"
          onDragStart={this.props.dragStart}
        >
          { 
            image ? 
              <img src={image} draggable="false" style={{ maxWidth: '100%' }} /> : 
              el 
          }
        </div>
      )
    })


    return (
      <div className="draggable-items">
        { els }
      </div>
    )
  }
};