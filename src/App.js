import React, { useEffect, useReducer, useRef, useCallback } from "react";
import Form from "./components/Form";
import "./App.css";
import "./css/style.css";
import useValidation from "./components/useValidation";
import axios from "axios";

export const DishContext = React.createContext();

// 'val' = value, 'sort' = type of input, 'check' = prop for message got back after validation
// 'min' and 'max' are attributes of inputs - I put them here so prevent user from manipulating these values in the browser
const initialState = {
  name: { val: "", sort: "text", check: "" },
  preparation_time: { val: "00:15:00", sort: "time", check: "" },
  type: { val: "", sort: "text", check: "" },
  no_of_slices: { val: 1, sort: "intNumber", check: "", min: 1, max: 30 },
  diameter: { val: 0.1, sort: "floatNumber", check: "", min: 0.1, max: 50 },
  spiciness_scale: { val: 1, sort: "intNumber", check: "", min: 1, max: 10 },
  slices_of_bread: { val: 1, sort: "intNumber", check: "", min: 1 },
  outputStyle: { left: "0%" },
  photoName: "",
  sizeOfSubmittedObject: 0,
  validationFinished: "not",
  finalResponse: "",
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: { ...state.name, val: action.payload } };

    case "name_check":
      return {
        ...state,
        name: { ...state.name, check: action.payload },
      };

    case "preparation_time":
      return {
        ...state,
        preparation_time: { ...state.preparation_time, val: action.payload },
      };

    case "preparation_time_check":
      return {
        ...state,
        preparation_time: { ...state.preparation_time, check: action.payload },
      };

    case "type":
      return { ...state, type: { ...state.type, val: action.payload } };

    case "type_check":
      return { ...state, type: { ...state.type, check: action.payload } };

    case "no_of_slices":
      return {
        ...state,
        no_of_slices: { ...state.no_of_slices, val: parseInt(action.payload) },
      };

    case "no_of_slices_check":
      return {
        ...state,
        no_of_slices: { ...state.no_of_slices, check: action.payload },
      };

    case "diameter":
      return { ...state, diameter: { ...state.diameter, val: parseFloat(action.payload) } };

    case "diameter_check":
      return {
        ...state,
        diameter: { ...state.diameter, check: action.payload },
      };

    case "spiciness_scale":
      return {
        ...state,
        spiciness_scale: { ...state.spiciness_scale, val: parseInt(action.payload) },
      };

    case "spiciness_scale_check":
      return {
        ...state,
        spiciness_scale: { ...state.spiciness_scale, check: action.payload },
      };

    case "slices_of_bread":
      return {
        ...state,
        slices_of_bread: { ...state.slices_of_bread, val: parseInt(action.payload) },
      };

    case "slices_of_bread_check":
      return {
        ...state,
        slices_of_bread: { ...state.slices_of_bread, check: action.payload },
      };

    case "validationFinished":
      return { ...state, validationFinished: action.payload };

    case "validationSuccess":
      return { ...state, validationSuccess: action.payload };

    case "sizeOfSubmittedObject":
      return { ...state, sizeOfSubmittedObject: action.payload };

    case "photo":
      return { ...state, photoName: action.payload };

    case "outputStyle":
      return {
        ...state,
        outputStyle: { ...state.outputStyle, left: action.payload },
      };

    case "finalResponse":
      return { ...state, finalResponse: action.payload };

    case "loading":
      return { ...state, loading: action.payload };

    case "reset":
      return {
        ...state,
        name: { ...state.name, val: "" },
        preparation_time: { ...state.preparation_time, val: "00:15:00" },
        type: { ...state.type, val: "" },
        no_of_slices: { ...state.no_of_slices, val: 1 },
        diameter: { ...state.diameter, val: 0.1 },
        slices_of_bread: { ...state.slices_of_bread, val: 1 },
        spiciness_scale: { ...state.spiciness_scale, val: 1 },
        photoName: "",
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // custom hook for validation of data form
  const { onValidation } = useValidation(dispatch);

  // array of inputs' refs
  const inputRef = useRef([]);

  // an array of feedbackRef/ 'invalid-feedback' div's refs
  const feedbackRef = useRef([]);

  const dataToSend = useRef({});

  // refs to particular divs
  const answerRef = useRef();
  const dishesRef = useRef();
  // const photoRef = useRef();

  // ref to submit btn
  const btnRef = useRef();

  const {
    name,
    preparation_time,
    type,
    no_of_slices,
    diameter,
    spiciness_scale,
    slices_of_bread,
    photoName,
    validationFinished,
    finalResponse,
    outputStyle,
    loading,
  } = state;


  // final step with API Post Request
  useEffect(() => {

    if (validationFinished === "ok") {

      dataToSend.current = JSON.stringify(dataToSend.current);

      console.log("Data to be send:")
      console.log(dataToSend.current);

      // photoRef.current.classList.add("hidden", "no-display");

      inputRef.current.forEach((el) => {
        el.classList.remove("inCorrect");
        el.classList.add("correct");
      });
      feedbackRef.current.forEach((el) => {
        el.classList.add("afterValidation");
      });

      const options = {
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/posts",
        headers: { "Content-type": "application/json" },
        data: dataToSend.current,
      };

      answerRef.current.classList.remove("bad");
      answerRef.current.classList.add("wait");

      dispatch({ type: "photo", payload: "" });
      dispatch({ type: "loading", payload: true });

      // prevent user from sending the form again twice by clicking twice on the submit button
      btnRef.current.disabled = true;
      axios(options)
        .then((response) => {
          console.log(response.data);
          dataToSend.current = "";
          
          dispatch({ type: "loading", payload: false });
          answerRef.current.classList.remove("wait");
          answerRef.current.classList.add("fine");
          dispatch({ type: "reset", payload: "" });
          dispatch({
            type: "finalResponse",
            payload: "Your order has been sent succefully!",
          });
          // dispatch({ type: "validationFinished", payload: "not" });
  
          btnRef.current.disabled = false;
        })
        .catch((error) => {
          console.log(error.message);
          dataToSend.current = "";
          dispatch({ type: "loading", payload: false });
          answerRef.current.classList.remove("wait");
          answerRef.current.classList.add("bad");
          dispatch({ type: "finalResponse", payload: error.message });
          btnRef.current.disabled = false;
        });

    } else if (validationFinished === "error") {
      answerRef.current.classList.remove("fine");
      answerRef.current.classList.add("bad");
      inputRef.current.forEach((el) => {
        const elName = el.getAttribute("name");
        if (state[elName]["check"] === "ok") {
          el.classList.remove("inCorrect");
          el.classList.add("correct");
        } else {
          el.classList.remove("correct");
          el.classList.add("inCorrect");
        }
      });

      dispatch({ type: "finalResponse", payload: "There is a mistake!" });
    }

  }, [validationFinished]);


  // set dynamically the bubble's 'left' attribute
  // const getOutputStyle = useCallback(
  //   (inputVal, el, unit) => {
  //     const styles = getComputedStyle(el.target);
  //     const padding =
  //       parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
  //     const elWidth = parseFloat(el.target.clientWidth - padding);

  //     if (el !== undefined && el !== null) {
  //       let refObjMin = parseInt(el.target.getAttribute("min") - 1);
  //       let refObjMax = parseInt(el.target.getAttribute("max"));
  //       if (refObjMin < 0) refObjMin = refObjMin * -1;
  //       const leftOutput =
  //         (parseInt(inputVal) + refObjMin) / (refObjMin + refObjMax) + unit;
  //       dispatch({
  //         type: "outputStyle",
  //         payload: elWidth * parseFloat(leftOutput) - 7,
  //       });
  //       return false;
  //     }
  //   },
  //   [spiciness_scale, outputStyle]
  // );

  const getOutputStyle = useCallback(
    (inputVal, el, unit) => {
      const styles = getComputedStyle(el.target);
      const padding =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
        const thumb_width = 12;
        const form_ctrl_padd = 12;
        const form_ctrl_bord = 1;
        // parseFloat(styles.paddingLeft);
      // const elWidth = parseFloat(el.target.clientWidth - padding);
      // const elWidth = parseFloat(el.target.clientWidth);
      // const elWidthInner = 241+ (form_ctrl_padd*2)+(form_ctrl_bord*2);
      // const elWidthInner = 241+ (form_ctrl_padd)+(form_ctrl_bord);
      // const elWidth = elWidthInner - thumb_width;
      // const elWidth = 241 -thumb_width -6; // działa gdy form_ctrl_padd = 0
      const elWidth = 241;
      // const elWidth = 267- thumb_width;

      // console.log(padding);
      // console.log(elWidth);


      const bubbleWidthToTrackWidth = (6/elWidth);

      if (el !== undefined && el !== null) {
        let refObjMin = parseInt(el.target.getAttribute("min"));
        let refObjMax = parseInt(el.target.getAttribute("max"));
        if (refObjMin < 0) refObjMin = refObjMin * -1;

        // console.log(refObjMin);
        // console.log(refObjMax);
        const ratio = ((parseInt(inputVal) - refObjMin) / (refObjMax - refObjMin) );
       
        const leftOutput =
          // (((elWidth*parseInt(inputVal)/ refObjMax)/ elWidth) *100);
          // (((elWidth*parseInt(inputVal)/ refObjMax)/ (elWidth-6)) *100);
          // ((elWidth*(parseInt(inputVal) -refObjMin)/ (refObjMax-refObjMin)));

          // (( (elWidth-thumb_width)*(parseInt(inputVal) -refObjMin)/ (refObjMax-refObjMin)));
          // ( ((elWidth*(parseInt(inputVal) +refObjMin) )/ (refObjMax-refObjMin) ) +6 );
          // ( (( (elWidth-6)*(parseInt(inputVal) +refObjMin) )/ (refObjMax-refObjMin) +(6/(parseInt(inputVal)+1))) );
          // ( (( (elWidth)*(parseInt(inputVal) +refObjMin) )/ (refObjMax-refObjMin) ) -thumb_width +6 );
          
          
          ( ( ( (elWidth - thumb_width * ratio) * (parseInt(inputVal) -refObjMin) )/ (refObjMax-refObjMin) ) - thumb_width/2 );
          // ( (( (elWidth - (thumb_width+ thumb_width* ratio) )*(parseInt(inputVal) -refObjMin) )/ (refObjMax-refObjMin) ) );
          // ( (( (elWidth)*(parseInt(inputVal) +refObjMin) )/ (refObjMax-refObjMin) ) -thumb_width  );
          // (100 * (parseInt(inputVal) - refObjMin)) / (refObjMax - refObjMin)
          // ((parseInt(inputVal) - refObjMin) / (refObjMax - refObjMin) ) * elWidth;
          // ((parseInt(inputVal) - refObjMin) / (refObjMax - refObjMin) ) *90.5;
          // (refObjMin/100 +((parseInt(inputVal) - refObjMin) / (refObjMax - refObjMin) )) * (100 -refObjMax );

          // ratio = (value - el.min) / (el.max - el.min)
          // thumbSize / 2 + ratio * 100% - ration * thumbSize
          // calc(${thumbSize / 10}px + ${ratio * 100} - ${ratio} * ${thumbSize}px)
          
          // ((thumb_width/2) + ratio * 100  - ratio * thumb_width);
          // (((thumb_width/2) + ratio * 100  - ratio * thumb_width) * (elWidth-thumb_width)) / 100;

          // ( (((thumb_width/2) + ratio * 100  - ratio * thumb_width) * (elWidth)) / 100) - thumb_width;
          // (( (elWidth - thumb_width)*((thumb_width/2) + ratio * 100  - ratio * thumb_width)) / 100) ;
          // ( ((parseInt(inputVal) - refObjMin) / (refObjMax - refObjMin) ) ) * (100 -refObjMax );
          //  (refObjMax - refObjMin) * (parseInt(inputVal) - refObjMin);
          // ((parseInt(inputVal) - refObjMin) * 100) / (refObjMin - refObjMax)
        // const leftOutput =
        //   (parseInt(inputVal) + refObjMin) / (refObjMin + refObjMax) + unit;

        // console.log(parseFloat(leftOutput) - (10 - bubbleWidthToTrackWidth));
        // console.log(parseFloat(leftOutput) - 10);
        // console.log(ratio);
        // console.log(parseFloat(leftOutput));
        // console.log(((parseFloat(leftOutput)- 10)/elWidth)*100 );
        dispatch({
          type: "outputStyle",
          // payload: elWidth * parseFloat(leftOutput) - 7,
          // payload: parseFloat(leftOutput)- (10 - bubbleWidthToTrackWidth) +unit,
          // payload: (parseFloat(leftOutput)- 10)*elWidth +"px",
          // payload: parseFloat(leftOutput) +"%",
          payload: parseFloat(leftOutput) +"px",
          // payload: parseFloat(leftOutput) +unit,
        });
        return false;
      }
    },
    [spiciness_scale, outputStyle]
  );

  const handleChanging = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });

    // clean the finalResponse text while ordering a new product
    if (validationFinished !== "not") {
      dispatch({ type: "finalResponse", payload: "" });
    }

    dispatch({ type: "validationFinished", payload: "not" });

    if (e.target.type === "range") {
      // getOutputStyle(e.target.value, e, "px");
      getOutputStyle(e.target.value, e, "%");
    }

    // show the photo when the 'type' has been chosen
    if (e.target.name === "type") {
      inputRef.current = [];
      // photoRef.current.classList.remove("hidden", "no-display");
      switch (e.target.value) {
        case "pizza":
          dispatch({ type: "photo", payload: "pizza" });
          break;
        case "soup":
          dispatch({ type: "photo", payload: "soup" });
          break;
        case "sandwich":
          dispatch({ type: "photo", payload: "sandwich" });
          break;
        default:
          dispatch({ type: "photo", payload: "" });
          break;
      }
    }
  };

  const chooseDataToValidate = (types) => {
    return new Promise((resolve, reject) => {
      let dataToSend = {};
      let baseData = { name, preparation_time, type };
      switch (types) {
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
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputRef.current);
    dispatch({ type: "validationFinished", payload: "not" });
    const dataToValidate = await chooseDataToValidate(type.val);
    const sizeOfObjectToValid = Object.keys(dataToValidate).length;
    dispatch({
      type: "sizeOfSubmittedObject",
      payload: sizeOfObjectToValid,
    });
    const replayCheck = await onValidation(dataToValidate, sizeOfObjectToValid);

    // create an object to be sent
    for (let eachProp in dataToValidate) {
      dataToSend.current = {
        ...dataToSend.current,
        [eachProp]: dataToValidate[eachProp]["val"],
      };
    }

    // if there are no errors in input fields
    if (replayCheck.every((el) => el === true)) {
      dispatch({ type: "validationFinished", payload: "ok" });
    } else {
      dispatch({ type: "validationFinished", payload: "error" });
    }
  };

  // invalid-feedback refs' array
  const addToFeedbackRef = useCallback((el) => {
    if (el && !feedbackRef.current.includes(el)) {
      feedbackRef.current.push(el);
    }
  }, []);

  // input's array refs
  const addToInputRef = useCallback((el) => {
    if (el && !inputRef.current.includes(el)) {
      inputRef.current.push(el);
    }
  }, [type]);

  const image = (
    <img
    alt={photoName}
    className="photo"
    src={
      photoName !== ""
        ? require(`./img/${photoName}.jpg`).default
        : ""
    }
    style={{ height: "auto", width: "100%", objectFit: "contain" }}
  />
  )

  return (
    <div className="App">
      <div className="container">
        <h2 className="title">Hungry? Let's have a delicious meal!</h2>
        <div className="dishes flex" ref={dishesRef}>
          <DishContext.Provider
            value={{
              onState: state,
              onDispatch: dispatch,
              onChanging: handleChanging,
              onAddToInputRef: addToInputRef,
              onInputRef: inputRef,
              onAddToFeedbackRef: addToFeedbackRef,
            }}
          >
            <Form onType={type.val} onSubmit={handleSubmit} ref={btnRef} />
          </DishContext.Provider>
          {/* <div className="image hidden no-display" ref={photoRef}> */}
          <div className="image answer" ref={answerRef}>
          {loading ? "Wait..." : validationFinished !=="not" ? finalResponse : image}

          </div>
        </div>
        {/* <div className="answer" ref={answerRef}>
          {loading ? "Wait..." : finalResponse}
        </div> */}
      </div>
    </div>
  );
}

export default App;
