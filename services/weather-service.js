import SunIcon from '../assets/icons/01d.svg';
import PartlyCloudyIcon from '../assets/icons/02d.svg';
import FogIcon from '../assets/icons/50d.svg';
import DrizzleIcon from '../assets/icons/09d.svg';
import FreezingDrizzleIcon from '../assets/icons/09n.svg';
import RainIcon from '../assets/icons/10d.svg';
import FreezingRainIcon from '../assets/icons/10n.svg';
import SnowfallIcon from '../assets/icons/13d.svg';
import SnowGrainsIcon from '../assets/icons/13n.svg';
import RainShowersIcon from '../assets/icons/10d.svg';
import SnowShowersIcon from '../assets/icons/13d.svg';
import ThunderstormIcon from '../assets/icons/11d.svg';
import ThunderstormHailIcon from '../assets/icons/11n.svg';

export const WEATHER_INTERPRETATION = [
  {
    codes: [0],
    label: "Clear sky",
    image: SunIcon,
  },
  {
    codes: [1, 2, 3],
    label: "partly cloudy",
    image: PartlyCloudyIcon,
  },
  {
    codes: [45, 48],
    label: "Fog",
    image: FogIcon,
  },
  {
    codes: [51, 53, 55],
    label: "Drizzle",
    image: DrizzleIcon,
  },
  {
    codes: [56, 57],
    label: "Freezing Drizzle",
    image: FreezingDrizzleIcon,
  },
  {
    codes: [61, 63, 65],
    label: "Rain",
    image: RainIcon,
  },
  {
    codes: [66, 67],
    label: "Freezing Rain",
    image: FreezingRainIcon,
  },
  {
    codes: [71, 73, 75],
    label: "Snowfall",
    image: SnowfallIcon,
  },
  {
    codes: [77],
    label: "Snow grains",
    image: SnowGrainsIcon,
  },
  {
    codes: [80, 81, 82],
    label: "Rain showers",
    image: RainShowersIcon,
  },
  {
    codes: [85, 86],
    label: "Snow showers",
    image: SnowShowersIcon,
  },
  {
    codes: [95],
    label: "Thunderstorm",
    image: ThunderstormIcon,
  },
  {
    codes: [96, 99],
    label: "Thunderstorm with hail",
    image: ThunderstormHailIcon,
  },
];

export const getWeatherInterpretation = (code) =>
  WEATHER_INTERPRETATION.find((interpretation) => interpretation.codes.includes(code));
