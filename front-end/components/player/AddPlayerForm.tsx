import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import playerService from '@/service/playerService';

const AddPLayerForm: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [status, setStatus] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        playerService.addPlayer({firstName, lastName})
        setFirstName("")
        setLastName("")

        setStatus("player succesfully created")
        
        setTimeout(() => {
            setStatus("")
        }, 2000)
    };

    return (
        <>
            {
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 4,
                        boxShadow: 3,
                        borderRadius: 2,
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Add player
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label={"First name"}
                            type="text"
                            value={firstName}
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                                setFirstName(e.target.value);
                            }}
                        />
                        <TextField
                            margin="normal"
                            // required
                            fullWidth
                            label={"Last name"}
                            type="text"
                            value={lastName}
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                                setLastName(e.target.value);
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {"Add"}
                        </Button>
                    </Box>
                    <Typography color='ForestGreen'>{status}</Typography>
                </Box>
            </Container>}
        </>
    );
};

export default AddPLayerForm;