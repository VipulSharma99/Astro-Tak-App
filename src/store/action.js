export const view = "Set_View";
export const edit = "Set_Edit";

export const setView = (screenview) => {
    return(
        {
            type: view,
            screenview: screenview
        }
    )
}
export const setEdit = (screenview,data) => {
    return(
        {
            type: edit,
            screenview: {screenview,data}
        }
    )
}