import React, { useContext, useMemo } from "react";
import { DishContext } from "../App";

function Input(props) {
  const dishContext = useContext(DishContext);
  const state = dishContext.onState;
  const addToInputRef = dishContext.onAddToInputRef;
  const handleChanging = dishContext.onChanging;
  const {
    name,
    preparation_time,
    type,
    no_of_slices,
    diameter,
    spiciness_scale,
    slices_of_bread,
    outputStyle,
    loading,
  } = state;

  const {
    onTagType,
    onTitle,
    onName,
    onType,
    onID,
    onClass,
    onPlaceHold,
    onStep,
    onAria,
    onRequired,
    onDataSizing,
    onMin,
    onMax,
    onPattern,
    onOptionNames,
  } = props;

  const options = useMemo(() => {
    if (onTagType === "select") {
      return [...onOptionNames].map((name, ind) => {
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
      return false;
    }
  }, [type]);

  const select = useMemo(() => {
    return (
      <div className="form-group input-cont">
        <div className="input-block">
          <label htmlFor={onName}>{onTitle}</label>
          <select
            className={onClass}
            name={onName}
            aria-label={onAria}
            id={onID}
            required={onRequired}
            ref={addToInputRef}
            value={state[onName]["val"]}
            onChange={handleChanging}
          >
            {options}
          </select>
        </div>
      </div>
    );
  }, [type, loading]);

  const input = useMemo(() => {
    return (
      <div className="form-group input-cont">
        <div className="input-block">
          <label htmlFor={onName}>{onTitle}</label>
          <input
            type={onType}
            placeholder={onPlaceHold}
            className={onClass}
            name={onName}
            aria-label={onAria}
            id={onID}
            step={onStep}
            required={onRequired}
            data-sizing={onDataSizing}
            min={onMin}
            max={onMax}
            pattern={onPattern}
            ref={addToInputRef}
            value={state[onName]["val"]}
            onChange={handleChanging}
          />
        </div>
      </div>
    );
  }, [preparation_time, type, no_of_slices, diameter, name, slices_of_bread]);

  const range = useMemo(() => {
    return (
      <div className="form-group input-cont">
        <div className="input-block">
          <label htmlFor={onName}>{onTitle}</label>
          <input
            type={onType}
            placeholder={onPlaceHold}
            className={onClass}
            name={onName}
            aria-label={onAria}
            id={onID}
            step={onStep}
            required={onRequired}
            data-sizing={onDataSizing}
            min={onMin}
            max={onMax}
            pattern={onPattern}
            ref={addToInputRef}
            value={state[onName]["val"]}
            onChange={handleChanging}
          />
          <output
            className="bubble"
            style={outputStyle}
            htmlFor="spiciness_scale"
          >
            {state[onName]["val"]}
          </output>
        </div>
      </div>
    );
  }, [type, spiciness_scale, outputStyle]);

  return (
    <>
      {onTagType === "input" ? input : onTagType === "select" ? select : range}
    </>
  );
}

export default React.memo(Input);
