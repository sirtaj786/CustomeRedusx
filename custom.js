const func=(currentState,action)=>{
    if(action.type==="INCREMENT_AMOUNT"){
      return{
        ...currentState,
        count:currentState.count + 1
      }
    }
    else if(action.type==="DECREMENT_AMOUNT"){
      return{
        ...currentState,
        count: currentState.count - 1
      }
    }
    else{
      return currentState
    }

  }

//custome
class Store{
  #state;
  #updater;
  #listenerCallback;
  
  constructor(initState,updaterFn){
    this.#state=initState;
    this.#updater=updaterFn;
  }
  getState(){
    return this.#state
  }
  get state(){
    return this.#state
  }
  dispatch(action){
    const currentState=this.#state
    const newState=this.#updater(currentState,action)
    this.#state=newState
    if(currentState===newState){
      return
    }
    else{
      if(this.#listenerCallback)
      this.#listenerCallback()
    }
  }
  subscribe(callback){
    this.#listenerCallback=callback
  }
}


 const store=new Store({count:1},func);

store.subscribe(()=>{
  console.log(` store has got updated `)

  console.log(store.state)
})



console.log(store.state)

store.dispatch({type:"INCREMENT_AMOUNT"})

store.dispatch({type:"INCREMENT_AMOUNT"})

store.dispatch({type:"DECREMENT_AMOUNT"})
