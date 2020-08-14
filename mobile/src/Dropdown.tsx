import React, {useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select'; // Reproduzir o select do html no mobile (pra uf e city)

interface IBGEResponse {
    sigla: string,
}
     
interface Item {
    label: string,
    value: string,
}
        
export const Dropdown = () => {
    
    const placeholder = {
        label: 'Selecione a uf...',
        value: null,
        color: '#000000',
    };
                
    const arrayufs:Array<Item> = []; 
    const [ufs, setUfs] = useState<string>('');

    useEffect(() => {
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
        .then(res => res.json())
        .then(result => {
            result.map((uf: IBGEResponse) => {
                arrayufs.push({
                    label: uf.sigla,
                    value: uf.sigla,
                });
            })();
        })
        .catch(err => err);
    }, []);
            
    function handleuf() {
        console.log(ufs);
    }

    return (
        <RNPickerSelect
            onValueChange={(value) => {
                console.log(value)
                // setUfs(value)
            }}
            // onOpen={handleUFs}
            placeholder= {placeholder}
            onClose={handleuf}
            items=
            {
                arrayufs
            }
        />
    );
};
// https://snack.expo.io/@lfkwtz/react-native-picker-select

export default Dropdown;
