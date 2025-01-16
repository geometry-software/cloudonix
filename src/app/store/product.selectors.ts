import { createFeatureSelector, createSelector } from "@ngrx/store"
import { State } from "./product.state"
import { storeFeatureKey } from "../models/store.model"

export const getState = createFeatureSelector<State>(storeFeatureKey)
export const getProducts = createSelector(getState, (state) => state.products)