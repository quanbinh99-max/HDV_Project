import { atom } from "recoil";
export const idEmployeesState = atom({
  key: "idEmployeesState", // vii tri employees
  default: "1", // default value (aka initial value)
});

export const localtionDeliveryDocketState = atom({
  key: "localtionDeliveryDocketState",
  default: 0, // default value (aka initial value)
});

export const localtionReceivedDocketState = atom({
  key: "localtionReceivedDocketState",
  default: 0, // default value (aka initial value)
});

export const localtionCustomerdeliveryDocketDetailsState = atom({
  key: "localtionCustomerdeliveryDocketDetailsState",
  default: 0, // default value (aka initial value)
});

export const localtionCustomerState = atom({
  key: "localtionCustomerState",
  default: 0, // default value (aka initial value)
});

export const productState = atom({
  key: "productState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const customersState = atom({
  key: "customersState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const employeesState = atom({
  key: "employeesState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const tabState = atom({
  key: "tabState", // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
});

export const receivedDocketsState = atom({
  key: "receivedDocketsState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const deliveryDocketsState = atom({
  key: "deliveryDocketsState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
