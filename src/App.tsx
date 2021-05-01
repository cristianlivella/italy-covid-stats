import { useState, useEffect, useCallback } from 'react';
import ItalyMap from './components/ItalyMap';
import InfoBox from './components/InfoBox';
import ReactTooltip from 'react-tooltip';
import './App.css';
import { Region, NationalData, RegionalData } from './types';

const App = () => {
    const [selectedRegion, selectRegion] = useState('');
    const [regionColors, setRegionColors] = useState<Region[]>([]);
    const [nationalData, setNationalData] = useState<NationalData[] | null>();
    const [regionalData, setRegionalData] = useState<RegionalData[] | null>();
    const [infoBoxData, setInfoBoxData] = useState({
        label: 'Italia',
        newCases: 0,
        recovered: 0,
        deaths: 0,
        day: ''
    });

    const updateData = useCallback(() => {
        updateRegionColors();
        updateSpreadData();
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

    const updateSpreadData = () => {
        fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json')
            .then(res => res.json())
            .then((res : NationalData[]) => {
                res.sort((a, b) => {
                    return a.data === b.data ? 0 : (a.data > b.data ? 1 : -1);
                })
                setNationalData(res);
            })
        fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json')
            .then(res => res.json())
            .then((res : RegionalData[]) => {
                res.sort((a, b) => {
                    return a.data === b.data ? 0 : (a.data > b.data ? 1 : -1);
                })
                setRegionalData(res);
            })
    }

    useEffect(() => {
        updateData();
        setInterval(() => {
            updateData();
        }, 60 * 60 * 1000);
    }, [updateData]);

    useEffect((): void => {
        if (!nationalData || nationalData.length < 2 || !regionalData) {
            return;
        }
        if (selectedRegion === '') {
            const data = [...nationalData];
            const todayData = data.pop();
            const yesterdayData = data.pop();
            setInfoBoxData({
                label: 'Italia',
                newCases: todayData!.nuovi_positivi,
                recovered: todayData!.dimessi_guariti - yesterdayData!.dimessi_guariti,
                deaths: todayData!.deceduti - yesterdayData!.deceduti,
                day: new Date(Date.parse(todayData!.data)).toLocaleDateString('it-IT',  { year: 'numeric', month: 'long', day: 'numeric' })
            })
        }
        else {
            const data = [...regionalData];
            const selectedRegionData = data.filter((thisData) => {
                return thisData.denominazione_regione === selectedRegion;
            })
            if (selectedRegionData.length >= 2) {
                const todayData = selectedRegionData.pop();
                const yesterdayData = selectedRegionData.pop();
                setInfoBoxData({
                    label: selectedRegion,
                    newCases: todayData!.nuovi_positivi,
                    recovered: todayData!.dimessi_guariti - yesterdayData!.dimessi_guariti,
                    deaths: todayData!.deceduti - yesterdayData!.deceduti,
                    day: new Date(Date.parse(todayData!.data)).toLocaleDateString('it-IT',  { year: 'numeric', month: 'long', day: 'numeric' })
                })
            }
        }
    }, [nationalData, regionalData, selectedRegion]);

    return (
        <div className="App">
            <ItalyMap regionColors={regionColors} setTooltipContent={selectRegion}/>
            <ReactTooltip>{selectedRegion}</ReactTooltip>
            <InfoBox {...infoBoxData} />
        </div>
    );
}

export default App;
