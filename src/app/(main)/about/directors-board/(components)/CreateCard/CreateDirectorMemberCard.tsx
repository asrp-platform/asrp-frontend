"use client"

import {type ChangeEvent, type FormEvent, useState} from "react";
import {CirclePlus, Image} from "lucide-react";

import styles from "./styles.module.scss"
import api from "../../../../../../axios.ts";
import type {ImagePathResponse} from "../../../../../../shared/types/interfaces.ts";
import {getDirectorMemberImageUrl} from "../../../../../../shared/backend/restApiUrls.ts";
import {
    DIRECTORS_BOARD_ADMIN_URL,
    DIRECTORS_BOARD_MEMBER_IMAGES_URL
} from "../../../../../../shared/backend/adminApiUrls.ts";

import ContentEditor from "../Editors/ContentEditor.tsx";
import type {IContent} from "../../../../../../entities/DirectorsBoardMember.ts";

const CreateDirectorMemberCard = () => {

    const [createMode, setCreateMode] = useState<boolean>(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [content, setContent] = useState<IContent>({blocks: []});

    const handleReset = () => {
        setCreateMode(false);
        setUploadedImageUrl(null);
        setContent({blocks: []})
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = {
            name: name,
            role: role,
            content: content,
            photo_url: uploadedImageUrl,
        }
        try {
            await api.post(DIRECTORS_BOARD_ADMIN_URL, formData);
        } catch (error) {
            console.log(error)
        }
    }


    if (!createMode) {
        return (
            <div className={styles.createCard} onClick={() => setCreateMode(!createMode)}>
                <CirclePlus width={32} height={32} className={styles.addMemberIcon}/>
            </div>
        )
    }

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        const formData = new FormData();
        formData.append("file", file)

        try {
            const res = await api.post<ImagePathResponse>(DIRECTORS_BOARD_MEMBER_IMAGES_URL, formData, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            const imageUrl = getDirectorMemberImageUrl(res.data.path)
            setUploadedImageUrl(imageUrl)
        } catch (error) {
            console.error("Image upload failed:", error)
        } finally {
            e.target.value = ""
        }
    }


    return (
        <div className={styles.createCardActive}>
            <form action="" className={styles.createCardForm} onSubmit={handleSubmit}>
                <input
                    className={styles.roleInput}
                    type="text"
                    placeholder="Enter role..."
                    onChange={(e) => setRole(e.target.value)}
                    required={true}
                />
                <div className={styles.photoInputContainer}>
                    <input
                        type="file"
                        id="photo"
                        className={styles.photoInput}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="photo" className={styles.photoLabel}>
                        {uploadedImageUrl ? <img src={uploadedImageUrl} alt=""/> : <Image width={32} height={32}/>}
                    </label>
                </div>
                <input
                    className={styles.nameInput}
                    type="text"
                    placeholder="Enter name..."
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                />


                <ContentEditor value={content} onChange={setContent}/>

                <div className={styles.buttonContainer}>
                    <button
                        className={styles.submitButton}
                        type="submit"
                    >
                        Submit
                    </button>
                    <button
                        className={styles.resetButton}
                        type="reset"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>

            </form>
        </div>
    );
};

export default CreateDirectorMemberCard;