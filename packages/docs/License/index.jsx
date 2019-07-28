import React, { PureComponent } from "react";

class License extends PureComponent {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "-10px 0"
        }}
      >
        <h3>Commercial Use: </h3>
        <div>Commercial license on Nib includes:</div>
        <ol>
          <li>Unlimited use in web applications.</li>
          <li>All new releases and upgrades in the duration.</li>
          <li>Access to Nib's AWS S3 bucket to upload images.</li>
          <li>Customer support.</li>
          <li>Customisations in core library.</li>
        </ol>
        <div>
          Commercial license of Nib starts at $99 yearly, mail to
          contact@nibedit.com to get it.
          <br />
          Discount on Nib are considered for early stage startups.
        </div>
        <h3 style={{ marginTop: 25 }}>Non-Commercial Use: </h3>
        <div>
          For non-profiltable or personal use, nib license is freely available.
        </div>
        <ol>
          <li>Unlimited use in web applications.</li>
          <li>All new releases and upgrades.</li>
          <li>Customer support.</li>
        </ol>
        <div>Drop mail to contact@nibedit.com to get it.</div>
      </div>
    );
  }
}

export default License;
