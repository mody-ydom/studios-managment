import React, { forwardRef, useState } from "react";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  TextFieldProps,
} from "@mui/material";
import styled from "@emotion/styled";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const StyledInput = styled(TextField)`
  display: block;

  .MuiInputBase-root {
    color: #1976d2;
  }

  .MuiOutlinedInput-root {
    border-radius: 20px;

    input::placeholder {
      font-size: 14px;
      font-weight: 300;
      line-height: 21px;
      text-align: left;
      color: #808080;
    }

    &:hover fieldset {
      border-color: #4285f4;
    }

    &.Mui-focused fieldset {
      border-color: #4285f4;
    }
  }

  .MuiFormLabel-root.Mui-focused {
    color: #4285f4;
  }
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;

  margin: 13px 0;
  width: 100%;
`;

const StyledLabel = styled(InputLabel)`
  display: block;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  margin-bottom: 13px;
  color: #000000;
`;

type CustomInputProps = TextFieldProps & {
  error?: boolean;
  helperText?: string;
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <StyledLabel>
        {label && label}
        <StyledInput
          variant="outlined"
          type={type === "password" && showPassword ? "text" : type}
          {...props}
          ref={ref}
          InputProps={{
            ...props.InputProps,
            endAdornment:
              type === "password" ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ) : undefined,
          }}
        />
      </StyledLabel>
    );
  }
);

export default CustomInput;
