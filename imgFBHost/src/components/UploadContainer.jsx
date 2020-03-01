import React        from 'react';
import {storage}    from '../firebase/index';
import { connect }  from "react-redux";
import { addImage } from "../actions/index";
import Dropzone     from 'react-dropzone';
import '../css/uploadContainer.css';
const uuidv1 = require('uuid/v1');


function mapDispatchToProps(dispatch) {
  return {
    addImage: img => dispatch(addImage(img))
  };
}

 
class connectedUploadContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
          img:                     '',
          imgOriginName:           false,
          allowedImageType:        false,
          allowedImageSize:        false,
          imgURL:                  '',
          loadingUpload:           false,
          previewSrc:              false,
          cancelUpload:            false,
          loadWhiteProgressSlider: false
          }
  }

 

handleFormChange(e) {
   let inputFile = document.querySelector('.input_file');
 
            // get origin file name
        if(e.target.value) {
          this.setState({ imgOriginName: e.target.files[0].name, cancelUpload: false});
        }
            // check image type
        if(e.target.value.match(/.png|.PNG|.jpg|.JPG|.jpeg|.JPEG|.bmp|.BMP|.gif|.GIF|.tif|.TIF|.webp|.WEBP|.tif|.TIF/g)) {
          this.setState({ img: e.target.files[0] , allowedImageType: true, loadingUpload: true });
                // preview image 
            if(e.target.files[0].size <= 10000000) {
                  this.setState({ previewSrc: true })
             let reader = new FileReader();
              // get image src to get preview image
              reader.onload = function() {
                 let output = document.querySelector('.preview_upload_img');
                    output.src = reader.result;
            }
            reader.readAsDataURL(e.target.files[0]);
           }

        } else {
             this.setState({ img: '' , allowedImageType: false, loadingUpload: false });
             // display unsupported format modal
             let wrong_format_bgdrop = document.querySelector('.wrong_format_bgdrop'),
                 invalid_format_name = document.querySelector('.invalid_format_name');
             // get file name
             invalid_format_name.innerHTML = e.target.files[0].name;
             // display wrong format modal
             wrong_format_bgdrop.style.display = 'block';
        } 
            // handle file size
          if(e.target.files[0] && e.target.files[0].size <= 10000000) {
            this.setState({ allowedImageSize: true})
          } else {
         
            let maxSizeModalTxt     = document.querySelector('.invalid_imgsize_big'),
                wrong_format_bgdrop = document.querySelector('.wrong_format_bgdrop'),
                invalid_format_name = document.querySelector('.invalid_format_name');
                   // get file name
                invalid_format_name.innerHTML = e.target.files[0].name;
                  // clear input value
                inputFile.value = '';
                  // display img size modal text alert
                maxSizeModalTxt.style.display = 'block';
                 // display wrong format modal
                wrong_format_bgdrop.style.display = 'block';
             
                this.setState({ img: '', allowedImageSize: false, loadingUpload: false })
        }
       
          if(
           this.state.img.length !== 0 && 
           this.state.allowedImageSize && 
           this.state.allowedImageType) {
           this.setState({loadingUpload: true })    
          }   
}


formHandler() {
 
  let uuid                 = uuidv1(),
      img                  = this.state.img,
      self                 = this,
      uploadImgPercent     = document.querySelector('.upload_percent'),
      loadPercSlider       = document.querySelector('.loading_percent_slider'),
      uploadTxtDynPerc     = document.querySelector('.up_txt_per_din'),
      uploadingTextPercent = document.querySelector('.uploading_txt_percent'),
      upload_button        = document.querySelector('.upload_button');
 
        // display progress percent text
          uploadingTextPercent.style.display = 'block';
        // hide Browse image button
          upload_button.style.display = 'none';
        
      const uploadTask = storage.ref(`images/${uuid}/${img.name}`).put(img);
  
      uploadTask.on('state_changed', function(snapshot){ 
        // cancel the upload
        if(self.state.cancelUpload) {
          uploadTask.cancel();
          // change state to be able to reupload a new image
          self.setState({ cancelUpload: false })
        }
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // display progress transparent percent slider over the image
        loadPercSlider.style.display = 'block';
          // display progress over the image
        uploadImgPercent.innerHTML = Math.round(progress)+'%';
          // display progress above image
        uploadTxtDynPerc.innerHTML = Math.round(progress)+'%';
          // animate .white slider over image according to the progress percent
        loadPercSlider.style.right = '-'+progress+'%';
        }, function(error) {
              console.log(error);
        }, function() {

       uploadTask.snapshot.ref.getDownloadURL()
        .then(function(downloadURL) {
          self.setState({imgURL: downloadURL})
        const { imgURL, loadingUpload } = self.state;
      self.props.addImage({ loadingUpload, imgURL});

        });
      });
}


