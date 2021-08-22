import React, { useEffect, useReducer, useRef, useCallback } from "react";
import Form from "./components/Form";
import "./App.css";
import "./css/style.css";
import useValidation from "./components/useValidation";
import { appearInput } from "./functions/appearing";
import { setOutputStyle } from "./functions/setOutputStyle";
import { onChanging } from "./functions/onChanging";
import { onSubmit } from "./functions/onSubmit";
import { handleAPI } from "./functions/handleAPI";

export const DishContext = React.createContext();

// 'val' = value, 'sort' = type of input, 'check' = prop for message got back after validation
// 'min' and 'max' are attributes of inputs - I put them here so prevent user from manipulating these values in the browser
const inputInitState = {
  name: { val: "", sort: "text", check: "" },
  preparation_time: { val: "00:15:00", sort: "time", check: "" },
  type: { val: "", sort: "text", check: "" },
  no_of_slices: { val: 1, sort: "intNumber", check: "", min: 1, max: 30 },
  diameter: { val: 0.1, sort: "floatNumber", check: "", min: 0.1, max: 50 },
  spiciness_scale: { val: 1, sort: "intNumber", check: "", min: 1, max: 10 },
  slices_of_bread: { val: 1, sort: "intNumber", check: "", min: 1 },
};

const initialState = {
  ...inputInitState,
  outputStyle: { left: "0" },
  sizeOfSubmittedObject: 0,
  validationFinished: "not",
  finalResponse: "Hungry?",
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
        ...inputInitState,
        outputStyle: { left: "0" },
        loading: false,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // custom hook for validation of data form
  const { onValidation } = useValidation(dispatch);

  // main title ref
  const titleRef = useRef();

  // array of inputs' refs
  const inputRef = useRef([]);

  const dataToSend = useRef({});

  // refs to particular divs
  const answerRef = useRef();
  const dishesRef = useRef();

  // ref to submit btn
  const btnRef = useRef();

  // reply (with finalResponse) ref
  const replyRef = useRef();

  const {
    type,
    validationFinished,
    finalResponse,
    loading,
  } = state;

  useEffect(() => {
    // console.log(type.val);
    // hello();
  }, []);

  // handle input appearing animation
  useEffect(() => {
    appearInput(inputRef.current, btnRef.current);
  }, [type]);

  // handle main title appearing and "Hungry?" question
  useEffect(() => {

    if( titleRef.current !== undefined && titleRef.current !== null){
      setTimeout(() => {
        titleRef.current.classList.add("drop-fast");
        titleRef.current.classList.remove("hide-upper");
      }, 1500);

    }

    if( replyRef.current !== undefined && replyRef.current !== null){
        replyRef.current.classList.add("hello");
    }

  }, []);

  useEffect(() => {
    // call a function to set a left distance of bubble with the default value - dedicated to "range" type input
    if (inputRef.current !== undefined && inputRef.current !== null) {
      inputRef.current.forEach((el) => {
        const elType = el.getAttribute("type");
        if (elType === "range") {
          const elVal = el.getAttribute("value");
          // set dynamically the bubble's 'left' attribute
          setOutputStyle(elVal, el, "%", dispatch);
        }
      });
    }
  }, [type]);

  // final step with API Post Request
  useEffect(() => {
    const options = {
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      headers: { "Content-type": "application/json" },
      data: dataToSend.current,
    };

    handleAPI(validationFinished, options, dispatch, dataToSend.current, replyRef.current, btnRef.current);
    if (validationFinished === "ok"){
      dataToSend.current = {};
    }

  }, [validationFinished]);

  const handleChanging = (e) => {
    onChanging(e, validationFinished, inputRef, dispatch);
  };

  const handleSubmit = async (e) => {
    dataToSend.current =  await onSubmit(e, dispatch, onValidation, dataToSend.current, state);
    // console.log(dataToSend.current);
  };

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
      className="photo hanging"
      src={type.val !== "" ? require(`./img/${type.val}.jpg`).default : ""}
    />
  );

  const reply = (
    <p className="reply" ref={replyRef}>{loading ? "Wait..." : finalResponse}</p>
    // <p className="reply hidden" ref={replyRef}>{finalResponse}</p>
  )

  return (
    <div className="App">
      <div className="container">
        <h2 className="title hide-upper" ref={titleRef}>
          Let's have a delicious meal!
        </h2>
        <div className="dishes flex" ref={dishesRef}>
          <DishContext.Provider
            value={{
              onState: state,
              onDispatch: dispatch,
              onChanging: handleChanging,
              onAddToInputRef: addToInputRef,
              onInputRef: inputRef.current,
            }}
          >
            <Form onTypeVal={type.val} onSubmit={handleSubmit} ref={btnRef} />
          </DishContext.Provider>
          <div className="image">
            <div className="answer mrg-x-auto" ref={answerRef}>
              {/* {!loading ? validationFinished === "not" && type.val !== "" ? image : finalResponse : "Wait..."} */}
              {!loading && validationFinished === "not" && type.val !== "" ? image : reply }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// {!loading
//   ? validationFinished === "not" && type.val !== ""
//     ? image
//     : finalResponse
//   : "Wait..."}