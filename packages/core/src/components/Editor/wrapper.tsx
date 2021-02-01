import * as React from "react";
import { FunctionComponent, useRef, useEffect, useState } from "react";

import styled from "@emotion/styled";
import PopupHandler from "../PopupHandler";
import ToolbarHandler from "../ToolbarHandler";
import TopToolbar from "../Toolbar/Top";
import { useConfigContext } from "../../context/config";

import InnerEditor from "./editor";
import { StyledWrapper } from "./styles";
import { Addon } from "../../types/addon";
import PortalHandler from "../PortalHandler/index";

const axios = require("axios").default;

interface WrapperProps {
  addons?: Addon[];
  licenseKey?: string;
}

const Wrapper: FunctionComponent<WrapperProps> = (props) => {
  const [licenseCheckFail, setLicenseCheckFail] = useState(false);
  const editorWrapper = useRef<HTMLDivElement | null>(null);
  const {
    config: { toolbar },
  } = useConfigContext();

  const topToolbarPresent = toolbar.options.indexOf("top") >= 0;
  const { addons } = props;

  useEffect(() => {
    const { licenseKey } = props;
    const licensedAddons = addons?.filter((a) => a.name !== "video");
    if (licensedAddons && licensedAddons.length) {
      axios
        .get("https://licencecheck.herokuapp.com/licenceCheck", {
          params: {
            licenseKey,
            plugins: licensedAddons.map((a) => a.name),
          },
        })
        .then(({ data }: { data: { status: string } }) => {
          if (data.status === "FAIL") setLicenseCheckFail(true);
        });
    }
  }, [props.licenseKey]);

  return (
    <StyledWrapper ref={editorWrapper}>
      {licenseCheckFail && (
        <LicenseAlert>Please get license to use advance plugins !</LicenseAlert>
      )}
      {topToolbarPresent && (
        <TopToolbar editorWrapper={editorWrapper} addons={addons} />
      )}
      <InnerEditor {...props} />
      {/* todo: better name for handler */}
      <PopupHandler editorWrapper={editorWrapper} addons={addons} />
      <PortalHandler addons={addons} />
      {/* currently ToolbarHandler is used for addon toolbars only but its use can be extended */}
      {addons && (
        <ToolbarHandler editorWrapper={editorWrapper} plugins={addons} />
      )}
    </StyledWrapper>
  );
};

const LicenseAlert = styled.div`
  width: 100% !important;
  background-color: rgba(213, 0, 0, 0.8) !important;
  height: 30px !important;
  position: absolute !important;
  top: 37px !important;
  color: white !important;
  text-align: center;
  font-size: 18px !important;
  line-height: 1.5;
  z-index: 10;
`;

export default Wrapper;
