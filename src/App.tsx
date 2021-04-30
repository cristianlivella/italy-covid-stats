import { useState, useEffect } from 'react';
import ItalyMap from './components/ItalyMap';
import ReactTooltip from 'react-tooltip';
import './App.css';
import { Region } from './types';

const App = () => {
    const [tooltip, setTooltip] = useState('');
    const [regionColors, setRegionColors] = useState<Region[]>([]);

    useEffect(() => {
        updateRegionColors();
        setInterval(() => {
            updateRegionColors();
        }, 60 * 60 * 1000)
    }, []);

    const updateRegionColors = () => {
        // data source: https://www.salute.gov.it/portale/nuovocoronavirus/homeNuovoCoronavirus.jsp
        fetch('https://cristianlivella.com/covid19-colori-regioni/')
            .then(res => res.json())
            .then(res => {
                const newRegionColors : Region[]  = [];
                for (const [color, regions] of Object.entries(res)) {
                    const regionsList = regions as string[]
                    regionsList.forEach((region) => {
                        newRegionColors.push({
                            name: region,
                            color: color as Region['color']
                        })
                    })
                }
                setRegionColors(newRegionColors);
            })
    }

    return (
        <div className="App">
            <ItalyMap regionColors={regionColors} setTooltipContent={setTooltip}/>
            <ReactTooltip>{tooltip}</ReactTooltip>
        </div>
    );
}

export default App;
