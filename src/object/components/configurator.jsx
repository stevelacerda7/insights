import React from 'react';


export default class Configurator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    }

    this.openConfigurator = this.openConfigurator.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isOpen) {
      this.setState({
        isOpen: true,
      })
    }
  }

  openConfigurator() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    let dataTypes = [];
    
    for (let key in this.props.dataTypes) {
      dataTypes.push(this.props.dataTypes[key]);
    }

    return (
      <div 
        className={"insights-configuration " + (this.state.isOpen ? 'isOpen' : '')} 
        onClick={this.openConfigurator}
      >
        {
          this.state.isOpen ?
            <form>
              {
                dataTypes.map(dataType => {
                  return (
                    <label 
                      className="insights-data-type" 
                      key={ dataType.type }
                      data-id={ this.props.id } 
                      data-type={ dataType.type }
                      onClick={ this.props.selectDataType }
                    >
                      <input
                        type="radio"
                        name="config"
                        value={dataType.type}
                        defaultChecked={ dataType.type == this.props.selectedDataType }
                      />
                      <span>{dataType.type}</span>
                    </label>
                  )
                })
              }
            </form> :
            ""
        }
      </div>
    )
  }
}
