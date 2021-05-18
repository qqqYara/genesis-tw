
class Popup extends React.Component {  
  refreshPage(){ 
    window.location.reload(); 
  }
  render() {
    return (
      
      <div className='popup'>
        <div className='popup_inner'>
          <div className="popup_heading">
            <div className="title">Upload transactions</div>
            <div onClick={this.props.refreshPage}>close me</div>
          </div>
          <div className="popup_body">            
            <div className="title">Map columns. For each field, select bank account fields</div>
            
            
          </div>
          
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
 
  render() {
    return (
      <div>
        <div onClick={this.togglePopup.bind(this)}>show popup</div>
       
        
        {this.state.showPopup ? <Popup text='Popup window text' refreshPage={this.togglePopup.bind(this)}/> : null}
      </div>
    );
  }
};



ReactDOM.render(
  <App />,
  document.getElementById('app-content')
);
