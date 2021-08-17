import React, { useContext, useEffect, useMemo, useRef } from "react";
import { DishContext } from "../App";
import Input from "./Input";

const Form = React.forwardRef(({ onTypeVal, onSubmit }, ref) => {
  const dishContext = useContext(DishContext);
  const state = dishContext.onState;
  const handleChanging = dishContext.onChanging;
  const addToInputRef = dishContext.onAddToInputRef;

  const forPizzaRef = useRef();
  const forSoupRef = useRef();
  const forSandwichRef = useRef();
  const nameRef = useRef();
  const timeRef = useRef();
  const selectRef = useRef();

  const {
    name,
    preparation_time,
    type,
    no_of_slices,
    diameter,
    spiciness_scale,
    slices_of_bread,
  } = state;

  useEffect(() => {
    // console.log(no_of_slices);
    // console.log(spiciness_scale);
    // console.log(spiciness_scale["val"]);
    // console.log(slices_of_bread);
    // console.log(slices_of_bread["val"]);
  });

  // handle input appearing animation
  useEffect(() => {
    if (forPizzaRef.current !== undefined && forPizzaRef.current !== null) {
      forPizzaRef.current.classList.add("show-up");
      forPizzaRef.current.classList.remove("hide-up");
    }
    if (
      forSandwichRef.current !== undefined &&
      forSandwichRef.current !== null
    ) {
      forSandwichRef.current.classList.add("show-right");
      forSandwichRef.current.classList.remove("hide-right");
    }
    if (forSoupRef.current !== undefined && forSoupRef.current !== null) {
      forSoupRef.current.classList.add("show-left");
      forSoupRef.current.classList.remove("hide-left");
    }
    if (nameRef.current !== undefined && nameRef.current !== null) {
      setTimeout(() => {
        nameRef.current.classList.add("show-left");
        nameRef.current.classList.remove("hide-left");
      }, 750);
    }
    if (timeRef.current !== undefined && timeRef.current !== null) {
      setTimeout(() => {
        timeRef.current.classList.add("show-right");
        timeRef.current.classList.remove("hide-right");
      }, 1250);
    }
    if (selectRef.current !== undefined && selectRef.current !== null) {
      setTimeout(() => {
        selectRef.current.classList.add("show-up");
        selectRef.current.classList.remove("hide-up");
      }, 1750);
    }
    if (ref.current !== undefined && ref.current !== null) {
      setTimeout(() => {
        ref.current.classList.add("show-down");
        ref.current.classList.remove("hide-down");
      }, 2250);
    }
  }, [type]);

  const forPizza = useMemo(() => {
    return (
      <div className="mrg-x-auto">
        <div className="input-cont">
          <div className="flex hide-up" ref={forPizzaRef}>
            <div className="one-column">
              <Input
                tagType="input"
                title="No of slices"
                name="no_of_slices"
                type="number"
                id="no_of_slices"
                className="form-control"
                step={1}
                aria-label="no_of_slices"
                required={onTypeVal === "pizza" ? true : false}
                min={1}
                max={30}
                value={no_of_slices["val"]}
                onChange={handleChanging}
                ref={addToInputRef}
                errorMsg={no_of_slices.check}
              />
            </div>

            <div className="one-column">
              <Input
                tagType="input"
                title="diameter"
                name="diameter"
                type="number"
                id="diameter"
                className="form-control"
                step={0.1}
                aria-label="diameter"
                required={onTypeVal === "pizza" ? true : false}
                min={0.1}
                max={50}
                value={diameter["val"]}
                onChange={handleChanging}
                ref={addToInputRef}
                errorMsg={diameter.check}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }, [type, diameter, no_of_slices]);

  const forSoup = useMemo(() => {
    return (
      <div className="mrg-x-auto narrow">
        <div className="input-cont">
          <div className="range hide-left" ref={forSoupRef}>
            {/* <div className="range input-cont hide-up" ref={forSoupRef}> */}
            {/* <div className="mrg-x-auto hide-up" ref={forSoupRef}> */}
            <Input
              tagType="range"
              title="Spiciness scale"
              name="spiciness_scale"
              type="range"
              id="spiciness_scale"
              className="form-control form-control-range"
              step={1}
              aria-label="spiciness_scale"
              required={onTypeVal === "soup" ? true : false}
              data-sizing="px"
              min={1}
              max={10}
              value={spiciness_scale["val"]}
              onChange={handleChanging}
              ref={addToInputRef}
              errorMsg={spiciness_scale.check}
            />
          </div>
        </div>
      </div>
    );
  }, [type, spiciness_scale]);

  const forSandwich = useMemo(() => {
    return (
      <div className="mrg-x-auto narrow">
        <div className="input-cont">
          <div className="number-width hide-right" ref={forSandwichRef}>
            <Input
              tagType="input"
              title="No of slices"
              name="slices_of_bread"
              type="number"
              id="slices_of_bread"
              className="form-control"
              step={1}
              aria-label="slices_of_bread"
              required={onTypeVal === "sandwich" ? true : false}
              min={1}
              value={slices_of_bread.val}
              // value={state[slices_of_bread]["val"]}
              onChange={handleChanging}
              ref={addToInputRef}
              errorMsg={slices_of_bread.check}
            />
          </div>
        </div>
      </div>
    );
  }, [type, slices_of_bread]);

  return (
    <form id="dishes-form">
      <div className="row center">
        <div className="input-cont">
          <div className="hide-left narrow-70 mrg-x-auto" ref={nameRef}>
            <Input
              tagType="input"
              title="Dish name"
              name="name"
              type="text"
              id="name"
              className="form-control"
              placeholder="Type dish name"
              aria-label="name"
              required={true}
              value={name["val"]}
              onChange={handleChanging}
              ref={addToInputRef}
              errorMsg={name.check}
            />
          </div>
        </div>

        <div className="input-cont">
          <div className="hide-right narrow-70 mrg-x-auto" ref={timeRef}>
            <Input
              tagType="input"
              title="Preparation time"
              name="preparation_time"
              type="time"
              id="preparation_time"
              className="form-control"
              step={1}
              aria-label="preparation_time"
              required={true}
              min={"00:15:00"}
              pattern={"[0-9]{2}:[0-9]{2}:[0-9]{2}"}
              value={preparation_time["val"]}
              onChange={handleChanging}
              ref={addToInputRef}
              errorMsg={preparation_time.check}
            />
          </div>
        </div>

        <div className="input-cont">
          <div className="hide-up narrow-70 mrg-x-auto" ref={selectRef}>
            <Input
              tagType="select"
              title="Type"
              name="type"
              id="type"
              className="form-control form-control-lg"
              optionNames={["default", "pizza", "soup", "sandwich"]}
              aria-label="type"
              required={true}
              value={type["val"]}
              onChange={handleChanging}
              ref={addToInputRef}
              errorMsg={type.check}
            />
          </div>
        </div>

        {onTypeVal === "pizza"
          ? forPizza
          : onTypeVal === "soup"
          ? forSoup
          : onTypeVal === "sandwich"
          ? forSandwich
          : ""}
      </div>
      <div className="row center">
        <div className="buttons col">
          <button
            type="submit"
            className="btn btn-check hide-down"
            ref={ref}
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
  // };
});

// export default Form;
export default React.memo(Form);
