/* Format an object with nested structure. You can add extra keys and values to the same nested structure */
/* The below code converts the demo object into an openapi schema */

// Declare an object
let ob = {
  name: 1,
  description: "The test group description",
  type: false,
  users: ["af5d8fc9-da33-46a0-b374-b8f2c3e52d48"],
  devices: [
    {
      level1: {
        level2: "Testname",
      },
    },
    {
      level1: {
        level2: "Testname",
      },
    },
  ],
};

// Declare a flatten function that takes
// object as parameter and returns the
// flatten object
const flattenObj = (ob) => {
  // The object which contains the
  // final result
  let result = {};

  // loop through the object "ob"
  for (const i in ob) {
    // We check the type of the i using
    // typeof() function and recursively
    // call the function again
    if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i]);
      for (const j in temp) {
        // Store temp in result

        result[i] = temp;
      }
    }

    // Else store ob[i] in result directly
    else {
      if (Array.isArray(ob[i])) {
        const items = ob[i].map((item) => {
          if (typeof item === "object" && !Array.isArray(item)) {
            const temp = flattenObj(item);
            console.log("TEMP -> ", temp);
            for (const j in temp) {
              // Store temp in result
              return temp;
              // return {
              //     type: Array.isArray(temp) ? "array" : typeof temp,
              //     properties: temp,
              // };
            }
          } else {
            return {
              type: Array.isArray(item) ? "array" : typeof item,
              example: item,
            };
          }
        });
        result[i] = {
          type: "array",
          items,
        };
      } else {
        result[i] = {
          type: typeof ob[i],
          example: ob[i],
        };
      }
    }
  }
  return {
    type: "object",
    properties: result,
  };
};
