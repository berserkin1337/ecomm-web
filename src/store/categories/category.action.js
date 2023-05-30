import {createAction} from "../../utils/reducer/reducer.utils";
import {CATEGORIES_ACTION_TYPES as CATEGORY_ACTION_TYPES} from "./category.types";


export const setCategories = (categories) =>
    (createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categories));