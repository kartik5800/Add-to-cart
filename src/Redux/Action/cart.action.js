export const ADD = (item,size) => {
  return {
      type: "ADD_CART",
      payload: {item,size}
      // payload:actdata, size
  }
}

// remove iteams
export const DLT = (id) => {
  return {
      type: "RMV_CART",
      payload: id
  }
}

// remove individual iteam

export const REMOVE = (iteam) => {
  return {
      type: "RMV_ONE",
      payload: iteam
  }
}