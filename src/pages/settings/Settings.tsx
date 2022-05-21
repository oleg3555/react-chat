import {styled} from "@mui/material/styles";
import {Avatar, IconButton} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import styles from './Settings.module.css';
import {ChangeEvent, useContext, useState} from "react";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {storage} from "../../scripts/firebase-config";
import {ToastContext} from "../../providers/ToastProvider";
import {TOAST_VALUES} from "../../utils/constants";
import {CircularProgressWithLabel} from "../../components/materialUI/CircularProgressWithLabel";

type FileType = (Blob | ArrayBuffer) & {
    name: string,
}

const Input = styled('input')({
    display: 'none',
});


export const Settings = () => {
    const {openToast} = useContext(ToastContext);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [progress, setProgress] = useState<number>(0);

    const onChangeAvatar = ({target: {files}}: ChangeEvent<HTMLInputElement>) => {
        if (files) {
            uploadAvatarToStorage(files[0]);
        }
    }

    const uploadAvatarToStorage = (file: FileType) => {
        setImageUrl('');
        if (file) {
            const storageRef = ref(storage, `/images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(prog)
            }, (error: any) => {
                console.error(error);
                openToast(error.message, TOAST_VALUES.error);
            }, async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                setImageUrl(url);
                setProgress(0);
                openToast('Avatar is changed', TOAST_VALUES.success);
            });
        }
    }
    return (<div>
        <div className={styles.setAvatar}>
            <div className={styles.inlineCenter}>
                <span>Choose your avatar</span>
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={onChangeAvatar}/>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera/>
                    </IconButton>
                </label>
            </div>
            <div>
                {!!progress && <div>
                    <CircularProgressWithLabel value={progress}/>
                </div>}
                {imageUrl && <div className={styles.inlineCenter}>
                    <span>Now you avatar is:</span>
                    <Avatar
                        alt="Remy Sharp"
                        src={imageUrl}
                        sx={{width: 56, height: 56, margin: '1rem'}}
                    />
                </div>}
            </div>
        </div>
    </div>);
}