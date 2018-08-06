import React from 'react';

const INTERVALS = require('../config/variables').intervals;

export default class DateSelector extends React.Component {
   handleFormData(e) {
      e.stopPropagation();

      const from = this.refs.dateFrom;
      const to = this.refs.dateTo;

      this.props.handleDateRangeSelector(e, from, to);
   }

   render() {
      const intervals = INTERVALS.map((intervalName, i) => {
         return (
            <div 
               key={ Date.now() + i.toString() } 
               data-id={ i }
            >
              <label className="insights-container" data-id={ i }>
                <input className="checkmark" type="checkbox" data-id={ i } defaultChecked={ this.props.selectedDateRange === i ? 'checked' : ''} />
                <span className="checkmark radio" data-id={ i }></span>
                <span data-id={ i }>{ n.__(intervalName, "t") }</span>
              </label>
            </div>
         )
      });

      return (
         <div className={ "insights-date-selectors " + this.props.className } onClick={ this.props.handleDateRange }>

            { intervals }
   
            {/* <form className="custom-date-range" ref="dateRangeForm">
               <p>{ n.__("Custom", "t") }</p>
               <div className="insights-input-group">
                  <label>{ n.__("From", "t") }</label>
                  <input type="date" ref="dateFrom" />
               </div>
               <div className="insights-input-group">
                  <label>{ n.__("To", "t") }</label>
                  <input type="date" ref="dateTo" />
               </div>
               <input type="button" value={ n.__("Ok", "t") } onClick={ this.handleFormData } />
            </form> */}
         </div>
      )
   }
}

DateSelector.defaultProps = {
   handleDateRange: () => {},
   handleDateRangeSelector: () => {},
}