import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Node } from "prosemirror-model";

import NibConverter from "nib-converter";
import { Modal, PrimaryButton, Space, SpaceSize } from "nib-ui";

const SourceEditModal = ({ hideModal, pmstate }) => {
  const [htmlContent, setHtmlContent] = useState("");

  const updateEditor = () => {
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    const { schema, tr } = state;
    const editorContent = NibConverter.convertFromHTML(schema, htmlContent);
    console.log("schema = ", editorContent.doc);
    const doc = Node.fromJSON(schema, editorContent.doc);
    dispatch(tr.delete(0, state.doc.nodeSize - 2).insert(0, doc.content));
    pmview.focus();
    hideModal();
  };

  useEffect(() => {
    const { pmview } = pmstate;
    const { state } = pmview;
    const { schema, doc } = state;

    setHtmlContent(NibConverter.convertToHTML(schema, doc.toJSON()));
  }, [pmstate]);

  console.log(htmlContent);
  return (
    <Modal
      hideModal={hideModal}
      title="Source Code"
      render={() => (
        <Wrapper>
          <InnerWrapper>
            <Textarea
              value={htmlContent}
              onChange={(evt) => setHtmlContent(evt.target.value)}
            />
            <ButtonSection>
              <PrimaryButton onClick={updateEditor}>Update</PrimaryButton>
              <Space size={SpaceSize.xl} />
              <PrimaryButton onClick={hideModal}>Cancel</PrimaryButton>
            </ButtonSection>
          </InnerWrapper>
        </Wrapper>
      )}
    />
  );
};

SourceEditModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired,
};

const Wrapper = styled.div({ padding: "0px 24px 10px" });

const InnerWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ButtonSection = styled.div({
  display: "flex",
  marginTop: 20,
});

const Textarea = styled.textarea(
  {
    height: 360,
    resize: "none",
    width: "100%",
  },
  ({ theme: { constants } }) => ({
    border: constants.border.primary,
    ":focus": {
      border: `1px solid ${constants.color.highlight.primary}`,
      outline: "none",
    },
  })
);

export default SourceEditModal;