cancelUpload() {
    this.setState({ cancelUpload: true, loadingUpload: false, img: '', previewSrc: false  })
    const { loadingUpload, img, } = this.state;
    this.props.addImage({ loadingUpload, img });
}

onDrop(files, rejected) {
    let  wrap_uploadContainer_div = document.querySelector('.wrap_uploadContainer_div'),
         dropZone_div             = document.querySelector('.dropZone_div'),
         drop_img_here_img        = document.querySelector('.drop_img_here_img');
    
        // hide 'Drop image here text'
          drop_img_here_img.style.display = 'none';
        // display uploadContainer div
          wrap_uploadContainer_div.style.display = 'block';
        // remove dashed border effect after drop
          dropZone_div.removeAttribute('style');
        // get origin file name
        if(files) {
          this.setState({ imgOriginName: files[0].name, cancelUpload: false });
        }

          // check image type
        if(files[0].name.match(/.png|.PNG|.jpg|.JPG|.jpeg|.JPEG|.bmp|.BMP|.gif|.GIF|.tif|.TIF|.webp|.WEBP|.tif|.TIF/g)) {
          this.setState({ img: files[0] , allowedImageType: true, loadingUpload: true });

             // preview image 
             if(files[0].size <= 10000000) {
                this.setState({ previewSrc: true })
               let reader = new FileReader();
                // get img src to set the preview image
              reader.onload = function() {
                let output = document.querySelector('.preview_upload_img');
                output.src = reader.result;
              }
              reader.readAsDataURL(files[0]);
            }

        } else {
          // IF FILE FORMAT IS NOT SUPPORTED, DISPLAY 'UNSUPPORTED MESSAGE';
           this.setState({ img: '' , allowedImageType: false, loadingUpload: false });
                // display unsupported format modal
           let wrong_format_bgdrop = document.querySelector('.wrong_format_bgdrop'),
               invalid_format_name = document.querySelector('.invalid_format_name');
                // get file name
             invalid_format_name.innerHTML = this.state.imgOriginName;
                // display wrong format modal
             wrong_format_bgdrop.style.display = 'block';        
        } 
          // handle file size
        if(files[0] && files[0].size <= 10000000) {
          this.setState({ allowedImageSize: true})
        } else {
         let maxSizeModalTxt     = document.querySelector('.invalid_imgsize_big'),
             wrong_format_bgdrop = document.querySelector('.wrong_format_bgdrop');
            // display img size modal text alert
               maxSizeModalTxt.style.display = 'block';
            // display wrong format modal
               wrong_format_bgdrop.style.display = 'block';
           this.setState({ img: '', allowedImageSize: false, loadingUpload: false })
        }
        // if selected file has a supported format, display the upload container
          if(
           this.state.img.length !== 0 && 
           this.state.allowedImageSize && 
           this.state.allowedImageType) {
           this.setState({ loadingUpload: true })
        } 
}

 
onDragEnter() {
    let dropZone_div             = document.querySelector('.dropZone_div'),
        wrap_uploadContainer_div = document.querySelector('.wrap_uploadContainer_div'),
        drop_img_here_img        = document.querySelector('.drop_img_here_img');

        // if there is no image selected, display 'Drop here' message
      if(!this.state.img) {
          // hide browse button 
         wrap_uploadContainer_div.setAttribute('style', 'display:none;z-index:1');
         // display 'drop here' image and text
         drop_img_here_img.style.display = 'block';
         // display dashed border on the dropzone area
         dropZone_div.setAttribute('style', 'border:solid #83C6E8;border-style:dashed;z-index:2');
       }
}


