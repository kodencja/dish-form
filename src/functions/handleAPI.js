import axios from "axios";

export const handleAPI = (validationFinished, options, dispatch, dataToSendCurr, replyRefCurr, btnRefCurr) => {
    if (validationFinished === "ok") {
        dataToSendCurr = JSON.stringify(dataToSendCurr);
  
        console.log("Data to be send:");
        console.log(dataToSendCurr);
  
        replyRefCurr.classList.remove("bad");
        replyRefCurr.classList.add("wait");
  
        dispatch({ type: "one_value", nameObj: "loading", payload: true });
  
        // prevent user from sending the form again twice by clicking twice on the submit button
        btnRefCurr.disabled = true;
  
        axios(options)
          .then((response) => {
            console.log(response.data);
            // dataToSendCurr = "";
  
            replyRefCurr.classList.remove("wait");
            replyRefCurr.classList.add("fine");
            dispatch({ type: "reset", payload: "" });
  
            dispatch({
              type: "one_value",
              nameObj: "finalResponse",
              payload: "Your order has been sent successfully!",
            });
  
            btnRefCurr.disabled = false;
          })
          .catch((error) => {
            console.log(error.message);
            // dataToSendCurr = "";
  
            dispatch({ type: "one_value", nameObj: "loading", payload: false });
  
            replyRefCurr.classList.remove("wait");
            replyRefCurr.classList.add("bad");
  
            dispatch({
              type: "one_value",
              nameObj: "finalResponse",
              payload: error.message,
            });
            btnRefCurr.disabled = false;
          });
      } else if (validationFinished === "error") {
        replyRefCurr.classList.remove("fine");
        replyRefCurr.classList.add("bad");
  
        dispatch({
          type: "one_value",
          nameObj: "finalResponse",
          payload: "There is a mistake!",
        });
      }
}