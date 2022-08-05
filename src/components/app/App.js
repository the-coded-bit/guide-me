import './App.css';
import { Navbar, Map, Input } from '..';
import InputContextProvider from '../../utils/contexts/InputContext';

function App() {
  return (
    <main>
      <Navbar />
      <section className='app__header'>Let's calculate <span className='app__header__span'>distance</span> from Google maps</section>
      <InputContextProvider>
        <section className='app__main'>
          <Input />
          <Map />
        </section>
      </InputContextProvider>
    </main>
  );
}

export default App;
