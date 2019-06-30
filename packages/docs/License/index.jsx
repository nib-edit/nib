import React, {PureComponent} from "./node_modules/react";

class License extends PureComponent {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "32px 0"
        }}
      >
        <h2 style={{marginTop: 25}}>Commercial Use: </h2>
        <div>
          License for commercial use of Nib 1.0 can be bought for $99 anually.
          This includes:
        </div>
        <ol>
          <li>Unlimited use in web applications.</li>
          <li>All new releases and upgrades in the duration.</li>
          <li>Customer support.</li>
        </ol>
        <div>
          <a href="mailto:contact@nibedit.com">Contact</a> to get it.
        </div>
        <h2 style={{marginTop: 75}}>Non-Commercial Use: </h2>
        <div>
          For non-profiltable or personal use, nib is avilable under{" "}
          <a href="https://creativecommons.org/licenses/by-nc/3.0/">
            creativecommons
          </a>{" "}
          license.
        </div>
        <div style={{marginTop: 15}}>
          <a href="mailto:contact@nibedit.com">Contact</a> to get it.
        </div>
      </div>
    );
  }
}

export default License;
