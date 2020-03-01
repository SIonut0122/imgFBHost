    import { ADD_IMAGE } from "./constants/action-types";
 

    const initialState = {
          imgURL: '',
          loadingUpload: false,
          imgOriginName: '',
          unsupportedFormat: false,
    };


    function rootReducer(state = initialState, action) {
      if (action.type === ADD_IMAGE) {
        return Object.assign({}, state, {
          loadingUpload:     action.payload.loadingUpload,
          imgURL:            action.payload.imgURL,
          imgOriginName:     action.payload.imgOriginName,
          unsupportedFormat: action.payload.unsupportedFormat
        });

        console.log(initialState);
      }

      return state;
    }



    export default rootReducer;