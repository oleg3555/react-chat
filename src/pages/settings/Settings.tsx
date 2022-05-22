import {styled} from "@mui/material/styles";
import {Avatar, CircularProgress, IconButton} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import styles from './Settings.module.css';
import {ChangeEvent, useContext, useState} from "react";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {storage} from "../../scripts/firebase-config";
import {ToastContext} from "../../providers/ToastProvider";
import {TOAST_VALUES} from "../../utils/constants";
import {updateCurrentUser} from "../../scripts/api-services";

type FileType = (Blob | ArrayBuffer) & {
    name: string,
}

const Input = styled('input')({
    display: 'none',
});


export const Settings = () => {
    const {openToast} = useContext(ToastContext);
    const [imageSrc, setImageSrc] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onChangeAvatar = ({target: {files}}: ChangeEvent<HTMLInputElement>) => {
        if (files) {
            uploadAvatarToStorage(files[0]);
        }
    }

    const uploadAvatarToStorage = (file: FileType) => {
        setImageSrc('');
        if (file) {
            const storageRef = ref(storage, `/images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                setIsLoading(true)
            }, (error: any) => {
                console.error(error);
                openToast(error.message, TOAST_VALUES.error);
            }, async () => {
                const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                await updateCurrentUser({imageUrl})
                setImageSrc(imageUrl);
                setIsLoading(false);
                openToast('Avatar is changed', TOAST_VALUES.success);
            });
        }
    }
    return (<div>
        <div className={styles.setAvatar}>
            <div className={styles.inlineCenter}>
                <span>Choose your avatar</span>
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={onChangeAvatar}
                           disabled={isLoading}/>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera/>
                    </IconButton>
                </label>
            </div>
            <div>
                {isLoading && <div>
                    <CircularProgress/>
                </div>}
                {imageSrc && <div className={styles.inlineCenter}>
                    <span>Now you avatar is:</span>
                    <Avatar
                        alt="Remy Sharp"
                        src={imageSrc}
                        sx={{width: 56, height: 56, margin: '1rem'}}
                    />
                </div>}
            </div>
        </div>
    </div>);
}