onDragLeave() {
   let dropZone_div             = document.querySelector('.dropZone_div'),
       wrap_upload_process      = document.querySelector('.wrap_upload_process'),
       wrap_uploadContainer_div = document.querySelector('.wrap_uploadContainer_div'),
       drop_img_here_img        = document.querySelector('.drop_img_here_img');

      // if there is no image dropped, display the 'Browse image' button
       if(!this.state.img) {
         wrap_uploadContainer_div.style.display = 'block';
         drop_img_here_img.style.display        = 'none';
         dropZone_div.style.border              = 'none';
         wrap_upload_process.style.display      = 'block';
         dropZone_div.removeAttribute('style');
        }
}

browseImageHandler() {
  this.setState({ cancelUpload: false, img: '', imgURL: '' , imgOriginName: ''})
}

render() {
    return (
        <div>
            {/* ------- Dropzone container ----------- */}

           <div className='row justify-content-center'>
                 <Dropzone onDrop={(e) => this.onDrop(e)}>
                      {({ getRootProps, getInputProps }) => (
                        <div
                        {...getRootProps()}
                        className='dropZone_div'
                        onDragEnter={() => this.onDragEnter()}
                        onDragLeave={() => this.onDragLeave()}>
                        </div>
                        )}
                </Dropzone>
           </div>

           <div className='row justify-content-center'>
             <div className='wrap_uploadContainer_div'
                  onDragEnter={() => this.onDragEnter()}>
                            
               {/* ------- Upload container ----------- */}
                            
                {!this.state.loadingUpload ? (
                  <div>
                        <div className='sel_dragAndDrop_div'>
                          <div className='row justify-content-center'>
                            <div className='sel_dragAndDrop_txt' 
                                 onDragStart={(e) => { e.preventDefault() }}>
                                 <p>Select image</p>
                                 <p>OR</p>
                                 <p>Drag & drop</p>
                            </div>
                          </div>
                        </div>

                        <div className='wrap_upload_process'>
                            <div className='row justify-content-center'>
                              <form onChange={(e) => this.handleFormChange(e)}> 
                                <input className='input_file' 
                                       id='input_file' 
                                       type='file' 
                                       accept="image/*"></input>
                                <label htmlFor='input_file' 
                                       onDragStart={(e) => { e.preventDefault() }} 
                                       onClick={() => this.browseImageHandler()} 
                                       className='browse_button'>Browse image</label>
                                </form>
                            </div>

                            <div className='row justify-content-center'>
                                <span className='max_size_txt' 
                                      onDragStart={(e) => { e.preventDefault() }}>
                                      Max size: 10MB
                                </span>
                            </div>
                        </div>
                  </div>
               ) : ('')}
             
              
              
              {/* ------------ Preview div -------- */}

              {this.state.loadingUpload ? (
                <div className='row justify-content-center'>
                  <div className='wrap_preview_cont'>

                        <div className='row justify-content-center'>
                          <span className='uploading_txt_percent'>Uploading image (
                              <span className='up_txt_per_din'>
                                </span> complete)</span>
                        </div>

                          <div className='row justify-content-center'>
                                <span className='cancel_upload_button' 
                                      title='Remove' 
                                      alt='Remove' 
                                      onClick={() => this.cancelUpload()}>&times;</span>

                                <span className='upload_percent'></span>

                                <div className='wrap_preview_image'>
                                    <div className='row justify-content-center'>
                                      <span className='loading_percent_slider'></span>
                                      <img className='preview_upload_img' alt=''></img>
                                    </div>
                                </div>
                          </div>

                          <div className='row justify-content-center'>
                              <div className='upload_button' 
                                   onClick={(e) => this.formHandler(e)}>
                                   Upload
                              </div>
                          </div>
                </div>
              </div>
            ):('')}

          
            </div>
          </div>
            
            {/* ------- Dropzone 'Drop image here' message container ----------- */}

            <div className='row justify-content-center'>
                <div className='drop_img_here_img' 
                     onDragEnter={() => this.onDragEnter()}>
                   <div className='row justify-content-center'>
                      <h3 className='drop_img_here_txt'>
                        Drop image here
                      </h3>
                    </div>
                 </div>
            </div>

        </div>

    )
  }
}

const UploadContainer = connect(null, mapDispatchToProps)(connectedUploadContainer);
export default UploadContainer;
