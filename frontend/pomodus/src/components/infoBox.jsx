import React from 'react'
import { Stack, Box, Typography } from '@mui/material'

// so pra modularizar, nao mexer ainda

const infoBox = () => {
    return (
        <Stack direction={'row'} spacing={5} alignItems="center" justifyContent="center">
            {/* box dos dias usados */}
            <Box padding={3} borderRadius={5} backgroundColor={'red.pastel'}>
                <Stack direction={'row'} spacing={1}>
                    <CalendarMonthOutlinedIcon />
                    <Typography variant="h5" align="left" fontWeight="bold">Dias usados</Typography>
                </Stack>
                <Typography variant="body1" align="left" color="text.secondary">Você usou por {diasUsados} dias</Typography>
            </Box>
            {/* box das horas de foco */}
            <Box padding={3} borderRadius={5} backgroundColor={'yellow.pastel'}>
                <Stack direction={'row'} spacing={1}>
                    <AccessAlarmOutlinedIcon />
                    <Typography variant="h5" align="left" fontWeight="bold">Horas</Typography>
                </Stack>

                <Typography variant="body1" align="left" color="text.secondary">Você já dedicou {horas} horas de foco!</Typography>
            </Box>

            {/* box da produtividade */}
            <Box padding={3} borderRadius={5} backgroundColor={'green.pastel'}>
                <Stack direction={'row'} spacing={1}><FastForwardOutlinedIcon />
                    <Typography variant="h5" align="left" fontWeight="bold">Produtividade</Typography>
                </Stack>
                <Typography variant="body1" align="left" color="text.secondary">Você foi produtivo por {produtividade} dias!! Continue assim</Typography>
            </Box>
        </Stack>

    );
}

export default infoBox
