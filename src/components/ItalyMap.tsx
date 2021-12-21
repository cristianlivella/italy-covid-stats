import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import styled from 'styled-components';
import { Region } from '../types';
import geojson from '../geojson/regions_italy.json';

const colors = { rossa: '#dd222a', arancione: '#e78314', gialla: '#f8c300', bianca: '#f7f7f7', white: '#ffffff' }

interface Props {
    regionColors: Region[],
    setTooltipContent: (content: string) => void
}

const ItalyMap = (props: Props) => {
    const { regionColors, setTooltipContent } = props;
    return (
        <Container data-tip=''>
            <StyledMap
                projection='geoAzimuthalEqualArea'
                projectionConfig={{
                    rotate: [-12.0, -41.9, 0],
                    scale: 3250
                }}
            >
            {/* geojson source: https://github.com/openpolis/geojson-italy */}
                <Geographies geography={geojson}>
                    {
                        ({ geographies }) => geographies.map((geo) => {
                            const regionInfo = regionColors.find((region: Region) => {
                                return region.name === geo.properties.reg_name;
                            });
                            const color = regionInfo ? regionInfo['color'] : 'white';
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={colors[color]}
                                    stroke={'#555555'}
                                    strokeWidth={0.5}
                                    onClick = {() => {
                                        const { reg_name } = geo.properties;
                                        console.log('todo; you clicked on ' + reg_name);
                                    }}
                                    onMouseEnter={() => {
                                        const { reg_name } = geo.properties;
                                        setTooltipContent(reg_name);
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent('');
                                    }}
                                    style={{
                                        default: {
                                            outline: 'none'
                                        },
                                        hover: {
                                            cursor: 'pointer',
                                            outline: 'none',
                                            opacity: 0.90
                                        },
                                        pressed: {
                                            cursor: 'pointer',
                                            outline: 'none',
                                            opacity: 0.85
                                        }
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </StyledMap>
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    width: 100%;
`

const StyledMap = styled(ComposableMap)`
    height: 100%;
    width: 100%;
`

export default ItalyMap;
