import { initialUIState, IUIState } from "./ui.state";
import { UIAction, UIActionTypes } from "./ui.actions";

export function uiReducer(state = initialUIState, action: UIAction): IUIState {
  switch (action.type) {
    case UIActionTypes.HideAddActivity:
      return {
        ...state,
        showAddActivity: false
      };
    case UIActionTypes.ShowAddActivity:
      return {
        ...state,
        showAddActivity: true
      };
    case UIActionTypes.HideAddEntry:
      return {
        ...state,
        addEntryPopup: { ...state.addEntryPopup, show: false }
      };
    case UIActionTypes.ShowAddEntry:
      return {
        ...state,
        addEntryPopup: {
          ...state.addEntryPopup,
          show: true,
          initialDate: action.payload.date
        }
      };
    default:
      return state;
  }
}
