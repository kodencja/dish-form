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
  outputStyle: { left: "0" },
  sizeOfSubmittedObject: 0,
  validationFinished: "not",
  finalResponse: "",
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    // for setting inputs' values in the state
    case "input":
      return {
        ...state,
        [action.nameObj]: { ...state[action.nameObj], val: action.payload },
      };

    // for setting "check" prop of input object in the state (replay) after validation of the input' value
    case "input_check":
      return {
        ...state,
        [action.nameObj]: { ...state[action.nameObj], check: action.payload },
      };

    // to set value of simple type of objects / vars: strings, number or boolean (sizeOfSubmittedObject, validationFinished, finalResponse, loading)
    case "one_value":
      return { ...state, [action.nameObj]: action.payload };

    // to set left value of the "bubble" output
    case "outputStyle":
      return {
        ...state,
        outputStyle: { ...state.outputStyle, left: action.payload },
        // outputStyle: { ...state.outputStyle, marginLeft: action.payload },
      };

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
    validationFinished,
    finalResponse,
    outputStyle,
    loading,
  } = state;

  // useEffect(() => {
  //   // console.log(finalResponse);
  // });

  useEffect(() => {
    // set a left distance of bubble with the default value - dedicated to "range" type input
    if (inputRef.current !== undefined && inputRef.current !== null) {
      inputRef.current.forEach((el) => {

        const elName = el.getAttribute("type");
        if (elName === "range") {
          const elVal = el.getAttribute("value");
          getOutputStyle(elVal, el, "%");
        }
      });
    }
  }, [type]);

  // final step with API Post Request
  useEffect(() => {
    if (validationFinished === "ok") {
      dataToSend.current = JSON.stringify(dataToSend.current);

      // console.log("Data to be send:");
      // console.log(dataToSend.current);

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

      dispatch({ type: "one_value", nameObj: "loading", payload: true });

      // prevent user from sending the form again twice by clicking twice on the submit button
      btnRef.current.disabled = true;

      // console.log(state.preparation_time);

      axios(options)
        .then((response) => {
          console.log(response.data);
          dataToSend.current = "";

          dispatch({ type: "one_value", nameObj: "loading", payload: false });
          answerRef.current.classList.remove("wait");
          answerRef.current.classList.add("fine");
          dispatch({ type: "reset", payload: "" });

          dispatch({
            type: "one_value",
            nameObj: "finalResponse",
            payload: "Your order has been sent successfully!",
          });

          btnRef.current.disabled = false;
        })
        .catch((error) => {
          console.log(error.message);
          dataToSend.current = "";

          dispatch({ type: "one_value", nameObj: "loading", payload: false });

          answerRef.current.classList.remove("wait");
          answerRef.current.classList.add("bad");

          dispatch({
            type: "one_value",
            nameObj: "finalResponse",
            payload: error.message,
          });
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

      dispatch({
        type: "one_value",
        nameObj: "finalResponse",
        payload: "There is a mistake!",
      });
    }
  }, [validationFinished]);

  // set dynamically the bubble's 'left' attribute
  const getOutputStyle = useCallback(
    (inputVal, elTrg, unit) => {
      const styles = getComputedStyle(elTrg);
      const padding =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

      const elWidth = elTrg.clientWidth;

      const bubbleWidth = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--bubble-width"
        )
      );

      const thumbWidth = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--thumb-width"
        )
      );
      const thumbBorderWidth = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--thumb-border-width"
        )
      );
      const thumbMargLeft = 1;

      if (elTrg !== undefined && elTrg !== null) {
        let refObjMin = parseInt(elTrg.getAttribute("min"));
        let refObjMax = parseInt(elTrg.getAttribute("max"));

        const ratio =
          ((parseInt(inputVal) - refObjMin) * 100) / (refObjMax - refObjMin);

        const leftDistance =
          ((padding / 2 +
            thumbMargLeft +
            (thumbWidth + thumbBorderWidth * 2) / 2 -
            bubbleWidth / 2) *
            100) /
          elWidth;

        const rightDistance =
          ((padding + (thumbWidth + thumbBorderWidth * 2)) * 100) / elWidth;

        const changeableDistance = (rightDistance * ratio) / 100;

        dispatch({
          type: "outputStyle",
          payload: ratio + leftDistance - changeableDistance + unit,
        });
        return false;
      }
    },
    [spiciness_scale, outputStyle]
  );

  const handleChanging = (e) => {
    const nameTrg = e.target.name;
    if (
      nameTrg === "no_of_slices" ||
      nameTrg === "spiciness_scale" ||
      nameTrg === "slices_of_bread"
    ) {
      dispatch({
        type: "input",
        nameObj: e.target.name,
        payload: parseInt(e.target.value),
      });
    } else if (nameTrg === "diameter") {
      dispatch({
        type: "input",
        nameObj: e.target.name,
        payload: parseFloat(e.target.value),
      });
    } else {
      dispatch({
        type: "input",
        nameObj: e.target.name,
        payload: e.target.value,
      });
    }

    // clean the finalResponse text while ordering a new product
    if (validationFinished !== "not") {
      dispatch({ type: "one_value", nameObj: "finalResponse", payload: "" });
    }

    dispatch({
      type: "one_value",
      nameObj: "validationFinished",
      payload: "not",
    });

    if (e.target.type === "range") {
      getOutputStyle(e.target.value, e.target, "%");
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
    dispatch({
      type: "one_value",
      nameObj: "validationFinished",
      payload: "not",
    });
    const dataToValidate = await chooseDataToValidate(type.val);

    // console.log("Data to be validated:");
    // console.log(dataToValidate);

    const sizeOfObjectToValid = Object.keys(dataToValidate).length;

    dispatch({
      type: "one_value",
      nameObj: "sizeOfSubmittedObject",
      payload: sizeOfObjectToValid,
    });
    // const replayCheck = await onValidation(dataToValidate, sizeOfObjectToValid);
    const { arrayOfAllChecksVal, time } = await onValidation(dataToValidate, sizeOfObjectToValid);

    // create an object to be sent
    for (let eachProp in dataToValidate) {
      if(eachProp === "preparation_time"){
        dataToSend.current = {
          ...dataToSend.current,
          "preparation_time": time,
        };
      } else {
        dataToSend.current = {
          ...dataToSend.current,
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
  };

  // invalid-feedback refs' array
  const addToFeedbackRef = useCallback((el) => {
    if (el && !feedbackRef.current.includes(el)) {
      feedbackRef.current.push(el);
    }
  }, []);

  // input's array refs
  const addToInputRef = useCallback(
    (el) => {
      if (el && !inputRef.current.includes(el)) {
        inputRef.current.push(el);
      }
    },
    [type]
  );

  const image = (
    <img
      alt={type.val}
      className="photo"
      src={type.val !== "" ? require(`./img/${type.val}.jpg`).default : ""}
      // style={{ height: "auto", width: "100%" }}
      // style={{ height: "auto", width: "100%", objectFit: "contain" }}
    />
  );

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
          <div className="image answer" ref={answerRef}>
            {loading
              ? "Wait..."
              : validationFinished !== "not"
              ? finalResponse
              : image}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
