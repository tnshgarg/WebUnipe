import "./App.css"
import CSVReader from "react-csv-reader"
import { useState } from "react"
import axios from "axios"

function App() {
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  }

  const [dataEntry, setDataEntry] = useState()

  const handleForce = (data, fileInfo) => {
    setDataEntry(data)
    data.map((item) => {
    try {
      axios.post("http://ed4b-117-214-159-246.ngrok.io", {
        name: item.name,
            age: item.age,
            gender: item.gender
    })}catch (err) {
      console.error(err)
    }
  })
  }

  return (
    <div className="App">
      <CSVReader
        cssClass="csv-reader-input"
        label="Select CSV"
        onFileLoaded={handleForce}
        parserOptions={papaparseOptions}
        inputId="ObiWan"
        inputName="ObiWan"
        inputStyle={{ color: "green" }}
      />
      {dataEntry ? (
        <table>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
          {dataEntry.map((item) => (
            <tr>
              <th contentEditable={true}>{item.name}</th>
              <th contentEditable={true}>{item.age}</th>
              <th contentEditable={true}>{item.gender}</th>
            </tr>
          ))}
        </table>
      ) : (
        <h1>Hi, Please upload a CSV File and see the magic.</h1>
      )}
    </div>
  )
}

export default App
