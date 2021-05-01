export interface Region {
    name: string
    color: 'gialla' | 'arancione' | 'rossa' | 'bianca'
}

export interface NationalData {
    data: string
    stato: string
    ricoverati_con_sintomi: number
    terapia_intensiva: number
    totale_ospedalizzati: number
    isolamento_domiciliare: number
    totale_positivi: number
    variazione_totale_positivi: number
    nuovi_positivi: number
    dimessi_guariti: number
    deceduti: number
    casi_da_sospetto_diagnostico: number | null
    casi_da_screening: number | null
    totale_casi: number
    tamponi: number
    casi_testati: number | null
    note: string | null
    ingressi_terapia_intensiva: number | null
    note_test: string | null
    note_casi: string | null
    totale_positivi_test_molecolare: number | null
    totale_positivi_test_antigenico_rapido: number | null
    tamponi_test_molecolare: number | null
}

export interface RegionalData extends NationalData {
    codice_regione: number
    denominazione_regione: string
    lat: number
    long: number
    codice_nuts_1: string | null
    codice_nuts_2: string | null
}
