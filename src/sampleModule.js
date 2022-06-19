const index = () => {
    return "default export";
  };
  
  const add = (a, b) => {
    return a + b;
  };
  
  const subtract = (a, b) => {
    return a - b;
  };

  const servicePayload = () => {
    return {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    }
  }
  
  export { add, subtract, servicePayload };
  export default index;
  