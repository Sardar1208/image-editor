import "./control_panel.css";
import { MdTune } from "react-icons/md";
import { IoColorFilterOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import Tabs from "./Tabs";
import TuneImageScreen from "../screens/TuneImage";
import FiltersScreen from "../screens/Filters";
import EffectsScreen from "../screens/Effects";


export default function ControlPanel() {
    return (
        <div className="panel_main">
            <Tabs tabs={[
                {label: "Tune Image", content: <TuneImageScreen />, icon: <MdTune size={25} />},
                {label: "Effects", content: <EffectsScreen />, icon: <CiFilter size={25} />},
                {label: "Filters", content: <FiltersScreen />, icon: <IoColorFilterOutline size={25} />},
            ]} />
        </div>
    )
}