import logo from './logo.svg';
import './App.css';

import UserDetails from './components/UserDetails';
import PartyList from './components/PartyList';
import AddPartyForm from './components/AddPartyForm';

const App = () => {
  return (
    <div>
      <UserDetails userId={1} />
      <PartyList />
      <AddPartyForm />
    </div>
  );
};



export default App;
