import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import {
  addFlashCardMsg,
  saveCardMsg,
  showAnswerMsg,
  editCardMsg,
  rankACardMsg,
  deleteCardMsg,
}from './Update';
const { div, h1, button, i ,pre, span,a,textarea} = hh(h);

const addFlashCardText = 'Add Flashcard';
const CARDCONST = {
  QUESTION_TITLE:'Question',
  ANSWER_TITLE:'Answer',
  SHOW_ANSWER_TITLE:'Show answer',
  BAD_BUTTON_TEXT:'Bad',
  GOOD_BUTTON_TEXT:'Good',
  GREAT_BUTTON_TEXT:'Great',
  SAVE_BUTTON_TEXT: 'Save',
};

const CARDMODES = {
  HIDDEN_ANSWER: 'HIDDEN_ANSWER',
  SHOWED_ANSWER: 'SHOWED_ANSWER',
  EDIT_MODE: 'EDIT_MODE',
};

function addFlashCardButton(dispatch){
  return div( {className:''},[
      button(
        {
          className:'pa2 br1 mv2 bg-green bn white pointer',
          onclick: () => dispatch(addFlashCardMsg('EDIT_MODE','','',0)),
        },
        [
          i(
            {
              className:'fa fa-plus ph1',
            }),
          span({className:''}, addFlashCardText),
        ],
      ),
  ]);
}

//Answer or Question View
function QorAView(dispatch,card,title, text){
  const {id}=card;
  return div({},[
    div({className:'b f6 mv1 underline'}, title),
    div(
      {
        className:'pointer',
        onclick: () => dispatch(editCardMsg(id)),
      }, text),
  ]);
}


//hiding Answer View
function hidingAnswerView(dispatch,card){
  const {question,id}=card;
  return div({className:'w-100 pa2 bg-light-yellow shadow-1 mv2 relative pb5'},[
    QorAView(dispatch,card,CARDCONST.QUESTION_TITLE,question),
    div({},[
      div(
        {
          className:'f6 underline link pointer',
          onclick: ()=> dispatch(showAnswerMsg(id)),
        },
        CARDCONST.SHOW_ANSWER_TITLE,
      ),
    ]),
    i(
      {
        className:'absolute top-0 right-0 fa fa-remove fa-fw black-50 pointer',
        onclick: () => dispatch(deleteCardMsg(id)),
      }),
  ]);
}

//Ranking Buttons View
function rankingButtonsView (dispatch,card) {
  return div({className:'absolute bottom-0 left-0 w-100 ph2'},[
    div({className:'mv2 flex justify-between'},[
      button(
        {
          className:'f4 ph3 pv2 bg-red bn white br1',
          onclick: ()=> dispatch(rankACardMsg(card.id,0)),
        },CARDCONST.BAD_BUTTON_TEXT),
      button(
        {
          className:'f4 ph3 pv2 bg-blue bn white br1',
          onclick: ()=> dispatch(rankACardMsg(card.id,card.rank+1)),
        },CARDCONST.GOOD_BUTTON_TEXT),
      button(
        {
          className:'f4 ph3 pv2 bg-green bn white br1',
          onclick: ()=> dispatch(rankACardMsg(card.id,card.rank+2)),
        },CARDCONST.GREAT_BUTTON_TEXT),
    ]),
  ]);
}

//showing Answer View
function showingAnswerView(dispatch,card){
  const {question,answer,id}=card;
  return div({className:'w-100 pa2 bg-light-yellow shadow-1 mv2 relative pb5'},[
    QorAView(dispatch,card,CARDCONST.QUESTION_TITLE,question),
    QorAView(dispatch,card,CARDCONST.ANSWER_TITLE,answer),
    rankingButtonsView(dispatch,card),
    i(
      {
        className:'absolute top-0 right-0 fa fa-remove fa-fw black-50 pointer',
        onclick: () => dispatch(deleteCardMsg(id)),
      }),
  ]);
}

//
function QorAEditView(labelText,text,id){
  return div({},[
    div(
      {
        className:'b f6 mv1'
      },
      labelText),
    textarea(
      {
        className:'w-100 bg-washed-yellow outline-0',
        id: R.concat(labelText,id.toString()),
      },
      text),
  ]);
}
//edit Mode View
function editModeView(dispatch,card){
  const {question, answer, id} = card;
  return div(
    {
      className:'w-100 pa2 bg-light-yellow mv2 shadow-1 relative',
    },[
    QorAEditView(
      CARDCONST.QUESTION_TITLE,
      question,
      id,
    ),
    QorAEditView(
      CARDCONST.ANSWER_TITLE,
      answer,
      id,
    ),
    button(
      {
        className:'f4 ph3 pv2 br1 bg-gray bn white mv2',
        onclick: () => dispatch(saveCardMsg(id)),
      },
      CARDCONST.SAVE_BUTTON_TEXT),
    i(
      {
        className:'absolute top-0 right-0 fa fa-remove fa-fw black-50 pointer',
        onclick: () => dispatch(deleteCardMsg(id)),
      }),
  ]);
}

function cardView(dispatch,card){
  const {mode} = card;
  let modeView = R.identity;
  switch (mode) {
    case CARDMODES.HIDDEN_ANSWER:
      modeView= hidingAnswerView;
      break;
    case CARDMODES.SHOWED_ANSWER:
      modeView = showingAnswerView;
      break;
    case CARDMODES.EDIT_MODE:
      modeView = editModeView;
      break;
  }
  return div({className:'w-third pa2'},[
    modeView(dispatch,card),
  ]);
}

function cardBoardView(dispatch,model){
  const {cards}=model;
  if (cards.length === 0){
    return div({className:'flex flex-wrap nl2 nr2'});
  }else{
    return div({className:'flex flex-wrap nl2 nr2'},
      R.map(R.partial(cardView,[dispatch]),cards));
  }

}

function view(dispatch, model) {
  return div({ className: 'mw8 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Flashcard Study'),
    addFlashCardButton(dispatch),
    cardBoardView(dispatch,model),
    //pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
