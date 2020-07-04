import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Props {
    onFileUploaded: (file: File) => void; // aceitamos essa função (que recebe um file e retorna void) como propriedade no componente Dropzone
}

/* 
 Dropzone é um FC: funcion component do tipo Props com a função dropzone que passamos na chamada do compoenente 
 recebemos (props) que são as propriedades do componente mas podemos fazer uma desestruturação e pegar {oneFileUploaded} dentro de props
 */
const Dropzone: React.FC<Props> = ({onFileUploaded}) => {

    // se fosse (props) => { } conseguiriamos acessar: props.onFileUploaded, como ja fizemos desestruturação já temos essa propriedade oneFile...


    // ESTADO para armazenar a preview do arquivo que foi feito o upload
    const [selectedFileUrl, setSelectedFileUrl] = useState('');  // começa com string vazia pq vai ser um endereço

    // Quando arrastarem/adicionarem um arquivo
    const onDrop = useCallback(acceptedFiles => { // memorizar uma função para que ela seja recarregada somente quando o valor de uma variável mudar (por padrão uma função nova de um componente se estado ou qlqr coisa mudar a função é recriada do 0 -> perda de performance)
        /* ACCEPTEDFILES: 
        File, com propriedades como path, name, lastModified... que enviaremos pro back-end */
        const file = acceptedFiles[0]; // pq só temos um arquivo

        const fileUrl = URL.createObjectURL(file); // cria url pro arquivo com a variavel global do js URL
        setSelectedFileUrl(fileUrl);
        // Quando usuário selecionar o arquivo chamamos a função e passamos o arquivo
        onFileUploaded(file);
    }, [onFileUploaded]); // antes era [] mas a onFileUploaded avisou p eser usada como dependencia então mudamos pq isso deve ser refeito se o arquivo mudar

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