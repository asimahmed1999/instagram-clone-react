import './App.css';
import React from 'react';
import Post from './Post';

function App() {
  return (
    <div className="app">
      
      <div className= "app__header">
        <img
          className= "app__headerImage"
          src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />

      </div>

      {/* {Header} */}
      <h1>Hello World!</h1>
      <Post username="Asim Ahmed" caption=" Wow it works" imageUrl="https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"/>
      <Post username="Saturo Gojo" caption=" You're weak. xD" imageUrl="https://i.pinimg.com/736x/8e/de/53/8ede538fcf75a0a1bd812810edb50cb7.jpg" />
      <Post username="eren yeager" caption=" AoT" imageUrl="https://i.pinimg.com/originals/b2/8e/88/b28e88c761df7aa9e54e19be3439b596.jpg" />
      {/* {Posts} */}
      {/* {Posts} */}
    </div>
  );
}

export default App;
