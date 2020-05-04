import React from "react";
import LoadingSvg from "../../Public/Images/loading.svg";

export const IsLoading = (props) => {
  if (!props.isLoading) {
    return <></>;
  }
  return (
    <div className="loading">
      <img src={LoadingSvg} alt="Loading" />
    </div>
  );
};
