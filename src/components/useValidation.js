import { useRef } from "react";
import validator from "validator";

const useValidation = (dispatch) => {
  const arrayOfAllChecksValue = useRef([]);
  const checkTimeLength = useRef();

  // check time format
  // 3 groups of 2 character separated by : each character must be a digit contained in that specific ranges
  const isValidTime = (time) => {
    checkTimeLength.current = "";
    if (time.length < 8) {
      time = time + ":00";
    }

    if (time < "00:15:00") {
      checkTimeLength.current = "We need at least 15 min to prepare the dish!";
    }
    const regexpAll = new RegExp(
      /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
    );
    return regexpAll.test(time);
  };

  // main validation function
  const onValidation = (dataToCheck, size) => {
    arrayOfAllChecksValue.current = [];
    return new Promise((resolve, reject) => {
      let count = 0;
      for (let eachProp in dataToCheck) {
        count++;

        // get rid of whitespaces
        const valueWithoutSpaces = dataToCheck[eachProp]["val"]
          .toString()
          .split(" ")
          .join("");

          // if there is no data or it is NaN though should be a number
        if (valueWithoutSpaces.length <= 0 || valueWithoutSpaces === "NaN") {
          arrayOfAllChecksValue.current.push(false);
          dispatch({
            type: `${eachProp}_check`,
            payload: "This field has to be filled in",
          });
          resolve(arrayOfAllChecksValue.current);
        } else if (valueWithoutSpaces.length > 30) {
          arrayOfAllChecksValue.current.push(false);
          dispatch({
            type: `${eachProp}_check`,
            payload: "Use max 30 characters",
          });
          resolve(arrayOfAllChecksValue.current);
        } else {
          // run validation accordingly to the input 'type' ('sort' in state)
          switch (dataToCheck[eachProp]["sort"]) {
            case "text":
              if (!validator.isAlpha(valueWithoutSpaces)) {
                arrayOfAllChecksValue.current.push(false);
                dispatch({
                  type: `${eachProp}_check`,
                  payload: "Please use only letters",
                });
              } else {
                arrayOfAllChecksValue.current.push(true);
                dispatch({ type: `${eachProp}_check`, payload: "ok" });
              }
              break;

            case "intNumber":
            case "floatNumber":
              // if value of the number fits within 'min' and 'max' attributes check
              if (!validator.isNumeric(valueWithoutSpaces)) {
                arrayOfAllChecksValue.current.push(false);
                dispatch({
                  type: `${eachProp}_check`,
                  payload: "Please use only numbers",
                });
              } else {
                // if the value is NUMERIC, CHECK IF THE VALUE IS NOT TOO BIG OR NOT TOO SMALL accordingly its 'min' and 'max' attributes set in the input attributes and in the state
                let valueWithoutSpacesToNumber;

                if (eachProp === "intNumber") {
                  valueWithoutSpacesToNumber = parseInt(valueWithoutSpaces);
                } else {
                  valueWithoutSpacesToNumber = parseFloat(valueWithoutSpaces);
                }
                let min, max;
                if (
                  dataToCheck[eachProp]["min"] !== null &&
                  dataToCheck[eachProp]["min"] !== undefined
                ) {
                  min = dataToCheck[eachProp]["min"];
                }
                if (
                  dataToCheck[eachProp]["max"] !== null &&
                  dataToCheck[eachProp]["max"] !== undefined
                ) {
                  max = dataToCheck[eachProp]["max"];
                }
                // console.log(min, " ", max);

                if (valueWithoutSpacesToNumber < min) {
                  arrayOfAllChecksValue.current.push(false);
                  dispatch({
                    type: `${eachProp}_check`,
                    payload: "The number is too small",
                  });
                } else if (valueWithoutSpacesToNumber > max) {
                  arrayOfAllChecksValue.current.push(false);
                  dispatch({
                    type: `${eachProp}_check`,
                    payload: "The number is too big",
                  });
                } else {
                  arrayOfAllChecksValue.current.push(true);
                  dispatch({ type: `${eachProp}_check`, payload: "ok" });
                }
              }

              break;

            case "time":
              if (!isValidTime(valueWithoutSpaces)) {
                arrayOfAllChecksValue.current.push(false);
                dispatch({
                  type: `${eachProp}_check`,
                  payload: "Please use only numbers in time format",
                });
              } else if (
                isValidTime(valueWithoutSpaces) &&
                checkTimeLength.current !== ""
              ) {
                arrayOfAllChecksValue.current.push(false);
                dispatch({
                  type: `${eachProp}_check`,
                  payload: checkTimeLength.current,
                });
              } else {
                arrayOfAllChecksValue.current.push(true);
                dispatch({ type: `${eachProp}_check`, payload: "ok" });
              }
              break;

            default:
              break;
          }
        }

        if (count >= size) {
          resolve(arrayOfAllChecksValue.current);
        }
      }
    });
  };

  return { onValidation };
};

export default useValidation;
