import { Pages } from "../enums/pages";
import townHall from "@/../public/components/quickselect/town-hall-bt.svg";
import townHallBg from "@/../public/components/quickselect/town-hall.svg";
import theAltar from "@/../public/components/quickselect/the-altar-bt.svg";
import theAltarBg from "@/../public/components/quickselect/the-altar.svg";
import westDung from "@/../public/components/quickselect/west-dung-bt.svg";
import westDungBg from "@/../public/components/quickselect/west-dung.svg";
import eastDung from "@/../public/components/quickselect/east-dung-bt.svg";
import eastDungBg from "@/../public/components/quickselect/east-dung.svg";
import northDung from "@/../public/components/quickselect/north-dung-bt.svg";
import northDungBg from "@/../public/components/quickselect/north-dung.svg";
import bonk from "@/../public/components/quickselect/bonk-ruins-bt.svg";
import bonkBg from "@/../public/components/quickselect/bonk-ruins.svg";


export const cardsData = [
  {
    direction: '#',
    alt: 'Town Hall',
    buttonImg: townHall,
    locationImage: townHallBg,
    text: 'Find services of all kinds around here.'
  },
  {
    direction: Pages.MINT_RUNE,
    alt: 'The Altar',
    buttonImg: theAltar,
    locationImage: theAltarBg,
    text: 'Summon your hero.'
  },
  {
    direction: Pages.BONK_RUINS,
    alt: 'Bonk Ruins',
    buttonImg: bonk,
    locationImage: bonkBg,
    text: 'Explore the Bonk Ruins.'
  },
  {
    direction: '#',
    alt: 'West Dungeon',
    buttonImg: westDung,
    locationImage: westDungBg,
    text: 'Explore the West Dungeon.'
  },
  {
    direction: '#',
    alt: 'East Dungeon',
    buttonImg: eastDung,
    locationImage: eastDungBg,
    text: 'Explore the East Dungeon.'
  },
  {
    direction: '#',
    alt: 'North Dungeon',
    buttonImg: northDung,
    locationImage: northDungBg,
    text: 'Explore the North Dungeon.'
  },

]