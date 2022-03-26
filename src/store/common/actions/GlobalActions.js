export const TYPES = {
    GLOBAL_RESET: 'GLOBAL_RESET',
    GLOBAL_RESET_CURRENT_CATEGORY: 'GLOBAL_RESET_CURRENT_CATEGORY',
    GLOBAL_RESET_CATEGORY_AND_ASSET: 'GLOBAL_RESET_CATEGORY_AND_ASSET',
    GLOBAL_RESET_CHANGE_ASSET: 'GLOBAL_RESET_CHANGE_ASSET',
};

export const globalReset = () => ({
    type: TYPES.GLOBAL_RESET,
    payload: null,
});
export const globalResetCurrentContent = () => ({
    type: TYPES.GLOBAL_RESET_CURRENT_CATEGORY,
    payload: null,
});
export const globalResetCategoryAndAssetCategory = () => ({
    type: TYPES.GLOBAL_RESET_CATEGORY_AND_ASSET,
    payload: null,
})
export const globalResetChangeAsset = () => ({
    type: TYPES.GLOBAL_RESET_CATEGORY_AND_ASSET,
    payload: null,
})