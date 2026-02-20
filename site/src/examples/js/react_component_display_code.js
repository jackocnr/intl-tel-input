import React, { useMemo, useState } from "react";
import IntlTelInput from "intl-tel-input/react";
import "intl-tel-input/styles";

const App = () => {
  const [number, setNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorCode, setErrorCode] = useState(0);
  const [noticeMode, setNoticeMode] = useState("off");

  const notice = useMemo(
    () => putYourNoticeLogicHere(noticeMode, isValid, number, errorCode),
    [noticeMode, isValid, number, errorCode],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setNoticeMode("submit");
  };

  return (
    <form onSubmit={handleSubmit}>
      <IntlTelInput
        onChangeNumber={setNumber}
        onChangeValidity={setIsValid}
        onChangeErrorCode={setErrorCode}
        initOptions={{
          initialCountry: "us",
          loadUtils: () => import("intl-tel-input/utils"),
        }}
        inputProps={{
          name: "phone",
          onBlur: () => setNoticeMode("blur"),
        }}
      />
      <button type="submit">Validate</button>
      {notice && <div className="notice">{notice}</div>}
    </form>
  );
};
export default App;