import React from 'react';
import '../css/NavBar.css';
import '../js/script';


class NavBar extends React.Component {
      constructor(props) {
      super(props);

      this.state = { openAbout: false }
  }

 
openAbout() {
  let aboutMenu = document.querySelector('.about_menu');

  if(aboutMenu.style.display === 'inline-table') {
    aboutMenu.style.display = 'none';
  } else {
    aboutMenu.style.display = 'inline-table';
  }
}


openTermsOfUse() {
  let termsModal = document.querySelector('.terms_modal');
  let aboutMenu  = document.querySelector('.about_menu');
        // close about menu after click
      aboutMenu.style.display = 'none';
        // open terms modal
      termsModal.style.display = 'block';
   
}

  render() {

    return (
          <div>
            <div className='row justify-content-center'>
              <div className='navbar_container col-12'>
                <div className='row'>
                
                  <div className='about_div'>
                       <span className='about_button' onDragStart={(e) => { e.preventDefault() }} onClick={() => this.openAbout()}>About <span>&#9662;</span></span>   
                       <div className='about_menu'>
                          <span className='sub_menu sub_menu_terms col-12' onClick={() => this.openTermsOfUse()}>Terms of use</span>
                          <span className='sub_menu col-12' onDragStart={(e) => { e.preventDefault() }}>Contact:</span>
                          <span className='contact_sub_span col-12' onDragStart={(e) => { e.preventDefault() }}>contact@ionutdev.com</span>
                    
                            <span className='contact_sub_span col-12' onDragStart={(e) => { e.preventDefault() }}>
                             <a href='https://www.ionutdev.com'>
                            www.ionutdev.com
                            </a>
                            </span>
                       </div>
                  </div>
              

                  <div className='navbar_logo' onDragStart={(e) => { e.preventDefault() }}>
                      <span className='logo_img'>
                          <a href='https://ionutdev.com/sionut0122/imgfbhost'>
                        <img src={require('../images/logo_img.jpg')} alt=''/>
                        </a>
                      </span>
                      <span className='logo_txt'>imgFBHost</span>
                  </div>
                
                </div>
              </div>
            </div>
          </div>

      )
  }
}
 
export default NavBar;
