import React from "react";
import PropTypes from "prop-types";
import Styled from "rsg-components/Styled";
import pen from "./pen.svg";

const styles = ({ fontFamily, color }) => ({
  logo: {
    margin: 0,
    fontFamily: fontFamily.base,
    fontSize: 18,
    fontWeight: "normal",
    color: color.baseBackground
  },
  image: {
    width: "2.5em",
    marginRight: 25
  },
  link: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
  }
});
export function LogoRenderer({ classes }) {
  return (
    <h1 className={classes.logo}>
      <a className={classes.link} href="">
        <img className={classes.image} src={pen} />
        <span style={{ fontSize: 24, marginLeft: 8 }}>Nib</span>
      </a>
    </h1>
  );
}

LogoRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};

export default Styled(styles)(LogoRenderer);
