import React, { Component } from 'react';
import './App.css';
import uid from 'uid'

class App extends Component{
constructor(){
  super()
  this.state = {
    turno:'X',
    finJuego:false,
    cuadros:'',
    numMovimientos:0
  }
}

render(){
  return (<div id="juego">
            <div id="encabezado">X-O By J. Bermúdez</div>
            <div> {this.state.cuadros} </div>
            <div id="estado">{this.state.lineaGanador}</div>
            </div>)
}

componentWillMount(){
  this.inicioJuego()
}

inicioJuego(){
  this.setState.tablero=Array(9).fill('')
  this.setState({
    numMovimientos:0,
    finJuego:false,
    turno:'X',
    lineaGanador:'',
    cuadros: <div id="tablero" onClick={(e)=>{this.clicked(e)}}>
      {
        this.setState.tablero.map((cuadro,key)=>{
          return <div className="cuadro" data-cuadro = {key} key={uid()}></div>
        })
      }
    </div>
  })
}

clicked(e){
  let index=e.target.dataset.cuadro

  if(!this.state.finJuego){
    if (this.setState.tablero[index]==='') {
      this.setState.tablero[index]=this.state.turno
      e.target.innerText=this.state.turno

      this.setState({
        turno:this.state.turno==='X'?'O':'X',
      })
      this.setState.numMovimientos+=1
      let ganador = this.ganador()
      if(ganador==='X'){
        this.setState({
          lineaGanador:this.msjGanador('Ha ganado X'),
          finJuego:true
        })
      }else if(ganador==='O'){
        this.setState({
          lineaGanador:this.msjGanador('Ha ganado O'),
          finJuego:true
        })
      }else if (ganador==='nadie') {
        this.setState({
          lineaGanador:this.msjGanador('Nadie ha ganado'),
          finJuego:true
        })
      }
    }
  }
}

ganador(){
  let ganador=null
  const opGanadoras=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

  for(let i=0;i<8;i++){
    const [a,b,c]=opGanadoras[i]
    if(this.setState.numMovimientos===9){
      ganador = 'nadie'
    }else if(this.setState.tablero[a]===this.setState.tablero[b] && this.setState.tablero[c]===this.setState.tablero[b])
    {
      ganador=this.setState.tablero[a]
      break;
    }
  }
  return ganador
}

msjGanador(str){
  return (<div>
    <div>{str}</div>
    <div onClick={(e)=>{this.inicioJuego(e)}} className='volverJugar'>Volver a Jugar</div>
  </div>)
}
}
export default App;