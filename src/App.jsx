import React, { useState } from 'react'
import Navbar from './components/Navbar'
import LogImport from './components/LogImport'
import LogTable from './components/LogTable'

function App() {
  const [logData, setLogData] = useState([])
  return (
    <>
      <Navbar />
      <LogImport onLogFileParsed={setLogData}/>
      <LogTable logData={logData}/>
    </>
  )
}

export default App