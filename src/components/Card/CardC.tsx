import React from "react";
import './CardC.scss';
import { CardM } from "../../models/card.model";
import { CardTypeE } from "../../enums/card-types.enum";
import { visionProductionCard } from "./VisionF";

interface PropsM {
  card: CardM;
  path: string;
  updateCard: (newCard: CardM) => void;
}

export function CardC(props: PropsM): JSX.Element {
  function cardElement(card: CardM): JSX.Element {
    switch (card.type) {
      case CardTypeE.YogSothoth: return yogSothothCard(card);
      case CardTypeE.Vision: return visionProductionCard(getBackgroundImage(card.path));
      case CardTypeE.MTG: return mtgCard(card);
      default: return visionProductionCard(getBackgroundImage(card.path));
    }
  }
  function yogSothothCard(card: CardM): JSX.Element {
    return <div className="card"></div>
  }
  function mtgCard(card: CardM): JSX.Element {
    return <div className="card"></div>
  }

  function getBackgroundImage(path: string) {
    return { backgroundImage: `url("./${props.path}/${path}.png")` };
  }

  return cardElement(props.card);
}
