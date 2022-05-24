import * as R from 'ramda';
const MSGS={
  ADD_FLASH_CARD:'ADD_FLASH_CARD',
  SAVE_CARD:'SAVE_CARD',
  SHOW_ANSWER:'SHOW_ANSWER',
  EDIT_CARD:'EDIT_CARD',
  RANK_CARD:'RANK_CARD',
  DELETE_CARD: 'DELETE_CARD',
};

export function addFlashCardMsg (mode,question,answer,rank){
  return {
    type:MSGS.ADD_FLASH_CARD,
    mode,
    question,
    answer,
    rank,
  };
}

export function saveCardMsg(id){
  return {
    type:MSGS.SAVE_CARD,
    id,
  };
}

export function showAnswerMsg(id){
  return {
    type:MSGS.SHOW_ANSWER,
    id,
  };
}

export function editCardMsg(id){
  return {
    type:MSGS.EDIT_CARD,
    id,
  };
}

export function rankACardMsg(id, rank){
  return {
    type:MSGS.RANK_CARD,
    id,
    rank,
  };
}

export function deleteCardMsg(id){
  return {
    type:MSGS.DELETE_CARD,
    id,
  };
}
function update(msg, model) {
  switch (msg.type) {
    case MSGS.ADD_FLASH_CARD:{
      const {mode,question,answer,rank} = msg;
      const {cards,nextCardId}=model;
      const updatedCards = sortCards([ ...cards, {
        id:nextCardId,
        question,
        answer,
        rank,
        mode,
      }]);
      return {...model, cards: updatedCards, nextCardId: nextCardId+1,};
    }
    case MSGS.SAVE_CARD:{
      const {id}=msg;
      const question = document.getElementById(R.concat('Question',id.toString())).value;
      const answer = document.getElementById(R.concat('Answer',id.toString())).value;
      const cards = R.pipe(
        R.map(
        card => {
          if (card.id==id)
            return {...card, question, answer,mode:'HIDDEN_ANSWER'};
          else
            return card;
        }),
        sortCards,
      )(model.cards);
      return {...model, cards};
    }
    case MSGS.SHOW_ANSWER:{
      const {id} =msg;
      const cards = R.pipe(
        R.map(card =>
          {
            if (card.id==id)
              return {...card, mode:'SHOWED_ANSWER'};
            else
              return card;
          }),
          sortCards,
        )(model.cards);
      return { ...model,cards};
    }
    case MSGS.EDIT_CARD:{
      const {id}=msg;
      const cards = R.pipe(
        R.map(card => {
          if (card.id==id)
            return {...card, mode:'EDIT_MODE'};
          else
            return card;
          }),
          sortCards,
      )(model.cards);
      return {...model,cards};
    }
    case MSGS.RANK_CARD:{
      const {id, rank}=msg;
      const cards = R.pipe(
        R.map(card => {
          if (card.id==id)
            return {...card, mode:'HIDDEN_ANSWER', rank};
          else
            return card;
          }),
          sortCards,
        )(model.cards);
      return {...model,cards};
    }
    case MSGS.DELETE_CARD:{
      const {id}=msg;
      const cards=R.pipe(
        R.filter(card => card.id !==id),
        sortCards,
      )(model.cards);
      return {...model,cards};
    }
    default:
      return model;
  }
}

const sortById = R.partial(R.sort,[R.descend(R.prop('id'))]);
const sortByRank = R.partial(R.sort,[R.ascend(R.prop('rank'))]);
const sortCards = cards=> R.pipe(sortById,sortByRank)(cards);

export default update;
