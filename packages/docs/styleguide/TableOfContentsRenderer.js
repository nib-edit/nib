import React from "react";
import PropTypes from "prop-types";
import Styled from "rsg-components/Styled";
import GithubImg from "./github.png";
import "./styles.css";

const styles = ({space, color, fontFamily, fontSize, borderRadius}) => ({
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
        color: "#89a6b7 !important",
        cursor: "pointer"
      }
    }
  },
  search: {
    padding: space[2]
  },
  input: {
    display: "block",
    width: "100%",
    padding: space[1],
    color: color.base,
    backgroundColor: color.baseBackground,
    fontFamily: fontFamily.base,
    fontSize: fontSize.base,
    border: [[1, color.border, "solid"]],
    borderRadius,
    transition: "border-color ease-in-out .15s",
    "&:focus": {
      isolate: false,
      borderColor: color.link,
      outline: 0
    },
    "&::placeholder": {
      isolate: false,
      fontFamily: fontFamily.base,
      fontSize: fontSize.base,
      color: color.light
    }
  },
  github: {
    fontSize: fontSize.base,
    paddingLeft: 16,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      fontSize: fontSize.base,
      paddingLeft: 16,
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      color: color.linkHover
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

export function TableOfContentsRenderer({
  classes,
  children,
  searchTerm,
  onSearchTermChange
}) {
  return (
    <div className={classes.wrapper}>
      <div>
        <div className={classes.search}>
          <input
            value={searchTerm}
            className={classes.input}
            placeholder="Filter by name"
            aria-label="Filter by name"
            onChange={event => onSearchTermChange(event.target.value)}
          />
        </div>
        <nav>{children}</nav>
        <nav className={classes.github}>
          <a
            href="https://github.com/jpuri/Nib"
            target="blank"
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
      <div className={classes.bottom}>
        Made with <span style={{color: "red"}}>♥️</span> by{" "}
        <a
          style={{textDecoration: "underline"}}
          target="blank"
          href="https://twitter.com/jyopur"
        >
          Jyoti.
        </a>
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
