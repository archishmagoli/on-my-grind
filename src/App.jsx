import './App.css';
import Form from './components/Form';
import Coffee from './assets/coffee-icon.png'

function App() {

  return (
    <>
      <div className='header'>
        <div className='intro'>
          <h1>On My Grind</h1>
          <img id='intro-image' src={Coffee}/>
        </div>
        <p>So you think you can barista? Let's put that to the test...</p>
        <br></br>
      </div>
      
      
      <Form />
    </>
  )
}

export default App
