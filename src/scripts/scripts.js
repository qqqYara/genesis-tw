
const race = ['Volume 1', 'Volume 2', 'Volume 3', 'Volume 4', 'Volume 5'];
class Dropdown extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      haveText: ""
    }
  }

  render() {
    const {isOpen, haveText} = this.state;

    return (
      <div
        className={isOpen ? "dropdown active" : "dropdown"}
        onClick={this.handleClick} >
        <div className="dropdown__text">
          {!haveText ? "Column 1: Date" : haveText}
        </div>
        {this.itemList(race)}
      </div>
    )
  }

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleText = (ev) => {
    this.setState({
      haveText: ev.currentTarget.textContent
    })
  }

  itemList = props => {
    const list = props.map((item) => (
      <div
        onClick={this.handleText}
        className="dropdown__item"
        key={item.toString()}>
        {item}
      </div>
    ));

    return (
      <div className="dropdown__items"> { list } </div>
    )
  }
}

class AddColumn extends React.Component {
  render(){
    return (
      <div className="adittional_column">

        <div className="body__row-item">
          <div className="row_name">Columns</div>
          <div className="row_settings">
            <input type="file" id="upload_xls"/>
            <label htmlFor="upload_xls">file</label>
          </div>
        </div>

        <div className="body__row-item">
          <div className="row_name">Date</div>
          <div className="row_settings">
            <Dropdown />
            <input type="text" placeholder="Month"/>
            <input type="text" placeholder="Day"/>
            <input type="text" placeholder="Year"/>
          </div>
        </div>

        <div className="body__row-item">
          <div className="row_name">Description</div>
          <div className="row_settings">
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
        </div>

      </div>

    );
  }
}
class Popup extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      inputLinkClicked: false
    }
  }
  handleAddColumn() {
    this.setState({
      inputLinkClicked: true
    })
  }
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
            
            <div className="popup_body__row">
              <input type="checkbox" id="first_row"/>
              <label htmlFor="first_row">First row in file is a header row</label>
            </div>

            <div className="popup_body__row ">
              <AddColumn />
              {
                this.state.inputLinkClicked?                
                <AddColumn />
                :
                <div></div>
              }
              <button
                type="button"
                className="add_column-btn"
                data-add-button=""
                href="#"
                onClick={this.handleAddColumn}
              >
                To map one more column
              </button>
              {/*<div className="add_column-btn" onClick={this.handleAddColumn}>To map one more column</div>*/}
            </div>
          
          </div>
               <div className=""></div>
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
        <div onClick={this.togglePopup.bind(this)}>Upload transactions</div>
       
        
        {this.state.showPopup ? <Popup text='Popup window text' refreshPage={this.togglePopup.bind(this)}/> : null}
      </div>
    );
  }
};



ReactDOM.render(
  <App />,
  document.getElementById('app-content')
);
