
import React from 'react';
import './App.css';
import Routes from './Routes';

// class App extends React.Component{
// constructor(props) {
//   super(props);
//   this.state = { apiResponse: "" };
// }

// // callAPI(){
// //   fetch("http://localhost:5000/")
// //       .then(res => res.text())
// //       .then(res => this.setState({ apiResponse: res }));
// // }

// // componentWillMount() {
// //   this.callAPI();
// }
// render(){
//   return(
//     <Routes />
//   );
// }
// }
function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
