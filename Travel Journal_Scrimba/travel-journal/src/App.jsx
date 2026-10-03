import Entry from '../components/Entry'
import Header from '../components/Header'
import './App.css'
import data from './data.js'

function App() {

const travelItinerary = data.map(function(details){
  return(
    <Entry
      key = {details.id}
      details = {details}
    />
  )
})

  return (
    <main>
      <Header />
      {travelItinerary}
    </main>
  )
}

export default App
