export interface IUIState {
  showAddActivity: boolean;
  addEntryPopup: { show: boolean; initialDate: Date };
}

export const initialUIState: IUIState = {
  showAddActivity: false,
  addEntryPopup: { show: false, initialDate: new Date() }
};
