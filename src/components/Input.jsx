import React, { useContext, useMemo } from "react";
import { DishContext } from "../App";

// function Input({ tagType, title, errorMsg, optionNames = "", ...props }) {
const Input = React.forwardRef(
  ({ tagType, title, errorMsg, optionNames = "", ...props }, ref) => {
    const dishContext = useContext(DishContext);
    const state = dishContext.onState;

    const {
      preparation_time,
      type,
      no_of_slices,
      diameter,
      spiciness_scale,
      slices_of_bread,
      outputStyle,
      loading,
      validationFinished,
    } = state;

    const { name } = props;

    const options = useMemo(() => {
      if (tagType === "select") {
        return [...optionNames].map((name, ind) => {
          if (name === "default") {
            return (
              <option defaultValue hidden label=" " key={ind}>
                select an option
              </option>
            );
          } else {
            return (
              <option value={name} key={ind}>
                {name}
              </option>
            );
          }
        });
      } else {
        return null;
      }
    }, [type]);

    const select = useMemo(() => {
      return (
        <div className="input-block">
          <label htmlFor={name}>{title}</label>
          <select {...props} ref={ref}>
            {options}
          </select>
          {errorMsg && <span className="invalid-feedback">{errorMsg}</span>}
        </div>
      );
    }, [type, loading, validationFinished]);

    const input = useMemo(() => {
      return (
        <div className="input-block">
          <label htmlFor={name}>{title}</label>
          <input {...props} ref={ref} />
          {errorMsg && <span className="invalid-feedback">{errorMsg}</span>}
        </div>
      );
    }, [
      preparation_time,
      type.val,
      no_of_slices,
      diameter,
      state.name,
      slices_of_bread,
      name,
    ]);

    const range = useMemo(() => {
      return (
        <div className="input-block">
          <label htmlFor={name}>{title}</label>
          <input {...props} ref={ref} />
          <output className="bubble" style={outputStyle} htmlFor={name}>
            {state[name]["val"]}
          </output>
          {errorMsg && <span className="invalid-feedback">{errorMsg}</span>}
        </div>
      );
    }, [type, spiciness_scale, outputStyle]);

    return (
      <>{tagType === "input" ? input : tagType === "select" ? select : range}</>
    );
  }
);

// export default Input;
export default React.memo(Input);
