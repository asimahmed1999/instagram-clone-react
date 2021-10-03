import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';
import Post from './Post';
import { db, auth } from './firebase';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import { Button, Input } from '@mui/material';

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  
  // useEffect -> Runs a piece of code based on a specific condition
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
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
    .catch((error) => alert(error.message))

  }

  return (
    <div className="app">
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
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

            <Input
              placeholder = "username"
              type =  "text"
              value = {username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <Button type="submit" onClick={signUp}>SignUp</Button>
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

      <Button onClick = {() => setOpen(true)}>Sign Up</Button>

      {/* {Header} */}
      <h1>Hello World!</h1>

      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }




      {/* <Post username="Asim Ahmed" caption=" Wow it works" imageUrl="https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"/>
      <Post username="Saturo Gojo" caption=" You're weak. xD" imageUrl="https://i.pinimg.com/736x/8e/de/53/8ede538fcf75a0a1bd812810edb50cb7.jpg" />
      <Post username="eren yeager" caption=" AoT" imageUrl="https://i.pinimg.com/originals/b2/8e/88/b28e88c761df7aa9e54e19be3439b596.jpg" /> */}
      {/* {Posts} */}
      {/* {Posts} */}
    </div>
  );
}

export default App;
