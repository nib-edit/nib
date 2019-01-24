import React from "react";
import styled from "@emotion/styled";
import { Modal, ToolbarSeparator } from "nib-ui";

import { AppStateWrapper } from "../../../common/app-state";
import { buildMenu } from "../../../common/editor-helpers";

export default ({ config, editorWrapper }) => {
  const options = buildMenu(config.options);
  const optionSize = options.length;
  const selMarker = document.getElementsByClassName("nib-selected");
  return (
    <AppStateWrapper
      render={app_params => (
        <div>
          {selMarker[0] ? (
            <Modal marker={selMarker[0]} editorWrapper={editorWrapper}>
              <Wrapper onMouseDown={e => e.preventDefault()}>
                {options.map((Option, index) => (
                  <React.Fragment key={`inline-toolbar-option-${Option.name}`}>
                    <Option.menuComponent
                      config={config[Option.name]}
                      key={`inline-menu-option-${Option.name}`}
                      app_params={app_params}
                    />
                    {index < optionSize - 1 && <ToolbarSeparator />}
                  </React.Fragment>
                ))}
              </Wrapper>
            </Modal>
          ) : null}
        </div>
      )}
    />
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  position: relative;

  background-color: ${({ theme }) => theme.toolbar.inline.backgroundColor};
  color: ${({ theme }) => theme.toolbar.inline.color};

  border-bottom: ${({ theme }) => theme.toolbar.inline.borderBottom};
  border-left: ${({ theme }) => theme.toolbar.inline.borderLeft};
  border-right: ${({ theme }) => theme.toolbar.inline.borderRight};
  border-top: ${({ theme }) => theme.toolbar.inline.borderTop};

  border-bottom-left-radius: ${({ theme }) =>
    theme.toolbar.inline.borderBottomLeftRadius};
  border-bottom-right-radius: ${({ theme }) =>
    theme.toolbar.inline.borderBottomLeftRadius};
  border-top-left-radius: ${({ theme }) =>
    theme.toolbar.inline.borderTopLeftRadius};
  border-top-right-radius: ${({ theme }) =>
    theme.toolbar.inline.borderTopLeftRadius};

  padding: ${({ theme }) => theme.toolbar.inline.padding};

  font-size: ${({ theme }) => theme.toolbar.inline.fontSize};
  font-style: ${({ theme }) => theme.toolbar.inline.fontStyle};
  font-family: ${({ theme }) => theme.toolbar.inline.fontFamily};
`;
