import { initialUIState, IUIState } from "./ui.state";
import { UIAction, UIActionTypes } from "./ui.actions";

export function uiReducer(state = initialUIState, action: UIAction): IUIState {
  switch (action.type) {
    case UIActionTypes.HideAddActivity:
      return {
        showAddActivity: false
      };
    case UIActionTypes.ShowAddActivity:
      return {
        showAddActivity: true
      };
    default:
      return state;
  }
}
