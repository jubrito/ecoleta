import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

const Dropzone = () => {

    // ESTADO para armazenar a preview do arquivo que foi feito o upload
    const [selectedFileUrl, setSelectedFileUrl] = useState('');  // começa com string vazia pq vai ser um endereço

    // Quando arrastarem/adicionarem um arquivo
    const onDrop = useCallback(acceptedFiles => {
        /* ACCEPTEDFILES: 
        File, com propriedades como path, name, lastModified... que enviaremos pro back-end */
        const file = acceptedFiles[0]; // pq só temos um arquivo

        const fileUrl = URL.createObjectURL(file); // cria url pro arquivo com a variavel global do js URL
        setSelectedFileUrl(fileUrl);
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: 'image/*' // a lib aceita qualquer tipo de imagem (apenas)
    })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*"/> {/* input só aceita imagem, se pudesse receber varios arquivos poderiamos colocar a propriedade "multiple" */}
            <div className={selectedFileUrl ? 'box-image' : 'box'}>
                <FiUpload/>
                { // se já tiver selecionado uma imagem mostra preview
                    selectedFileUrl 
                    ? (
                        // var box = document.querySelector('div.box').classList.add('teste');
                        <img src={ selectedFileUrl } alt="Point thumbnail"/> 
                    )
                    // se não avisa para enviarem um arquivo
                    : (
                        // se arrastar arquivo para a caixa da dropzone muda o texto avisando pra soltar
                        isDragActive ?
                        <p>Solte o arquivo aqui</p> :
                        <p>Faça o upload ou arraste o arquivo de imagem do estabelecimento</p>
                        
                    )
                }
            </div>
        </div>
    )
}

export default Dropzone;