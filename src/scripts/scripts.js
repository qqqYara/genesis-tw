var app = {

    init: function() {
        // app.menu();
        // app.modal();
        // app.sliders();
        // app.screen_scroll();
        // app.screen_scrolling();
        // app.stages();
        // app.lazyload();
        // app.preloader();
        // app.formValidation();
        // app.phoneMask();
        // app.section_services();
    }, // init END

    screen_scrolling: function() {

        fullpage = $('').fullpage({});

    }, // screen_scrolling END
}

// jQuery(document).ready(function($) {
//     console.log( 'Документ и все ресурсы загружены' );
//     app.init();


//     $('.menu-toggle').on('click', function(e) {
//         e.preventDefault();
//         $('.hamburger').toggleClass('active');
//     });

// });


 
class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
      popupHeader:"Looks like you don't have an account"
    };
  }
  
   refreshPage(){ 
    window.location.reload(); 
  }
  render() {
    var headerStyle = {
      color:'red',
      fontWeight:'bold',
      fontSize: 20
    }
    return (
      
      <div className='popup'>
        <div className='popup_inner'>
       <div style={headerStyle}>
       Hello
          </div>
          {/* <button onClick={this.props.closePopup} */}
          <button onClick={this.props.refreshPage}>close me</button>
        </div>
      </div>
    );
  }
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      header:"Welcome"
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
        <h1>hihi</h1>
      
         <a href="www.google.com" target="_blank">Test Link</a>
        <br></br>
        <button onClick={this.togglePopup.bind(this)}>show popup</button>
       
        
        {this.state.showPopup ? 
          <Popup
            text='Popup window text'
            refreshPage={this.togglePopup.bind(this)}
          />
          : null
        }
      </div>
    );
  }
};



ReactDOM.render(
  <App />,
  document.getElementById('content')
);
