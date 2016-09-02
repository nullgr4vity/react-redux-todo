import React from 'react';

export default {
  map(data, fn, ctx) {
    let index = 0;

    return data.map((item) => {
      if (!React.isValidElement(item)) {
        return item;
      }

      return fn.call(ctx, item, index++);
    });
  }
};
