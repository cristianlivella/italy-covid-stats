import styled from 'styled-components';

interface Props {
    label: string
    newCases: number
    recovered: number
    deaths: number
    day: string
}

const InfoBox = (props: Props) => {
    const { newCases, recovered, deaths, day } = props;
    return (
        <Container>
            <Value size='big'>{newCases}</Value>
            <Label size='big'>nuovi casi</Label>
            <FlexContainer>
                <FlexChild>
                    <Value>{recovered}</Value>
                    <Label>guariti</Label>
                </FlexChild>
                <FlexChild>
                    <Value>{deaths}</Value>
                    <Label>decessi</Label>
                </FlexChild>
            </FlexContainer>
            <Label size='small'>{day}</Label>
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    width: 400px;
    top: 16px;
    right: 16px;
    background-color: #fcfcfc;
    padding: 16px;
    box-shadow: rgba(0, 0, 0, 0.90) 0px 1px 2px, rgba(0, 0, 0, 0.90) 0px 2px 4px, rgba(0, 0, 0, 0.90) 0px 4px 8px, rgba(0, 0, 0, 0.90) 0px 8px 16px, rgba(0, 0, 0, 0.90) 0px 16px 32px, rgba(0, 0, 0, 0.90) 0px 32px 64px;
`

const Value = styled.div<{ size ?: string}>`
    font-size: ${({ size }) => {
        if (size === 'small') {
            return '12pt';
        }
        else if (size === 'big') {
            return '40pt';
        }
        return '32pt';
    }};
    letter-spacing: 4pt;
`

const Label = styled.div<{ size ?: string}>`
    font-size: ${({ size }) => {
        if (size === 'small') {
            return '14pt';
        }
        else if (size === 'big') {
            return '22pt';
        }
        return '16pt';
    }};
`

const FlexContainer = styled.div`
    display: flex;
    margin: 16px 0;
`

const FlexChild = styled.div`
    flex: 1 1 100%
`

export default InfoBox;
