import {useCallback, useState} from 'react';
import Head from 'next/head';

// @mui
import {
    TextField,

    Container,
    Typography,
    CardHeader,
    FormControlLabel, Switch, CardContent, Card, MenuItem, Divider, Select
} from '@mui/material';


import {useSettingsContext} from "../../components/settings";
import DashboardLayout from "../../layouts/dashboard";
import {Block} from "../../sections/_examples/Block";
import {Upload} from "../../components/upload";
import {API_URL} from "../../routes/paths"
import {RHFSelect} from "../../components/hook-form";

const OPTIONS = [
    {value: '9000', label: 'HT Miami'},
    {value: '7001', label: 'CNT'},

];

PageCuatro.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;


const style = {
    '& > *': {my: '8px !important'},
};


function PasoUno(imagenesuno) {

    return new Promise((resolve, reject) => {

        const newImages = [];

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < imagenesuno.length; i++) {
            // eslint-disable-next-line no-shadow
            const file = imagenesuno[i];
            // eslint-disable-next-line no-await-in-loop
            const base64 = convertToBase64(file);
            newImages.push(base64);
        }

        resolve(newImages);

    });


};

function convertToBase64(file) {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsBinaryString(file);

        reader.onload = () => {
            const binaryString = reader.result;
            const base64 = btoa(binaryString);
            resolve(base64);
        };

        reader.onerror = () => {
            reject(new Error('Failed to convert file to base64'));
        };
    });

}

export default function PageCuatro() {

    const [preview, setPreview] = useState(false);

    const {themeStretch} = useSettingsContext();

    const [pedidoProveedorr, setPedidoProveedor] = useState('');
    const [dn, setDN] = useState('');
    const [procedenciaa, setProcedencia] = useState('');
    // const [jsonData, setJsonData] = useState([]);
    // const [jsonDataDetalle, setJsonDataDetalle] = useState([]);


    const [files, setFiles] = useState([]);

    const [file, setFile] = useState(null);

    const [avatarUrl, setAvatarUrl] = useState(null);

    const handleDropSingleFile = useCallback((acceptedFiles) => {
        const newFile = acceptedFiles[0];
        if (newFile) {
            setFile(
                Object.assign(newFile, {
                    preview: URL.createObjectURL(newFile),
                })
            );
        }
    }, []);

    const handleDropAvatar = useCallback((acceptedFiles) => {
        const newFile = acceptedFiles[0];
        if (newFile) {
            setAvatarUrl(
                Object.assign(newFile, {
                    preview: URL.createObjectURL(newFile),
                })
            );
        }
    }, []);

    const handleDropMultiFile = useCallback(
        (acceptedFiles) => {
            setFiles([
                ...files,
                ...acceptedFiles.map((newFile) =>
                    Object.assign(newFile, {
                        preview: URL.createObjectURL(newFile),
                    })
                ),
            ]);
        },
        [files]
    );

    const handleRemoveFile = (inputFile) => {
        const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
        setFiles(filesFiltered);
    };

    const handleRemoveAllFiles = () => {
        setFiles([]);
    };


// Validar imágenes ==> https://codebeautify.org/base64-to-image-converter#
    const enviarDatos = () => {

        if (pedidoProveedorr !== '' && procedenciaa !== '' && dn !== '') {

            // console.log(aaaaaaaa(files));

            const formData = new FormData();
            formData.append("pedidoProveedor", pedidoProveedorr);
            formData.append("procedencia", procedenciaa);
            formData.append("dn", dn);
            formData.append("description", "MisArchivos");

            files.forEach((file, index) => {
                formData.append(`selectedFile`, file);
            });

            const url = `${API_URL}/api/mogo-db-wms/upload_web_files`;

            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (response.ok) {
                        return response.json(); // If expecting JSON response
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .then(data => {
                    // Handle the successful response data here
                    alert("El proceso de carga de las imágenes se ha completado exitosamente.");
                })
                .catch(error => {
                    // Handle errors here
                    console.error('Error:', error);
                });


            // // Crear un objeto FormData
            // const formData = {
            //     pedidoProveedor: pedidoProveedorr,
            //     procedencia: procedenciaa,
            //     description: "Imágen",
            //     selectedFile: results_final
            // };
            //
            // // console.log(`Arrived: ${JSON.stringify(formData)}`);
            //
            // const url = `${API_URL}/api/mogo-db-wms/upload_web_files`;
            //
            // fetch(url, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(formData)
            // })
            //     .then(response => {
            //         // Manejar la respuesta
            //
            //         alert("El proceso de carga de las imágenes se ha completado exitosamente.")
            //     })
            //     .catch(error => {
            //         // Manejar el error
            //     });


        } else {
            alert("Todos los campos son obligatorios.")
        }

    };

    // Actividades pendientes
    // Las imágenes del pedido unicamente se podran cargar 24 horas despues de haber creado el pedido proveedor

    const handleSingleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setProcedencia(selectedValue);
        console.log('Valor seleccionado:', selectedValue); // Imprime en la consola
    };
    return (
        <>
            <Head>
                <title> Page Cuatro | Minimal UI</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>


                <Block title="General" sx={style}>

                    <Typography variant="h3" component="h1" paragraph>
                        Subir imágenes a un pedido del proveedor.
                    </Typography>

                    <TextField type="text" className="form-control email" name="email" id="email2"
                               placeholder="PEDIDO PROVEEDOR" required
                               value={pedidoProveedorr}
                               onChange={e => {
                                   setPedidoProveedor(e.currentTarget.value);
                               }}
                    />
                    <TextField type="text" className="form-control email" name="email" id="email2"
                               placeholder="DN" required
                               value={dn}
                               onChange={e => {
                                   setDN(e.currentTarget.value);
                               }}
                    />

                    <Select
                        label="PROCEDENCIA"
                        value={procedenciaa}
                        onChange={handleSingleSelectChange}
                    >
                        <MenuItem value="">Ninguno</MenuItem>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                        {OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>

                    <Card>
                        <CardHeader
                            title="Subir archivo múltiple"
                            action={
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={preview}
                                            onChange={(event) => setPreview(event.target.checked)}
                                        />
                                    }
                                    label="Show Thumbnail"
                                />
                            }
                        />
                        <CardContent>
                            <Upload
                                multiple
                                thumbnail={preview}
                                files={files}
                                onDrop={handleDropMultiFile}
                                onRemove={handleRemoveFile}
                                onRemoveAll={handleRemoveAllFiles}
                                onUpload={enviarDatos}
                            />
                        </CardContent>
                    </Card>
                </Block>


            </Container>
        </>

    );
}