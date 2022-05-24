// Tres tipos de modos de carta
// {
//   id:0,
//   question:'Pregunta 1',
//   answer:'Respuesta 1',
//   cardMode:'HIDDEN_ANSWER',
// },
// {
//   id:1,
//   question:'Pregunta 2',
//   answer:'Respuesta 2',
//   cardMode:'SHOWED_ANSWER',
// },
// {
//   id:2,
//   question:'Pregunta 3',
//   answer:'Respuesta 3',
//   cardMode:'EDIT_MODE',
// },


const initModel = {
  cards:[
    {
      id:0,
      question:'Pregunta 1',
      answer:'Respuesta 1',
      mode:'HIDDEN_ANSWER',
      rank:0,
    },
    {
      id:1,
      question:'Pregunta 2',
      answer:'Respuesta 2',
      mode:'SHOWED_ANSWER',
      rank:100,
    },
    {
      id:2,
      question:'Pregunta 3',
      answer:'Respuesta 3',
      mode:'EDIT_MODE',
      rank:10,
    },
  ], // An array of cards
  nextCardId:3,
  //question:'',
  //answer:'',
  //rank:0, // The rank of a card tell us the priority of studying the card
  //mode:'NANAI', // There is 3 modes for one card: hidingAnswer, showingAnswer, and editMode
  //editCardId:0,
};
export default initModel;
