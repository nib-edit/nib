import React from "react";
import PropTypes from "prop-types";
import Styled from "rsg-components/Styled";
import GithubImg from "./github.png";
import "./styles.css";

const styles = ({ color, fontFamily, fontSize }) => ({
  nav: {
    margin: 0
  },
  pre: {
    whiteSpace: "pre-wrap"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "85%",
    alignItems: "center",
    color: "white !important",
    fontFamily: fontFamily.base,
    "& a": {
      color: "white !important",
      "&:hover": {
        color: "#90a4ae !important",
        cursor: "pointer"
      }
    }
  },
  github: {
    fontSize: fontSize.base,
    paddingLeft: 8,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      color: color.linkHover,
      paddingLeft: 8,
    }
  },
  githubImg: {
    marginRight: 10,
    height: 20
  },
  bottom: {
    fontSize: fontSize.small
  },
  bottomLink: {
    textDecoration: "underline",
    "&:hover": {
      color: color.linkHover,
      cursor: "pointer",
      textDecoration: "underline"
    }
  }
});

export function TableOfContentsRenderer({ classes, children }) {
  return (
    <div className={classes.wrapper}>
      <div style={{ margin: "10px" }}>
        <nav>{children}</nav>
        <nav className={classes.github}>
          <a
            href="https://github.com/nib-edit/Nib"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 10
            }}
          >
            <img className={classes.githubImg} src={GithubImg} />
            <span>Github</span>
          </a>
        </nav>
      </div>
    </div>
  );
}

TableOfContentsRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired
};

export default Styled(styles)(TableOfContentsRenderer);
