// todo: more details to be added to the file

export interface Addon {
  name: string;
  init: any;
  updateLicenseInfo: any;
  createStateFromDoc: any;
  getSerializableState: any;
  viewUpdateCallback: any;
  dispatchTransactionCallback: any;
}
