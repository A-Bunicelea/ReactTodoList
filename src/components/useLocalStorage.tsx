import { useState, useEffect } from "react";

//key-value pair required by localStorage
function useLocalStorage(key: string, initialValue: any) {
  const [value, setValue] = useState(() => {
    //useState can acept a value or a function
    //that function will eventually return the initial value for state
    const savedToLocalStorage = localStorage.getItem(key);
    if (savedToLocalStorage !== null) {
      console.log("JSON", JSON.parse(savedToLocalStorage))
      return JSON.parse(savedToLocalStorage);
    }
    return initialValue;
  });

 

  useEffect(() => {
    //adds the new value to localStorage
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
  //[value, setValue] - just like state
}

export default useLocalStorage;
