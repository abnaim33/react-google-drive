
import './App.css';
import './styles.css'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import { useState } from 'react';
import { auth, provider } from './firebase';

function App() {


  const [user, setUser] = useState(null)

  const handleSignIn = () => {
    auth.signInWithPopup(provider)
      .then(({ user }) => {
        setUser(user)
        console.log(user)
      }).catch(err => {
        alert(err.message)
      })
  }



  return (
    <>
      {user ? (
        <>
          <Header profile={user.photoURL} />
          <div className="home_container">
            <Sidebar />
            <Home />
          </div>
        </>)
        :
        (
          <div className="login">
            <div className="login-container">

              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7tG-80NdY4vPVS4rRikAAt9-xzRyrDtMcgw&usqp=CAU" alt="" />
              <button onClick={handleSignIn}>Login to Google Drive</button>
            </div>
          </div>
        )
      }

    </>
  );
}

export default App;
