import { createFeatureSelector, createSelector } from "@ngrx/store"
import { State } from "./product.state"
import { storeFeatureKey } from "../models/store.model"

export const getState = createFeatureSelector<State>(storeFeatureKey)
export const getProducts = createSelector(getState, (state) => state.products)
export const getLoading = createSelector(getState, (state) => state.loading)
export const getProductById = (id: number) => createSelector(getProducts, (products) =>
    products.find(el => el.id === id))