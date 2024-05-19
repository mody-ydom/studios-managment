import React, { forwardRef } from "react";
import {
  FormHelperText,
  InputLabel,
  Select,
  SelectProps,
  selectClasses,
} from "@mui/material";
import styled from "@emotion/styled";

const StyledInput = styled.div`
  .MuiInputBase-root {
    color: #1976d2;
    display: block;
  }
  .${selectClasses.icon} {
    width: 24px;
    height: 24px;
    padding: 2px;
    background: #1eabe3;
    border-radius: 50%;
    fill: white;
  }
  .MuiOutlinedInput-root {
    border-radius: 20px;

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
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: #000000;
  width: 100%;
`;

type CustomInputProps = SelectProps & {
  error?: boolean;
  helperText?: string;
};

const CustomSelect = forwardRef<HTMLSelectElement, CustomInputProps>(
  ({ label, error, helperText, ...props }, ref) => {
    return (
      <StyledInput>
        <StyledLabel>
          {label}
          <Select ref={ref} {...props} />
        </StyledLabel>
        {error && <FormHelperText error>{helperText}</FormHelperText>}
      </StyledInput>
    );
  }
);

export default CustomSelect;