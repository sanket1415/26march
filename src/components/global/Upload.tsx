import React, { useState } from "react";
import { BsUpload } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { FileInvalidERR, FileSizeERR } from "../../constants/common";
import { IMAGE_SIZE, IMAGE_TYPE } from "../../constants/final";
import ErrorMessage from "./ErrorMessage";

const normalStyle = `flex items-center justify-center px-4 py-1 border border-gray-200 text-gray-700 rounded-lg text-md
outline-none  transition-all hover:text-blue-700 hover:shadow-sm active:shadow-md
hover:border-blue-500`;

const errorStyle = `flex items-center justify-center px-4 py-1 border border-error-500 text-gray-700 rounded-lg text-md
outline-none  transition-all hover:text-blue-700 hover:shadow-sm active:shadow-md
hover:border-blue-500 `;

interface IProps {
    onChange: any;
    preview: string;
    setPreview: Function;
}

const Upload = ({ onChange, preview, setPreview }: IProps) => {
    const [uploadError, setUploadError] = useState<string>("");

    const fileUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selected: any = event.currentTarget.files?.[0];

        if (!IMAGE_TYPE.includes(selected.type)) {
            setUploadError(FileInvalidERR);
            setPreview("");
            onChange(null);
        } else if (selected.size >= IMAGE_SIZE) {
            setUploadError(FileSizeERR);
            setPreview("");
            onChange(null);
        } else {
            onChange(selected);
            setPreview(URL.createObjectURL(selected));
            setUploadError("");
        }
    };

    const clearFileInput = (event: any) => {
        event.target.value = "";
    };

    const clearFileHandler = () => {
        onChange(null);
        setPreview("");
        setUploadError("");
    };

    /* @DESC::  Upload Input Button */
    const uploadButton = !preview && (
        <label
            title="upload image"
            htmlFor="storyImage"
            className="inline-flex"
        >
            <input
                type="file"
                id="storyImage"
                className="hidden"
                onClick={clearFileInput}
                onChange={fileUploadHandler}
                accept="image/png, image/jpeg"
            />
            <div className={uploadError ? errorStyle : normalStyle}>
                Select <BsUpload className="ml-4" />
            </div>
        </label>
    );

    /* @DESC::  Image Preview Component */
    const previewWrapper = preview && preview && (
        <button
            onClick={clearFileHandler}
            title="Remove Image"
            className="absolute top-0 right-0 font-sans px-3  py-2 rounded-md  bg-gray-600 text-white rounded-tr-none shadow-md flex items-center hover:bg-black hover:cursor-pointer font-semibold"
        >
            <FiTrash2 className="mr-2  text-xl " />{" "}
            <span className="text-sm">Delete</span>
        </button>
    );
    return (
        <div className="mb-3">
            {uploadButton}
            <div className="relative  ">
                {preview && (
                    <img
                        src={preview}
                        alt="Blog_Image"
                        className="object-cover w-full h-[55vh]"
                    />
                )}

                {previewWrapper}
            </div>

            <ErrorMessage message={uploadError} />
        </div>
    );
};

export default Upload;
