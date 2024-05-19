import { HTMLAttributes } from "react";
import styled from "@emotion/styled";
import Link from "../Link";

const StyledForm = styled.form`
  box-shadow: 0px 4px 35px 0px #00000014;
  background: #ffffff;
  border-radius: 40px;
  padding: 44px 44px 24px;
  max-width: 80%;
  width: 540px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100dvh;
  position: relative;
  padding: 80px;
  overflow: auto;
  background: linear-gradient(to right, #fff 0%, #fff 50%, #abe0f3 50%);
`;

const Logo = styled.img`
  width: 263px;
  max-width: 20%;
  height: auto;
  position: absolute;
  top: 22px;
  left: 22px;
`;

const FormHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 45px;
  .column {
    max-width: 49%;
  }
  .sign-in-link {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
  }

  h3 {
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
    text-align: left;
    margin: 0;
  }
  h1 {
    font-size: 55px;
    font-weight: 500;
    line-height: 82.5px;
    text-align: left;
    margin: 0;
  }
`;

const AuthForm: React.FC<
  HTMLAttributes<HTMLFormElement> & { type: "sign-in" | "sign-up" }
> = ({ children, type, ...props }) => {
  return (
    <Container>
      <Logo src="/images/logo.png" alt="Logo" />
      <StyledForm {...props}>
        <FormHeader>
          <div className="column">
            <h3>Welcome to TDS</h3>
            <h1>{type === "sign-in" ? "Sign IN" : "Sign Up"}</h1>
          </div>
          <div className="column sign-in-link">
            <div className="h4">
              {type === "sign-in" ? "No Account ?" : "Have an Account ?"}
            </div>
            {type === "sign-in" ? (
              <Link href="/regester">Sign up</Link>
            ) : (
              <Link href="/login">Sign in</Link>
            )}
          </div>
        </FormHeader>

        {children}
      </StyledForm>
    </Container>
  );
};

export default AuthForm;
