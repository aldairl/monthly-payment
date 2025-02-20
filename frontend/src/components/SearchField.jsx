import PropTypes from 'prop-types'
import { useState } from "react"
import { Button, Box } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.mode === 'darsk' ? theme.palette.primary.dark : theme.palette.primary.light, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    borderColor: alpha(theme.palette.common.black, 0.25)
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}))

export const SearchField = ({ onSearch, sx }) => {

    const [query, setQuery] = useState("")
    const handleSearch = () => {
        if (query.trim() !== "") {
            onSearch(query);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    return (
        <Box display="flex" gap={1} sx={sx}>
            <Search >
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Buscar por cedula..."
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </Search>

            <Button variant="contained" color="info" gridColumn='span 1' onClick={handleSearch} >buscar</Button>

        </Box>
    )
}

SearchField.propTypes = {
    onSearch: PropTypes.func,
    sx: PropTypes.object,
}