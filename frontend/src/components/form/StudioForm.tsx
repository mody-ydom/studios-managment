import {createStudio, updateStudio} from "@/services/apiServices";
import {inter} from "@/src/theme";
import {useRouter} from "next/router";
import React, {useState} from 'react';
import styled from '@emotion/styled';
import {HTMLAttributes} from 'react';
import {humanFileSize} from '@/src/humanFileSize'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const StyledForm = styled.form`
  box-shadow: 0px 4px 35px 0px #00000014;
  background: #ffffff;
  border-radius: 40px;
  padding: 44px 44px 24px;
  max-width: 80%;
  width: 540px;
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  position: relative;
  padding: 80px;
  overflow: auto;
  
  h1 {
    
    font-family: ${inter.style.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 29px;
    line-height: 35px;
    color: #11141A;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FileInputContainer = styled.label`
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  margin: 10px 0;
  display: block;
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FileListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  gap: 20px;
`;

const FileName = styled.span`
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: auto;
`;

const RemoveButton = styled.button`
  background: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;
const SaveButton = styled.button`
  border-radius: 20px;
  font-family: ${inter.style.fontFamily};
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #FFF;
  background: #1EABE3;
  border: none;
  padding: 12px;
  cursor: pointer;
  width: 155px;
  display: block;
  margin-left: auto;
  margin-top: 50px;
`;

// Validation schema
const schema = yup.object({
  name: yup.string().required("Studio name is required"),
  capacity: yup.number().positive("Capacity must be a positive number").required("Capacity is required"),
  location: yup.string().required("Address is required"),
}).required();

const StudioForm: React.FC<HTMLAttributes<HTMLFormElement> & { isEdit?: boolean, initialValues?:{name:string, location: string, capacity:number, id:number, images:{id:number,image:string}[]} }> = ({ isEdit,initialValues, ...props }) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: initialValues?.name || '',
      capacity: initialValues?.capacity || '',
      location: initialValues?.location || '',
    }
  });
  
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [existingImages, setExistingImages] = React.useState(initialValues?.images || []);
  const [newImages, setNewImages] = React.useState([]);
  const [removedImages, setRemovedImages] = React.useState([]);
  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setNewImages([...newImages, ...files]);
  };
  
  const removeExistingImage = (imageId) => {
    setExistingImages(existingImages.filter(img => img.id !== imageId));
    setRemovedImages([...removedImages, imageId]);
  };
  
  const removeNewImage = (fileIndex) => {
    setNewImages(newImages.filter((_, index) => index !== fileIndex));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('capacity', data.capacity.toString());
    formData.append('location', data.location);
    newImages.forEach(file => formData.append('images', file));
    isEdit&&removedImages.forEach(id => formData.append('removedImages', id));
  
    try {
      //@ts-ignore
      const {data} = await (isEdit?updateStudio:createStudio)({params:{id:initialValues?.id},body:formData},{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      console.log('Server Response:', data);
      router.push(`/studios/${data.id}`)
      // Handle response
    } catch (error) {
      console.error('Error uploading data:', error);
      // Handle error
    }
  };
  
  return (
      <StyledForm onSubmit={handleSubmit(onSubmit)} {...props}>
        <h1>{isEdit ? 'Edit Studio' : 'Add New Studio'}</h1>
        <Input {...register("name")} type="text" placeholder="Studio Name"/>
        <p>{errors.name?.message}</p>
        <Input {...register("capacity")} type="number" placeholder="Capacity"/>
        <p>{errors.capacity?.message}</p>
        <Input {...register("location")} type="text" placeholder="Address"/>
        <p>{errors.location?.message}</p>
        
        <FileInputContainer>
          Drag and drop files here or click to select files
          <input type="file" multiple onChange={handleFilesChange} style={{ display: 'none' }} />
        </FileInputContainer>
  
        <FileList>
          {existingImages.map(({id,image}, index) => {
            const fileName = image.split('/').pop();
            return (
              <FileListItem key={id}>
                <FileName title={fileName}>{fileName}</FileName>
                <RemoveButton onClick={() => removeExistingImage(id)}>Remove</RemoveButton>
              </FileListItem>
            );
          })}
          {newImages.map((file, index) => (
            <FileListItem key={index}>
              <FileName title={file.name}>{file.name}</FileName> — {humanFileSize(file.size)}
              <RemoveButton onClick={() => removeNewImage(index)}>Remove</RemoveButton>
            </FileListItem>
          ))}
        </FileList>
        <SaveButton type="submit">Save</SaveButton>
        {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
      </StyledForm>
  );
};

export default StudioForm;
