import Event from "../../utils/EventRegister";

const _openSelect = (data, onChange, value, search) => {
    Event.emitEvent("modalOpen", {
        visible: true,
        data: data,
        onChange: onChange,
        value: value,
        search: search ? search : true,
    })
};

export default {
    _openSelect,
}
