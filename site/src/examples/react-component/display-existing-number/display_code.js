import React from "react";
import IntlTelInput from "@intl-tel-input/react";
import "intl-tel-input/styles";

const App = () => (
  <>
    <label htmlFor="phone">Phone number</label>
    <IntlTelInput
      loadUtils={() => import("intl-tel-input/utils")}
      inputProps={{
        id: "phone",
        defaultValue: "+447733312345",
      }}
    />
  </>
);
export default App;
