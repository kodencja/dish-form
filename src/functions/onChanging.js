import { setOutputStyle } from "./setOutputStyle";

export const onChanging = (e, validationFinished, inputRef, dispatch)=> {
     // clean the finalResponse text while ordering a new product
     if (validationFinished !== "not") {
        dispatch({
          type: "one_value",
          nameObj: "finalResponse",
          payload: "Hungry?",
        });
        dispatch({
          type: "one_value",
          nameObj: "validationFinished",
          payload: "not",
        });
      }
  
      if (e.target.type === "range") {
        setOutputStyle(e.target.value, e.target, "%", dispatch);
      }
  
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
      } else if (nameTrg === "type") {
        inputRef.current = [];
        dispatch({
          type: "input",
          nameObj: e.target.name,
          payload: e.target.value,
        });
      } else {
        dispatch({
          type: "input",
          nameObj: e.target.name,
          payload: e.target.value,
        });
      }
}