import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';
import Post from './Post';
import { db, auth } from './firebase';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import { Button, Input } from '@mui/material';
import ImageUpload from './ImageUpload'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate{-${top}%, -${left}%}`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#fff',
    border: '2px solid #000',
    // shadows: Array(24),
    padding: '10px',
  },
}));


function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
      }
      else {
        // user has logged out...q
        setUser(null);
      }
    })

    return () => {
      //perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);

  
  // useEffect -> Runs a piece of code based on a specific condition
  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id, 
        post:doc.data()
      })));
    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
      })
    })
    .catch((error) => alert(error.message))

    setOpen(false);

  }
  
  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    
    setOpenSignIn(false);
  }

  return (
    <div className="app">
      
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        
        <form className="app__signup">
          <center>
            <img
              className = "app__headerImage"
              src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="" 
            />
            </center>

            {/* <Input
              placeholder = "username"
              type =  "text"
              value = {username}
              onChange={(e) => setUsername(e.target.value)}
            /> */}
            <Input
              placeholder = "email"
              type =  "text"
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder = "password"
              type =  "password"
              value = {password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
        </form>
                    
        </div>
      </Modal>




      <div className= "app__header">
        <img
          className= "app__headerImage"
          src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

      {user ? (
          <Button onClick = {() => auth.signOut()}>Logout</Button>
      ): (
        <div>
          <Button onClick = {() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick = {() => setOpen(true)}>Sign Up</Button>
        </div>
      )}

      {/* {Header} */}
      <h1>Hello World!</h1>

      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}


      {/* <Post username="Asim Ahmed" caption=" Wow it works" imageUrl="https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"/>
      <Post username="Saturo Gojo" caption=" You're weak. xD" imageUrl="https://i.pinimg.com/736x/8e/de/53/8ede538fcf75a0a1bd812810edb50cb7.jpg" />
      <Post username="eren yeager" caption=" AoT" imageUrl="https://i.pinimg.com/originals/b2/8e/88/b28e88c761df7aa9e54e19be3439b596.jpg" /> */}
      {/* {Posts} */}
      {/* {Posts} */}
    </div>
  );
}

export default App;
