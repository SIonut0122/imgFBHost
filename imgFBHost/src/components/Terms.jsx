import React from 'react';
import '../css/Terms.css';


class Terms extends React.Component {
  constructor(props) {
    super(props);
  }


closeTermsOfUse() {
  let termsModal = document.querySelector('.terms_modal').style.display = 'none';   
}


render() {
	return (
		<div>
	        <div className='row justify-content-center'>
	         	 <div className='terms_of_service col-11 col-md-7 col-lg-5'>
     	 			<span className='ml-auto' onClick={() => this.closeTermsOfUse()}>&#10006;</span>
					<span>Terms of use</span>
					<span>1. Use of this service means acceptance of all the rules written here, as well as the voluntary consent of the user to assume the obligation to comply with them.</span>
					<span>2. The publication of images is made by the user on his own initiative, the service is not responsible for the correctness and reliability of the information reported by the user;</span>
					<span>3. Service is not responsible for the observance of copyright on posted images, but warns users about the need to take into account and comply with its norms.</span>
					<span>4. Users who repeatedly violated these Rules will be blocked access to the service.</span>
					<span>5. It is prohibited to place materials that violate the legislation of the USA and EU countries.</span>
				 </div>
	      	</div>
		</div>
 
		)
	}
}

export default Terms;