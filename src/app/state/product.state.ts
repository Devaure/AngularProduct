export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR
}

export enum ProductActionTypes{
    GET_ALL_PRODUCTS="[Product] Get All Product",
    GET_SELECTED_PRODUCTS="[Product] Get All selected Product",
    GET_AVAILABLE_PRODUCTS="[Product] Get All available Product",
    SEARCH_PRODUCTS="[Product] Search Product",
    NEW_PRODUCTS="[Product] New Product",
    SELECT_PRODUCT="[Product] select product",
    EDIT_PRODUCT="[Product] edit product",
    DELETE_PRODUCT="[Product] delete product",
}

export interface ActionEvent {
    type: ProductActionTypes,
    payload?:any
}
export interface AppDataState<T>{
    dataState?: DataStateEnum,
    data?:T,
    errorMessage?:string
}