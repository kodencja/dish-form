// const chooseDataToValidate = (types) => {
const chooseDataToValidate = (state) => {

    const {
        name,
        preparation_time,
        type,
        no_of_slices,
        diameter,
        spiciness_scale,
        slices_of_bread,
      } = state;

    return new Promise((resolve, reject) => {
      let dataToSend = {};
      let baseData = { name, preparation_time, type };
      if(type.val === undefined || type.val === null){
          reject("Please select a type");
      } else {
        switch (type.val) {
            case "pizza":
              dataToSend = { ...baseData, no_of_slices, diameter };
              resolve(dataToSend);
              break;
            case "soup":
              dataToSend = { ...baseData, spiciness_scale };
              resolve(dataToSend);
              break;
            case "sandwich":
              dataToSend = { ...baseData, slices_of_bread };
              resolve(dataToSend);
              break;
            default:
              dataToSend = { ...baseData };
              resolve(dataToSend);
              break;
          }
      }

    });
  };


export const onSubmit = (e, dispatch, onValidation, dataToSendCurr, state) =>{
  e.preventDefault();

  return new Promise( async(resolve, reject)=>{

    let dataToSend = {};
    
        dispatch({
          type: "one_value",
          nameObj: "validationFinished",
          payload: "not",
        });
        const dataToValidate = await chooseDataToValidate(state);
    
        // console.log("Data to be validated:");
        // console.log(dataToValidate);
    
        const sizeOfObjectToValid = Object.keys(dataToValidate).length;
    
        dispatch({
          type: "one_value",
          nameObj: "sizeOfSubmittedObject",
          payload: sizeOfObjectToValid,
        });
    
        const { arrayOfAllChecksVal, time } = await onValidation(
          dataToValidate,
          sizeOfObjectToValid
        );
    
        // console.log(dataToValidate);

        // create an object to be sent
        for (let eachProp in dataToValidate) {
          if (eachProp === "preparation_time") {
            dataToSend = {
              ...dataToSend,
              preparation_time: time,
            };
          } else {
            dataToSend = {
              ...dataToSend,
              [eachProp]: dataToValidate[eachProp]["val"],
            };
          }
        }
    
        // if there are no errors in input fields
        if (arrayOfAllChecksVal.every((el) => el === true)) {
          dispatch({
            type: "one_value",
            nameObj: "validationFinished",
            payload: "ok",
          });
        } else {
          dispatch({
            type: "one_value",
            nameObj: "validationFinished",
            payload: "error",
          });
        }

        resolve(dataToSend);
  })
   
}