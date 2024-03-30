import { useRef } from "react";
import { useEffect } from "react";
import { useState, useCallback } from "react"



function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copybtn , setCopybtn] = useState(true);

  const passwordRef = useRef(null)

  const afterCopiedopiedStyle = {
    backgroundColor: "green",
  }
  const beforeCopiedStyle = {
    backgroundColor: "DodgerBlue",
  }


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"


    if (number) str += "0123456789"
    if (charAllowed) str += "[]{},.<>/?;:'+=-_)(*&^%$#@!~"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)

    }
    setPassword(pass)



  }, [length, number, charAllowed, setPassword])

   const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    setCopybtn(false)
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
   },[password])
   useEffect(()=>{
    setCopybtn(true)
   }, [password])


  useEffect(()=>{
    passwordGenerator()
  },[length, number, charAllowed, setPassword])


  return (
    <>
      <div
        className="w-full bg-gray max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center ">
          Password Generator
        </h1>


        <div
          className="flex shadow rounded-lg overflow-hidden mb-4"
        >

          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-black"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className={`outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0 
            ${copybtn?  "bg-blue-800":"bg-green-800" }`
              
          }
            onClick={copyPasswordToClipBoard}
          >
            {copybtn?`Copy`:`Copied`}
          </button>

        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              id="range"
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label htmlFor="range">Length :{length}</label>

          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="number"
              onChange={() => {
                setNumber((prev) => !prev);
              }}

            />
            <label htmlFor="number">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="char"
              onChange={() => {
                setNumber((prev) => !prev);
              }}

            />
            <label htmlFor="char">Special Symbols</label>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
