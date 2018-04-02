import * as FilterAction from './filter.actions';

export function FilterReducer ( state: string ='SHOW_ALL', action: FilterAction.SetFilterAction){
    if (!action) {
        return state;
    }
    switch (action.type) {
        //action.type tipo de accion
        case FilterAction.SET_FILTER: {
          return action.filter
        }
        default:{
        return state;
        }
    }
}