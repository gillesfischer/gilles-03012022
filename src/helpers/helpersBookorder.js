export const updateDataArray = (delta, array, maxtableSize = 100) => {
  let newArray = [...array];
  //   const modifiedDelta = {
  //     price: delta[0],
  //     size: delta[1],
  //     total: 0,
  //   };
  const [price, size] = delta;
  const modifiedDelta = {
    price: price,
    size: size,
    total: 0,
  };

  //find if element already exist
  var foundIndex = newArray.findIndex(
    (item) => item.price === modifiedDelta.price
  );

  if (foundIndex !== -1) {
    //element exists
    if (modifiedDelta.size !== 0) {
      //update the size.
      newArray[foundIndex].size = modifiedDelta.size;
    } else {
      //remove the entry.
      newArray.splice(foundIndex, 1);
    }
    calculateTotal(newArray);
  } else {
    if (modifiedDelta.size !== 0) {
      newArray.push(modifiedDelta);
      sortData(newArray);
      calculateTotal(newArray);
    }
  }

  return newArray.slice(0, maxtableSize);
};

export const createDataArray = (array, maxtableSize = 100) => {
  const modifiedArray = array.map((pair) => ({
    price: pair[0],
    size: pair[1],
    total: 0,
  }));

  sortData(modifiedArray);

  calculateTotal(modifiedArray);

  return modifiedArray.slice(0, maxtableSize);
};

const sortData = (array) => {
  return array.sort((a, b) => {
    return b.price - a.price;
  });
};

const calculateTotal = (array) => {
  array.forEach((item, index, arr) => {
    item.total = arr
      .slice(0, index + 1)
      .reduce((prev, curr) => prev + curr.size, 0);
  });
  return array;
};
