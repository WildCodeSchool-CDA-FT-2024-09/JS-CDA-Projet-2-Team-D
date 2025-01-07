import { useState } from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface PasswordFieldProps {
  label: string;
  name: string;
  error?: {
    message: string;
  };
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function PasswordField({
  label,
  name,
  error,
  value,
  onChange,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl error={!!error} fullWidth>
        <InputLabel htmlFor={label}>{label}</InputLabel>
        <OutlinedInput
          value={value}
          onChange={onChange}
          fullWidth
          required
          id={name}
          name={name}
          label={label}
          aria-label={label}
          type={showPassword ? "text" : "password"}
          error={!!error}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword
                    ? "Cacher le mot de passe"
                    : "Afficher le mot de passe"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </>
  );
}

export default PasswordField;
