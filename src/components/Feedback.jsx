import React from "react";

function Feedback({ msgResponse, onAddToFeedbackRef }) {
  return (
    <div className="invalid-feedback" ref={onAddToFeedbackRef}>
      {msgResponse === "ok" ? "" : msgResponse}
    </div>
  );
}

export default React.memo(Feedback);
