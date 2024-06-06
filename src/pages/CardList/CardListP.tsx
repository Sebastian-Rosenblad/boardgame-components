import React from "react";
import './CardListP.scss';
import { CardC } from "../../components/Card/CardC";
import { CardM } from "../../models/card.model";
import { DataItemM } from "../../models/data-item.model";
import { ComponentTypeE } from "../../enums/component-types.enum";
import { getNewID } from "../../scripts/id";

interface PropsM {
  data: Array<DataItemM>;
  path: string;
  updateData: (newCards: Array<DataItemM>) => void;
}

export function CardListP(props: PropsM): JSX.Element {
  const data: Array<DataItemM> = props.data;

  function addCardList() {
    props.updateData([...data, {
      id: getNewID(data.map(item => item.id)),
      name: "New card list",
      type: ComponentTypeE.Card,
      list: []
    }]);
  }
  function addCard(listID: string) {
    const cards: Array<CardM> | undefined = data.find(item => item.id === listID)?.list;
    if (cards !== undefined) props.updateData(updatedList(listID, { list: [...cards, {
      id: getNewID(data.map(item => item.list.map(card => card.id)).flat()),
      path: cards.length.toString()
    }] }));
  }
  function updateCard(newCard: CardM) {
    let newData: Array<DataItemM> = data;
    newData.forEach(item => item.list = item.list.map(card => card.id === newCard.id ? newCard : card));
    props.updateData(newData);
  }
  function updatedList(listID: string, changes: { [key: string]: any }): Array<DataItemM> {
    return data.map(item => item.id === listID ? {
      id: item.id,
      type: item.type,
      name: changes.name || item.name,
      list: changes.list || item.list
    } : item);
  }

  return <div className="card-list">
    {data.filter(item => item.type === ComponentTypeE.Card).map(item => <div key={item.id} className="card-list--list">
      <h2>{item.name}</h2>
      <div className="card-list--list--cards">{item.list.map(card => <CardC key={card.id} card={card} path={props.path} updateCard={updateCard} />)}</div>
      <button onClick={() => addCard(item.id)}>Add card</button>
    </div>)}
    <button onClick={addCardList}>Add card list</button>
  </div>
}
