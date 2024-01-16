import React, { useState } from 'react';
import { FormControl } from '@mui/base/FormControl';
import {
    TextField,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
    phoneNumber: string;
    email: string;
}

const Page1 = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phoneNumber: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem('fromData', JSON.stringify(formData));
        // console.log(formData);
        navigate('/page2');
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl defaultValue="" required>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    required
                />
            </FormControl>
            <FormControl defaultValue="" required>
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    type="tel"
                    required
                />
            </FormControl>
            <FormControl defaultValue="" required>
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    type="email"
                    required
                />
            </FormControl>
            <Button type="submit" variant="contained" fullWidth>
                Submit
            </Button>
        </form>
    );
};

export default Page1;
