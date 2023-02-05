import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home';
import SuperHeroes from './components/SuperHeroes';
import RQSuperHeroes from './components/RQSuperHeroes';
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import RQSuperHero from './components/RQSuperHero';
import { ParallelQueries } from './components/ParallelQueries';
import { DynamicParallel } from './components/DynamicParallel';
import { DependentQueries } from './components/DependentQueries';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/rq-dependent' element={<DependentQueries email='vishwas@example.com' />} />
          <Route path='/rq-dynamic-parallel' element={<DynamicParallel heroIds={[1, 3]} />} />
          <Route path='/rq-parallel' element={<ParallelQueries />} />
          <Route path='/rq-super-heroes/:heroId' element={<RQSuperHero />} />
          <Route path='/' element={<Home />} />
          <Route path='/super-heroes' element={<SuperHeroes />} />
          <Route path='/rq-super-heroes' element={<RQSuperHeroes />} />
        </Routes>

      </div>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
