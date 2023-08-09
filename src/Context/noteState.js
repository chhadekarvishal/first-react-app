import noteContext from "./noteContext";

const NoteState = (props) => {
  const state = {
    name: "Lucifer",
    place: "Lux, L. A.",
  };

  return (
    <noteContext.Provider value={state}>{props.children}</noteContext.Provider>
  );
};

export default NoteState;
