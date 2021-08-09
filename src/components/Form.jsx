import React, { useContext } from "react";
import { DishContext } from "../App";
import Input from "./Input";
import Feedback from "./Feedback";

const Form = React.forwardRef(({ onType, onSubmit }, ref) => {
  const dishContext = useContext(DishContext);
  const { addToFeedbackRef } = dishContext.onAddToFeedbackRef;
  const state = dishContext.onState;
  const {
    name,
    preparation_time,
    type,
    no_of_slices,
    diameter,
    spiciness_scale,
    slices_of_bread,
  } = state;

  const forPizza = (
    <div>
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
        onRequired={onType === "pizza" ? true : false}
        onDataSizing={null}
        onMin={1}
        onMax={30}
      />
      <Feedback
        msgResponse={no_of_slices.check}
        onAddToFeedbackRef={addToFeedbackRef}
      />
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
        onRequired={onType === "pizza" ? true : false}
        onDataSizing={null}
        onMin={0.1}
        onMax={50}
      />
      <Feedback
        msgResponse={diameter.check}
        onAddToFeedbackRef={addToFeedbackRef}
      />
    </div>
  );

  const forSoup = (
    <div>
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
        onRequired={onType === "soup" ? true : false}
        onDataSizing="px"
        onMin={1}
        onMax={10}
      />

      <Feedback
        msgResponse={spiciness_scale.check}
        onAddToFeedbackRef={addToFeedbackRef}
      />
    </div>
  );

  const forSandwich = (
    <div>
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
        onRequired={onType === "sandwich" ? true : false}
        onDataSizing={null}
        onMin={1}
        onMax={null}
      />
      <Feedback
        msgResponse={slices_of_bread.check}
        onAddToFeedbackRef={addToFeedbackRef}
      />
    </div>
  );

  return (
    <form id="dishes-form">
      <div className="row center">
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
        {onType === "pizza"
          ? forPizza
          : onType === "soup"
          ? forSoup
          : onType === "sandwich"
          ? forSandwich
          : ""}
      </div>
      <div className="row center">
        <div className="buttons col">
          <button
            type="submit"
            className="btn btn-check"
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

export default React.memo(Form);
