import React 			 from "react";
import { connect } 		 from "react-redux";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import '../css/getImgLink.css';

const mapStateToProps = state => {
  return { imgURL: state.imgURL };
   
};

class ConnectedImgLink extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			link: this.props.imgURL
		}
	}



copyTextMsg() {
	let linkCopiedTxt = document.querySelector('.link_copied');

	// display 'link copied' message after clicking on the input link
	linkCopiedTxt.style.display = 'block';

	setTimeout(function() {
		linkCopiedTxt.style.opacity = '1';
	},200);
	setTimeout(function() {
		linkCopiedTxt.style.opacity = '0';
	},900);
	setTimeout(function() {
		linkCopiedTxt.style.display = 'none';
	},1400);

}

handleFocus(e) { e.target.select();}

openImg() { window.open(this.state.link, '_blank');}



render() {

	let ViewerLink 		  = this.state.link;
	let HTMLThumblinked   = '<a href="'+this.state.link+'"><img src="'+this.state.link+'" alt="View Image" border="0"></a>';
	let HTMLFullLinked    = '<a href="'+this.state.link+'/"><img src="'+this.state.link+'" alt="View image" border="0"></a>';
	let BBCodeLinked 	  = '[url='+this.state.link+'/]'+'[img]'+this.state.link+'[/img][/url]';
	let BBCodeThumbLinked = '[url='+this.state.link+'/]'+'[img]'+this.state.link+'[/img][/url]';

	return (
			<div>
				<div className='getimglink_container col-12'>
					<div className='row justify-content-center'>
						<div className='getimg_half col-12 col-sm-12 col-md-12 col-lg-12 col-xl-5'>
								<div className='row justify-content-center'>
									<div className='wrap_up_and_img_complete'>
										<span className='span_uploaded_txt'>Upload complete</span>
										<span className='span_up_img'></span>
									</div>
								</div>
							<div className='row justify-content-center'>
								<div className='getimglink_view_image_div'>
										<img src={this.state.link} alt='' onClick={() => this.openImg()}/>
								</div>
							</div>
						</div>

						<div className='getimg_half col-12 col-sm-12 col-md-12 col-lg-12 col-xl-7'>
							<div className='row justify-content-center'>
								<span className='embed_codes_txt'>Choose one of the codes below to publish your image on a forum, blog or website.</span>
							</div>
								<div className='row justify-content-center'>
									<div className='copy_link_div col-11 col-md-10 '>
								
									<div className='row justify-content-center'>
										<span className='title_copy_link mr-auto'>Viewer link</span>
										  <CopyToClipboard text={ViewerLink}
										 	 onCopy={() => this.copyTextMsg()}>
												<input className='getlink_input col-12' readOnly type='text' onClick={(e) => this.handleFocus(e)} value={ViewerLink}></input>
										  </CopyToClipboard>
									</div>


									<div className='row justify-content-center'>
										<span className='title_copy_link mr-auto'>HTML full linked</span>
											<CopyToClipboard text={HTMLFullLinked}
												onCopy={() => this.copyTextMsg()}>
										 		<input className='getlink_input col-12' readOnly type='text' onClick={(e) => this.handleFocus(e)} value={HTMLFullLinked}></input>
											</CopyToClipboard>
									</div>



									<div className='row justify-content-center'>
										<span className='title_copy_link mr-auto'>HTML thumbnail linked</span>
											<CopyToClipboard text={HTMLThumblinked}
												onCopy={() => this.copyTextMsg()}>
													<input className='getlink_input col-12' readOnly type='text' onClick={(e) => this.handleFocus(e)} value={HTMLThumblinked}></input>
											</CopyToClipboard>
									</div>



									<div className='row justify-content-center'>
										<span className='title_copy_link mr-auto'>BBCode full linked</span>
											<CopyToClipboard text={BBCodeLinked}
												onCopy={() => this.copyTextMsg()}>
										 		<input className='getlink_input col-12' readOnly type='text' onClick={(e) => this.handleFocus(e)} value={BBCodeLinked}></input>
											</CopyToClipboard>
									</div>
									


									<div className='row justify-content-center'>
										<span className='title_copy_link mr-auto'>BBCode thumbnail linked</span>
											<CopyToClipboard text={BBCodeThumbLinked}
												onCopy={() => this.copyTextMsg()}>
										 		<input className='getlink_input col-12' readOnly type='text' onClick={(e) => this.handleFocus(e)} value={BBCodeThumbLinked}></input>
											</CopyToClipboard>
									</div>


									<div className='row'>
										<span className='link_copied'>> Link copied!</span>
									</div>


								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


		)
	}
}

 


const GetImgLink = connect(mapStateToProps)(ConnectedImgLink);
export default GetImgLink;