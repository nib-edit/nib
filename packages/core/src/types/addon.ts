// todo: more details to be added to this interface

export interface Addon {
  createStateFromDoc: any;
  dispatchTransactionCallback: any;
  getSerializableState: any;
  init: any;
  name: string;
  updateLicenseInfo: any;
  viewUpdateCallback: any;
}
