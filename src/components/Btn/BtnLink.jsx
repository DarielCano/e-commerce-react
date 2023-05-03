import { Link } from "react-router-dom";

import "../../stylesheet/gral-styles/site-styles.css";

function BtnLink({ btnName, btnLink, mgt }) {
  return (
    <Link to={btnLink} className={mgt ? "btn mgt-1" : "btn "}>
      {btnName}
    </Link>
  );
}

export default BtnLink;
