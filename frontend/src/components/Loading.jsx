import PropTypes from 'prop-types'
import { CircularProgress } from "@mui/material";

export const Loading = ({ color = 'success' }) => {
    return (
        <CircularProgress
            color={color}
            sx={{
                animation: "spin 1s linear infinite",
                "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
            }}
        />
    )
}

Loading.propTypes = {
    color: PropTypes.string
}