export const getLocalStore = () => JSON.parse(localStorage.getItem('state')) || undefined;

//we just want to save the state and our properties. we don't want to save ui states just the data
export const setLocalStore = (state, props) => {
    let toSave = {};
    props.forEach(p => toSave[p] = state[p]);
    localStorage.setItem('state', JSON.stringify(toSave));
}
