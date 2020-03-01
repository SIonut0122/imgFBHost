import React           from 'react';
import UploadContainer from './UploadContainer';
import GetImgLink      from './GetImgLink';
import NavBar          from './NavBar';
import Terms           from './Terms';
import { connect }     from "react-redux";
import { addImage }    from '../actions/index';
import '../js/script';
import '../css/Main.css';



 function mapDispatchToProps(dispatch) {
  return {
    addImage: img => dispatch(addImage(img))
  };
}


 const mapStateToProps = state => {
  return {  imgURL: state.imgURL };
 };


class ConnectedApp extends React.Component {
      constructor(props) {
      super(props);

      this.state = { 
            imgURL:    this.props.imgURL,
            openTerms: false,
            }
  }

closeModal() {
   let wrong_format_bgdrop = document.querySelector('.wrong_format_bgdrop'),
       maxSizeModalTxt     = document.querySelector('.invalid_imgsize_big');
  
      // display wrong format modal
    wrong_format_bgdrop.style.display = 'none';
      // display img size modal text alert
    maxSizeModalTxt.style.display = 'none';    
}

checkAboutMenu() {
    let aboutMenu = document.querySelector('.about_menu');
      // close about menu
    aboutMenu.style.display = 'none';
}

  render() {
    return (
        <div>
           <div className='container-fluid container'>
      
            {/* ------ NavBar Container Component ------ */}

               <div className='row justify-content-center'>
                  <div className='wrap_header col-12'>
                        <NavBar />
                  </div>
               </div>

            {/* ------ Wrong Format Container Component ------ */}

               <div className='row justify-content-center'>
                 <div className='wrong_format_bgdrop'>
                    <div className='row justify-content-center'>
                   
                      <div className='wrong_format_div col-11 col-sm-8 col-md-6 col-lg-4 col-xl-4'>
                          <div className='row justify-content-center'>
                              <div className='img_cann_added col-10'>
                                  <span className='mr-auto'>Image cannot be added</span>
                                  <span className='close_error_modal ml_auto' onClick={() => this.closeModal()}>&#10006;</span>
                                </div>
                          </div>

                           <div className='row justify-content-center'>
                              <div className='invalid_format_txt col-10'>
                                <span className='invalid_format_name'></span> 
                                  - Invalid or unsupported file format.
                              </div>
                           </div>

                           <div className='row justify-content-center'>
                             <div className='invalid_imgsize_big col-10'>Maximum file size: 10mb</div>
                           </div>
                      </div>
                  
                      </div>
                   </div>
               </div>
       
            {/* ------ Terms Container Component ------ */}

               <div className='row justify-content-center'>
                  <div className='terms_modal col-11'>
                        <Terms />
                  </div>
               </div>
            
               <div className='row justify-content-center'>
                  <div className='wrap_middle col-12 col-md-10 col-lg-9 col-xl-9' onClick={() => this.checkAboutMenu()}>
                        <div className='row justify-content-center'>


                    {/* -------- Middle logo container -------- */}

                        <div className='middle_logo_container col-12'>
                            <div className='row justify-content-center'>
                                <div className='allowed_format_div col-12'>
                                    <div className='ml-auto wrap_allowed_txt' onDragStart={(e) => { e.preventDefault() }}>
                                          jpg jpeg png gif bmp
                                    </div>
                                </div>
                         
                                <div className='middle_logo_img'>
                                  <div className='row justify-content-center'>
                                      <span></span>
                                      <span></span>
                                  </div>
                                </div>
     
                            </div>
                         
                          <div className='row justify-content-center'>
                             {this.props.imgURL ? (
                            <a href='#'>
                              <span className='back_button' title='Back to main page'>
                                <a href='https://ionutdev.com/sionut0122/imgfbhost'>
                                  &#171; Upload more
                                </a>
                              </span>
                            </a>
                                ) : ('')}
                          </div>
                        </div>

                      {/* ------ Upload + GetLink Container Component ------ */}

                        <div className='wrap_upload_container col-12'>
                          <div className='row justify-content-center'>
                            <div className='col-12'>
                                
                                {!this.props.imgURL ? (
                                    <UploadContainer />
                                  ) : ('')}
                                
                                {this.props.imgURL ? (
                                    <GetImgLink />
                                  ) : ('')}
                             
                             </div>
                          </div>
                        </div>

                      </div>
                  </div>
               </div>
             
              <div className='row justify-content-center'>
                <span className='allrights_txt'>©2019
                    <a href='https://www.ionutdev.com'> 
                       ionutdev.com 
                    </a>
                   - All rights reserved.
                 </span> 
               </div>
        
           </div>
        </div>

      )
   }
}

const Main = connect(mapStateToProps,mapDispatchToProps)(ConnectedApp);
export default Main;
