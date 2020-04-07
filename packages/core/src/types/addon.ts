// todo: more details to be added to this interface

import { ElementType } from 'react';
import { IEditorPopup } from './components';

export interface IAddon {
  createStateFromDoc?: any;
  dispatchTransactionCallback?: any;
  getSerializableState?: any;
  init?: any;
  name: string;
  updateLicenseInfo?: any;
  viewUpdateCallback?: any;
  popups?: IEditorPopup[];
  toolbar: ElementType[];
}
