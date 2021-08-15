import React, { useContext, useEffect, useMemo, useRef } from "react";
import { DishContext } from "../App";
import Input from "./Input";
import Feedback from "./Feedback";

const Form = React.forwardRef(({ onTypeVal, onSubmit }, ref) => {
  const dishContext = useContext(DishContext);
  const { addToFeedbackRef } = dishContext.onAddToFeedbackRef;
  const state = dishContext.onState;

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
                onTagType="input"
                onTitle="No of slices"
                onName="no_of_slices"
                onType="number"
                onID="no_of_slices"
                onClass="form-control"
                onPlaceHold={null}
                onStep={1}
                onAria="no_of_slices"
                onRequired={onTypeVal === "pizza" ? true : false}
                onDataSizing={null}
                onMin={1}
                onMax={30}
              />
              <Feedback
                msgResponse={no_of_slices.check}
                onAddToFeedbackRef={addToFeedbackRef}
              />
            </div>

            <div className="one-column">
              <Input
                onTagType="input"
                onTitle="diameter"
                onName="diameter"
                onType="number"
                onID="diameter"
                onClass="form-control"
                onPlaceHold={null}
                onStep={0.1}
                onAria="diameter"
                onRequired={onTypeVal === "pizza" ? true : false}
                onDataSizing={null}
                onMin={0.1}
                onMax={50}
              />
              <Feedback
                msgResponse={diameter.check}
                onAddToFeedbackRef={addToFeedbackRef}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }, [type]);

  const forSoup = useMemo(() => {
    return (
      <div className="mrg-x-auto narrow">
        <div className="input-cont">
          <div className="range hide-left" ref={forSoupRef}>
            {/* <div className="range input-cont hide-up" ref={forSoupRef}> */}
            {/* <div className="mrg-x-auto hide-up" ref={forSoupRef}> */}
            <Input
              onTagType="range"
              onTitle="Spiciness scale"
              onName="spiciness_scale"
              onType="range"
              onID="spiciness_scale"
              onClass="form-control form-control-range"
              onPlaceHold={null}
              onStep={1}
              onAria="spiciness_scale"
              onRequired={onTypeVal === "soup" ? true : false}
              onDataSizing="px"
              onMin={1}
              onMax={10}
            />

            <Feedback
              msgResponse={spiciness_scale.check}
              onAddToFeedbackRef={addToFeedbackRef}
            />
          </div>
        </div>
      </div>
    );
  }, [type]);

  const forSandwich = useMemo(() => {
    return (
      <div className="mrg-x-auto narrow">
        <div className="input-cont">
          <div className="number-width hide-right" ref={forSandwichRef}>
            <Input
              onTagType="input"
              onTitle="No of slices"
              onName="slices_of_bread"
              onType="number"
              onID="slices_of_bread"
              onClass="form-control"
              onPlaceHold={null}
              onStep={1}
              onAria="slices_of_bread"
              onRequired={onTypeVal === "sandwich" ? true : false}
              onDataSizing={null}
              onMin={1}
              onMax={null}
            />
            <Feedback
              msgResponse={slices_of_bread.check}
              onAddToFeedbackRef={addToFeedbackRef}
            />
          </div>
        </div>
      </div>
    );
  }, [type]);

  return (
    <form id="dishes-form">
      <div className="row center">
        <div className="input-cont">
          <div className="hide-left narrow-70 mrg-x-auto" ref={nameRef}>
            <Input
              onTagType="input"
              onTitle="Dish name"
              onName="name"
              onType="text"
              onID="name"
              onClass="form-control"
              onPlaceHold="Type dish name"
              onStep={null}
              onAria="name"
              onRequired={true}
              onDataSizing={null}
              onMin={null}
              onMax={null}
              onPattern={null}
            />
            <Feedback
              msgResponse={name.check}
              onAddToFeedbackRef={addToFeedbackRef}
            />
          </div>
        </div>

        <div className="input-cont">
          <div className="hide-right narrow-70 mrg-x-auto" ref={timeRef}>
            <Input
              onTagType="input"
              onTitle="Preparation time"
              onName="preparation_time"
              onType="time"
              onID="preparation_time"
              onClass="form-control"
              onPlaceHold={null}
              onStep={1}
              onAria="preparation_time"
              onRequired={true}
              onDataSizing={null}
              onMin={"00:15:00"}
              onMax={null}
              onPattern={"[0-9]{2}:[0-9]{2}:[0-9]{2}"}
            />
            <Feedback
              msgResponse={preparation_time.check}
              onAddToFeedbackRef={addToFeedbackRef}
            />
          </div>
        </div>

        <div className="input-cont">
          <div className="hide-up narrow-70 mrg-x-auto" ref={selectRef}>
            <Input
              onTagType="select"
              onTitle="Type"
              onName="type"
              onID="type"
              onClass="form-control form-control-lg"
              onOptionNames={["default", "pizza", "soup", "sandwich"]}
              onPlaceHold={null}
              onAria="type"
              onRequired={true}
            />
            <Feedback
              msgResponse={type.check}
              onAddToFeedbackRef={addToFeedbackRef}
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
});

// export default Form;
export default React.memo(Form);
