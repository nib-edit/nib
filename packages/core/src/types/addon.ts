// todo: more details to be added to this interface

import { EditorPopup } from './components';

export interface Addon {
  createStateFromDoc?: any;
  dispatchTransactionCallback?: any;
  getSerializableState?: any;
  init?: any;
  name: string;
  updateLicenseInfo?: any;
  viewUpdateCallback?: any;
  popups?: EditorPopup[];
}
