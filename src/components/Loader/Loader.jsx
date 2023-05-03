import loaderIcon from "../../assets/loader.svg";

import "./Loader.css";

function Loader() {
  return (
    <div className="loaderIcon">
      <img src={loaderIcon} alt="icono de carga" />
    </div>
  );
}

export default Loader;
